import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>Webpack</h1>

        <h2>Modules</h2>

        <h2>Loaders</h2>
        <p>
            Loader is a transformations that is applied to the source code of a
            module. It is written as functions that accept source code as a
            parameter and return a new version of that code with transformations
            applied.
        </p>
        <p>
            Loaders allow you to pre-process files as you import or "load" them.
        </p>
        <p>
            Loaders can be chained. Each loader in the chain applies
            transformations to the processed resource. A chain is executed in
            reverse order. The first loader passes its result (resource with
            applied transformations) to the next one, and so forth. Finally,
            webpack expects JavaScript to be returned by the last loader in the
            chain.
        </p>
        <p>
            A loader is just a JavaScript module that exports a function. The
            loader runner calls this function and passes the result of the
            previous loader or the resource file into it. The this context of
            the function is filled-in by webpack and the loader runner with some
            useful methods that allow the loader (among other things) to change
            its invocation style to async, or get query parameters.
        </p>
        <p>
            The first loader is passed one argument: the content of the resource
            file. The compiler expects a result from the last loader. The result
            should be a String or a Buffer (which is converted to a string),
            representing the JavaScript source code of the module. An optional
            SourceMap result (as a JSON object) may also be passed.
        </p>
        <ul>
            <li>
                <a href="https://webpack.js.org/api/loaders/">
                    https://webpack.js.org/api/loaders/
                </a>
            </li>
        </ul>

        <h2>Plugins</h2>
        <p>
            Plugin is a JavaScript object that has an apply method. This apply
            method is called by the webpack compiler, giving access to the
            entire compilation lifecycle.
        </p>
        <Code lang="es">{`
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('The webpack build process is starting!!!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
        `}</Code>
    </>
);

export default Page;
