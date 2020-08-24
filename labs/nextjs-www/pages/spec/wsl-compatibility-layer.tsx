import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>Windows Subsystem for Linux (WSL)</h1>

        <h2>Manage distros</h2>

        <h3>Installing multiple copies</h3>
        <Code lang="powershell">{`
# Clone Ubuntu-20.04 as UbuntuLab instance
wsl --export Ubuntu-20.04 c:/path/to/ubuntu-2004.tar
wsl --import UbuntuLab ./UbuntuLab c:/Temp/ubuntu-20.04.tar --version 2
        `}</Code>

        <h3>Remove distro</h3>
        <Code lang="powershell">{`
wsl --unregister UbuntuLab
        `}</Code>
    </>
);

export default Page;
