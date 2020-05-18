import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>Singleton design pattern</h1>

        <h2>Anti-pattern</h2>
        <p>
            According to <a>single-responsibility principle</a> this pattern can
            be considered as an <a>anti-pattern</a> because involves two
            responsibilities. Besides being a business entity itself it also
            implements a strategy of its instantiation. That has all
            disadvantages of being badly reusable.
        </p>

        <p>
            It is better to use <a>factories</a> for instantion purposes. For
            example, <a>IoC container</a> and using <a>Autofac</a> (<a>C#</a>)
            it will look like:
        </p>

        <Code lang="csharp">{`
var builder = new ContainerBuilder();
builder.RegisterType<BusinessObject>().SingleInstance();
        `}</Code>
    </>
);

export default Page;
