using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Windows.ProjFS;

namespace Xde.Lab.MeshFs;

/// <summary>
/// TODO:
/// </summary>
/// <remarks>
/// WebDAV
/// + Access from Linux/Macos/iOS/Android devices
/// + XML-based protocol
/// 
/// Currently experiments with:
/// https://github.com/microsoft/ProjFS-Managed-API
/// - FileNotFound error
/// - Optional Windows feature should be installed
/// 
/// https://github.com/billziss-gh/winfsp
/// - WinFSP should be installed
/// 
/// Dokany
/// 
/// S3
/// </remarks>
public class MeshFsProvider
    : IHostedService
{
    private readonly ILogger<MeshFsProvider> _log;
    private VirtualizationInstance _virtualizationInstance;

    public MeshFsProvider(ILogger<MeshFsProvider> log)
    {
        _log = log;
    }

    Task IHostedService.StartAsync(CancellationToken cancellationToken)
    {
        _log.LogInformation($"{nameof(MeshFsProvider)} starting");

        var notifications = new List<NotificationMapping>();

        _virtualizationInstance = new VirtualizationInstance(
            @"C:\Temp\MeshFs", // TODO:
            poolThreadCount: 0,
            concurrentThreadCount: 0,
            enableNegativePathCache: false,
            notificationMappings: notifications
        );

        _log.LogInformation($"{nameof(MeshFsProvider)} started");

        return Task.CompletedTask;
    }

    Task IHostedService.StopAsync(CancellationToken cancellationToken)
    {
        _log.LogInformation($"{nameof(MeshFsProvider)} stopping");

        _virtualizationInstance.StopVirtualizing();

        _log.LogInformation($"{nameof(MeshFsProvider)} stopped");

        return Task.CompletedTask;
    }
}
