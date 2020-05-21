import Link from "next/link";

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
        </ul>
    </>
);

export default Page;
