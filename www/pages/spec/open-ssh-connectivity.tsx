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
    </>
);

export default Page;
