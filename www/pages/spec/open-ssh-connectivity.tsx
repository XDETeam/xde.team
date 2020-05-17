import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>OpenSSH</h1>

        <h2>Create key pair (Powershell)</h2>
        <Code lang="powershell">
            {`
$keyfile = "$PSScriptRoot/.vault/id_rsa"

Remove-Item $keyfile -ErrorAction SilentlyContinue
Remove-Item "$keyfile.pub" -ErrorAction SilentlyContinue

&ssh-keygen -t RSA -b 4096 -f $keyfile -C default -q

# Remove Inheritance
&icacls $keyfile /c /t /inheritance:d

# Set Ownership to Owner
&icacls $keyfile /c /t /grant %username%:F

# Remove All Users, except for Owner
&cmd /c icacls $keyfile  /c /t /remove Administrator "Authenticated Users" BUILTIN\\Administrators BUILTIN Everyone System Users

# Verify
&cmd /c icacls $keyfile
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
