import Link from "next/link";
import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>Windows</h1>

        <ol>
            <li>
                <a href="https://www.microsoft.com/en-us/p/app-installer/9nblggh4nns1">
                    Update App Installer
                </a>
            </li>
            <li>
                <Link href="/spec/windows-terminal">
                    <a>Windows Terminal</a>
                </Link>
            </li>
            <li>winget install Microsoft.WindowsTerminal</li>
            <li>winget install Microsoft.PowerToys</li>
            <li>winget install 7zip</li>
            <li>winget install Microsoft.VisualStudioCode</li>
        </ol>

        <h2>KeePass</h2>

        <h3>Install</h3>
        <Code lang="powershell">{`
$ winget install KeePass
        `}</Code>

        <h3>KeeAgent plugin</h3>
        <ul>
            <li>
                <a href="https://keeagent.readthedocs.io/en/stable/index.html">
                    Documentation
                </a>
            </li>
            <li>
                <a href="https://github.com/dlech/KeeAgent">GitHub</a>
            </li>
            <li>
                <a href="https://lechnology.com/software/keeagent/">Homepage</a>
            </li>
        </ul>

        <p>
            To use in <a>Docker</a> and other environments as a <a>SSH</a>{" "}
            agent, "Create Cygwin compatible socket file" can be enabled with
            value {`C:\Users\${$Env:USERNAME}\kee-agent.sock`} for example. Then
            run:
        </p>
        <Code lang="powershell">{`
$ docker run --rm -t -i -v c:\Users\${$Env:USERNAME}\kee-agent.sock:/ssh-agent -e SSH_AUTH_SOCK=/ssh-agent ubuntu /bin/bash

# apt update && apt install openssh-client -y
# eval "$(ssh-agent -s)"
        `}</Code>

        <h2>InBox</h2>
        <ul>
            <li>More dockerized/configured applications?</li>
            <li>
                From{" "}
                <Link href="/spec/open-ssh-connectivity">
                    <a>OpenSSH</a>
                </Link>
                <ul>
                    <li>Set-Service ssh-agent -StartupType Manual</li>
                    <li>ssh-keygen -t rsa -b 4096</li>
                </ul>
            </li>
            <li>
                winget install KeePass
                <p>
                    Very nice tool to manage secrets with auto-typing, many
                    useful{" "}
                    <a href="https://keepass.info/plugins.html">plugins</a>
                    (KeeAgent, QuickConnectPlugin, KeeForm, etc), plugins
                    written in .NET.
                    <a href="https://github.com/lgg/awesome-keepass">Awesome</a>
                    .
                </p>
            </li>
            <li>winget install Microsoft.PowerShell</li>
            <li>winget install Microsoft.Skype</li>
            <li>winget install Microsoft.Teams</li>
            <li>winget install Microsoft.VisualStudio.Community</li>
            <li>winget install Git</li>
            <li>winget install Chrome</li>
            <li>winget install vim.vim</li>
            <li>winget install GNU.Emacs</li>
            <li>winget install Notepad++</li>
            <li>winget install KeePass</li>
            <li>winget install SoftDeluxe.FreeDownloadManager</li>
            <li>winget install TortoiseGit</li>
            <li>winget install Yarn</li>
            <li>mRemoteNG?</li>
        </ul>
    </>
);

export default Page;
