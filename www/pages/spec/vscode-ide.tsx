export const Page = () => (
    <>
        <h1>Visual Studio Code</h1>
        <h2>Extensions</h2>
        <h3>Remote - SSH</h3>
        <p>
            Very convenient to connect to OpenSSH servers, manage files, edit
            them. Also VSCode <a>terminal</a> is working remotely.
        </p>
        <p>
            TODO: How to use <a>ssh-agent</a>? Probably KeeAgent OpenSSH
            integration would help.
        </p>
        <p>TODO: Play with containes/WSL connections.</p>
        <p>
            <strong>ID:</strong> ms-vscode-remote.remote-ssh
        </p>
        <ul>
            <li>
                <a href="https://code.visualstudio.com/blogs/2019/07/25/remote-ssh">
                    Remote SSH with Visual Studio Code
                </a>
                <a href="https://code.visualstudio.com/docs/remote/troubleshooting">
                    Remote Development Tips and Tricks
                </a>
            </li>
        </ul>

        <h2>InBox</h2>
        <p>Take a look into actual plugins one more time.</p>
        <p>
            How to automate setup and execute batch of commands like "ext
            install plugin_id".
        </p>
        <p>Release history has a lot of features described.</p>
        <p>Configuration recommendations and where to store it.</p>
        <p>
            Add to benefits that it's written in TypeScript and easily
            extensible.
        </p>
        <p>Remote access to VSCode from the phone.</p>
        <p>How to write extensions easily?</p>
    </>
);

export default Page;
