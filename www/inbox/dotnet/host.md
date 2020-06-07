## IHost

IHost выступает в роли фундамента приложения и отвечает за DI (dependency injection), журналирование, конфигурирование и хостинг IHostingService (скорее всего ключевым здесь является контроль lifetime, graceful shutdown и т.п.).

## IHostedService

IHostedService является основой для конкретных бизнес-сервисов. Когда IHost стартует, для каждой реализации IHostService (как я понимаю, в DI) вызывается IHostedService.StartAsync.

## IHostBuilder

IHostBuilder отвечает за создание IHost. Например:

```
public static async Task Main(string[] args)
{
    CreateHostBuilder(args).Build().Run();
}

// Web host sample
public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
    {
        webBuilder.UseStartup<Startup>();
    })
;

// Hosted service sample
public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) =>
    {
        services.AddHostedService<SomeWorker>();
    });

// Windows service (Microsoft.Extensions.Hosting.WindowsServices package)
public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args)
    .UseWindowsService()
```

## Defaults

CreateDefaultBuilder:

-   Sets the content root to the path returned by GetCurrentDirectory.
-   Loads host configuration from:
    -   Environment variables prefixed with DOTNET\_.
    -   Command-line arguments.
-   Loads app configuration from:
    -   appsettings.json.
    -   appsettings.{Environment}.json.
    -   Secret Manager when the app runs in the Development environment.
    -   Environment variables.
    -   Command-line arguments.
-   Adds the following logging providers:
    -   Console
    -   Debug
    -   EventSource
    -   EventLog (only when running on Windows)
-   Enables scope validation and dependency validation when the environment is Development.

Чтобы сконструировать веб-приложение есть два пути. Создать Host.CreateDefaultBuilder к которому потом применить расширяющий метод Copnfigure IHostBuilder.ConfigureWebHostDefaults или создать WebHost.CreateDefaultBuilder. Оба в итоге обращаются к WebHost.ConfigureWebDefaults, но второй возвращает в итоге экземпляр класса WebHostBuilder (LSP под вопросом) и пытаеся клонировать Host.CreateDefaultBuilder вместо повторного использования. В целом дизайн выглядит некачественным.

## IHostApplicationLifetime

Inject the IHostApplicationLifetime (formerly IApplicationLifetime) service into any class to handle post-startup and graceful shutdown tasks. Three properties on the interface are cancellation tokens used to register app start and app stop event handler methods. The interface also includes a StopApplication method.

## IHostEnvironment

Inject the IHostEnvironment service into a class to get information about the following settings:

-   ApplicationName
-   EnvironmentName
-   ContentRootPath

Web apps implement the IWebHostEnvironment interface, which inherits IHostEnvironment and adds the WebRootPath.

## InBox

https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/generic-host

## XDE

-   Реюзабельность данного решения под сомнением. Даже в рамках базовой реализации Host.CreateDefaultBuilder не используется в WebHost.CreateDefaultBuilder, по сути вырождаясь copy-paste ещё и с разными базовыми классами спрятанными за IHostBuilder/IHost и риском нарушения LSP.
-   Возможно, не конфигурация/журналирование/запуск сервисов должны быть основными задачами каркаса приложения, а DI/IoC + workflow на его основе (что поможет и для определения resolving scope). Он должен побуждать к реализации SOLID давая удобные возможности для описания SRP/DIP-сервисов и их коммуникации.
-   В качестве отправной точки можно попробовать мой вариант с IComposition. Который помимо DI/IoC ещё и помогает структурировать приложение (упрощая конфигурирование, роутинг и т.п.). Он должен бьть предельно просто, например:

```
var baseApplication = new ApplicationComposition(args)
    .Use<LoggingComposition>(config => ...)
    ...

var webApplication = baseApplication
    .Use<WebServerComposition>(config => ...)
```

-   Может ли IComposition стать также контейнером, чтобы можно было легко регистрировать сервисы и получать их? Чтобы конструирование приложения было как микро-приложение с теми же удачными практиками?
