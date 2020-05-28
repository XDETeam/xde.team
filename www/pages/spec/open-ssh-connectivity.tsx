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

        <h2>Install public key on remote host</h2>
        <Code lang="bash">{`
ssh-copy-id user_name@host_address.com
        `}</Code>
        <p>
            Пока не удалось найти красивого способоа копирования заданного ключа
            из ssh-agent и данная команда копирует все доступные. После такого
            копирования стоит зайти на этот хост (ssh
            user_name@host_address.com) и отредактировать файл
            ~/.ssh/authorized_keys, удалив все лишние ключи.
        </p>

        <h2>Инфраструктура KeePass/KeeAgent</h2>
        <p>
            В целом решение выглядит предельно удобным и гармоничным. Приложение{" "}
            <a>KeePass</a> используется для хранение секретной информации, его
            расширение <a>KeeAgent</a> выполняет роль <a>SSH Agent</a>,
            предоставляя информацию о ключах самым разным инструментам.
        </p>

        <h3>Windows</h3>
        <p>
            После утановки Keeagent заходим в Tools -> Options -> KeeAgent,
            устаналиваем настройки "Create Cygwin compatible socket file",
            скажем в C:\Users\my_user\.ssh\keeagent-cygwin.sock, "Create msysGit
            compatible socketfile" в C:\Users\my_user\.ssh\keeagent-msys.sock.
        </p>
        <p>
            Далее <a>генерируем ключ</a> и прикрепляем оба сформированных файла
            к записи в KeePass. С свойствах этой записи открываем закладку
            KeeAgent и указываем "Private Key File Location" на прикрепленный
            файл, а пароль записи на пароль заданный при создании ключа (если
            таковой был).
        </p>
        <p>
            После этого в меню Tools -> KeeAgent мы должны увидеть запись о
            публикации нашего ключа.
        </p>
        <p>
            После такой настройки практически сразу должны начать работать{" "}
            <a>mRemoteNG</a>, <a>Kitty</a>, <a>Putty</a>, <a>Git bash</a>.
            Возможно, единственной необходимой настройкой будет указание
            переменной среды SSH_AUTH_SOCK на один из созданных ранее сокетов.
            На примере Git bash:
        </p>
        <Code lang="bash">{`
$ export SSH_AUTH_SOCK=/c/Users/my_user/.ssh/keeagent-cygwin.sock
$ ssh-add -l
2048 SHA256:lxDdCEQTPhgzGdbC6OH2+gsvm5jqQb2UyAWO30W8vCc Default.pem (RSA)
4096 SHA256:OSH9zR5Qmp6D9Bwh0DJBztlhCuRIm7CZTGkfgk53exg admin@egopolis.net (RSA)
...
        `}</Code>
        <p>
            С настройкой гостевых систем вроде <a>Docker</a> будет немного
            сложнее. Создаваемы сокеты, на самом деле, являются не сокетами, а
            простыми текстовыми файлами, внутри которых, помимо прочего,
            содержится порт реального сокета. Чтобы транслировать потоки между
            сокетами хостовой и гостевой системы, можно воспользоваться утилитой{" "}
            <a>socat</a>.
        </p>

        <Code lang="powershell">{`
# Передаём гостевой машине файл с информацией о сокете
> docker run --rm -it -v "$($Env:USERPROFILE)/.ssh/keeagent-msys.sock:/root/.ssh/keeagent.sock" ubuntu /bin/bash

# Извлекаем из файла информацию о сокете
$ export SSH_AUTH_KEEAGENT_PORT=\`sed -r 's/!<socket >([0-9]*\\b).*/\\1/' ~/.ssh/keeagent.sock\`

# Перенаправляем коммуникации между двумя сокетами
$ export SSH_AUTH_SOCK=~/.ssh/agent.sock
$ setsid socat UNIX-LISTEN:$\{SSH_AUTH_SOCK\},mode=0600,fork,shut-down TCP:host.docker.internal:$\{SSH_AUTH_KEEAGENT_PORT\},connect-timeout=2 2>&1 > /dev/null &

$ ssh-add -l
2048 SHA256:lxDdCEQTPhgzGdbC6OH2+gsvm5jqQb2UyAWO30W8vCc Default.pem (RSA)
4096 SHA256:OSH9zR5Qmp6D9Bwh0DJBztlhCuRIm7CZTGkfgk53exg admin@egopolis.net (RSA)
        `}</Code>
    </>
);

export default Page;
