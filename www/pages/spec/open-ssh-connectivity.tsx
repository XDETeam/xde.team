import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>OpenSSH</h1>

        <h2>Key management</h2>
        <p>
            Key management is based on <a>ssh-keygen</a> responsible for secure
            <a>key pair</a> generation, <a>ssh-agent</a> to host these keys and
            act as an authentication agent, <a>ssh-add</a> to add private keys
            to the agent.
        </p>

        <h2>ssh-agent</h2>
        <p>
            The ssh-agent is a helper program that keeps track of user's
            identity keys and their passphrases. The agent can then use the keys
            to log into other servers without having the user type in a password
            or passphrase again. This implements a form of single sign-on (SSO).
        </p>

        <p>Windows 10 setup of ssh-agent</p>
        <p>
            Looks like it is using named pipes while Linux (WSL/Docker) is using
            sockets. That makes it useless.
        </p>
        <Code lang="powershell">{`
Set-Service ssh-agent -StartupType Manual
        `}</Code>

        <h2>Setup connection</h2>
        <Code lang="powershell">{`
ssh-keygen -t rsa -b 4096 -f $HOME/.ssh/ansible_controller
        `}</Code>

        <h2>Create key pair (Powershell)</h2>
        <Code lang="powershell">
            {`
$keyfile = "$PSScriptRoot/.vault/id_rsa"

If (Test-Path $keyfile) {
	Write-Host "Key $keyfile already exists"
	Exit
}

Remove-Item "$keyfile.pub" -ErrorAction SilentlyContinue

&ssh-keygen -t RSA -b 4096 -f $keyfile -C default -q

# Setup permissions for the owner only
$acl = Get-Acl $keyfile
$acl.SetAccessRuleProtection($True, $False) # Disable inheritance
$acl.Access | %{ $acl.RemoveAccessRule($_) | Out-Null } # Revoke all permissions

$identity = [System.Security.Principal.WindowsIdentity]::GetCurrent()
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule($identity.Name, "FullControl", "Allow")
$acl.SetAccessRule($rule) # Add permission for the current user

Set-Acl -Path $keyfile -AclObject $acl
        `}
        </Code>

        <h2>Installing existing pair</h2>
        <p>
            Firstly put id_rsa and id_rsa.pub into <a>~/.ssh folder</a>.
        </p>
        <Code lang="shell">{`
# Setup owner-only read-write permissions
sudo chmod 600 ~/.ssh/id_rsa
sudo chmod 600 ~/.ssh/id_rsa.pub

# Start the ssh-agent in the background
eval $(ssh-agent -s)

# Make ssh agent to actually use copied key
ssh-add ~/.ssh/id_rsa
`}</Code>

        <h2>Инфраструктура KeePass/KeeAgent</h2>
        <p>
            Теоретически решение выглядит предельно удобным. Приложение{" "}
            <a>KeePass</a> используется для хранение секретной информации, а его
            расширение <a>KeeAgent</a> выполняет роль <a>SSH Agent</a>,
            предоставляя информацию о ключах.
        </p>
        <p>
            Проблемы начинаются при попытке использовать данное решение в
            гетерогенной среде. Хост под управлением <a>Windows</a>, внутри
            которого гостевые <a>Linux</a>-системы (<a>Docker</a>, <a>WSL</a>).
        </p>
        <p>
            Плагин <a>KeeAgent</a> позволяет коммуникации через два вида
            сокетов: Cygwin и msys. И хотя оба представляют из себя файлы,
            выдавая себя за Linux-сокеты, в реальности просто содержат
            информацию о том, на каком порту данный сокет открыт.
        </p>
        <p>
            Помочь транслировать эту информацию в Linux-окружение может утилита{" "}
            <a>socat</a>. Но по странному стечению обстоятельств, сокет даёт
            ошибку "socat[2183] E write(5, 0x563e759459f0, 5): Connection
            refused".
        </p>
        <p>
            Другим вариантом является попытка расширить возможности KeeAgent,
            поскольку он является <a>открытым ПО</a> и добавить в него поддержку
            Unix socket напрямую. Первый эксперименты, правда, столькнулись с
            такой проблемой, что созданный сокет-файл экзклюзивно заблокирован и
            докер, например, не может его прочитать.
        </p>
    </>
);

export default Page;
