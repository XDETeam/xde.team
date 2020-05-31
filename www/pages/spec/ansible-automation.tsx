import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>Ansible</h1>

        <p>
            Introduce <a>host</a> term?
        </p>

        <p>
            Some reusable <a>SVG</a> picture with schema and flow would be nice.
        </p>

        <h2>Control node</h2>
        <p>Machine with Ansible installed to run commands and playbooks.</p>
        <p>
            Consider{" "}
            <a href="https://github.com/cytopia/docker-ansible">Docker image</a>{" "}
            to run the control node quickly.
        </p>
        <p>Typical management pattern?</p>

        <h2>Managed nodes</h2>
        <p>Hosts to be managed.</p>

        <h2>Inventory</h2>
        <p>
            A list (structure?) of <a>managed nodes</a>.
        </p>
        <p>Inventory is a nice-to-have thing even without Ansible.</p>
        <p>
            <dfn>Target expression</dfn>. Used both in <a>Ad-hoc</a> commands
            and <a>playbook</a> files when providing "hosts" clause.
        </p>
        <p>Inventory sample</p>
        <Code lang="yaml">{`
all:
    hosts:
        host1.domain.com:
            custom_var1: ...
        host2.domain.com:
        host3.domain.com:

    children:
        webservers:
            hosts:
                host3.domain.com:
        `}</Code>

        <h2>Modules</h2>
        <p>
            The unit of execution containing a specific <a>responsibility</a>.
        </p>

        <h2>Tasks</h2>
        <p>
            Probably <a>module</a> can be considered as function with parameters
            when <a>task</a> is its call?
        </p>
        <p>
            <dfn>Task expression</dfn> or <dfn>Module call expression</dfn>.
            Used both in <a>Ad-hoc</a> commands via "-m" (module) option and{" "}
            <a>playbook</a> files in "tasks" section.
        </p>

        <h2>Playbooks</h2>
        <p>
            Ordered list of <a>tasks</a> applied for hosts from <a>inventory</a>
            .
        </p>
        <p>
            Playbooks are Ansible’s configuration, deployment, and orchestration
            language. They can describe a policy you want your remote systems to
            enforce, or a set of steps in a general IT process.
        </p>
        <Code lang="shell">{`
ansible-playbook playbook.yml -i inventory
        `}</Code>

        <p>Playbook pattern looks like</p>
        <Code lang="yaml">{`
- hosts: {target_expression}
  tasks:
  - name: test connection
    ping:
  - name: another task
    {module_name}: {task_expresion}
  roles:
    - common
    - web-server
        `}</Code>

        <h2>Ad Hoc Commands</h2>
        <Code lang="shell">ansible all -m ping -i inventory</Code>
        <p>
            Where <dfn>all</dfn> is a <a>target expression</a>.
        </p>

        <h2>Usefull modules</h2>

        <h3>Debugging</h3>
        <Code lang="yaml">{`
- hosts: all
  tasks:
  - debug:
      msg: System {{ inventory_hostname }} has private IP {{ private_ip }}
    when: private_ip is defined
          `}</Code>

        <h2>Secrets</h2>

        <p>
            Encryption key can be stored in a file, e.g. if <a>controller</a> is
            created temporary and this helps to avoid prompting every time.
            Especially in development mode.
        </p>
        <Code lang="shell">{`
$ echo 'my_vault_password' >> .vault
        `}</Code>

        <p>Then we can encrypt value (for embedding secret) or file</p>
        <Code lang="shell">{`
# Encrypting value with prompted key
ansible-vault encrypt_string 'master_password_value' --name 'master_password'

# Encrypting value with key from the file
ansible-vault encrypt_string 'master_password_value' --vault-id .vault --name 'master_password'

# Encrypting file with key from the file
ansible-vault encrypt vars.yml --vault-id .vault

# Creating encrypted file with key prompted
ansible-vault create vars.yml
        `}</Code>

        <p>Generated value can be embedded into the playbook</p>
        <Code lang="yaml">{`
vars:
    master_password: !vault |
        $ANSIBLE_VAULT;1.1;AES256
        39353161656537303835363537373733663766343264323732643233613933633038303561383562
        3564663530353734306334343033643934373334366463320a303939653631646632386230306537
        39663334353730623531303139613838626635623035346532613264353565656531323734386463
        6530323134663230340a626235396166653939333332303930383334383662623530616362656465
        3733
      `}</Code>

        <p>And later used with password propmpted or provided from the file</p>
        <Code lang="shell">{`
# Prompt for the key
ansible-playbook config.yml -i inventory --ask-pass

# Read decryption key from the file
ansible-playbook config.yml -i inventory --vault-id .vault
        `}</Code>

        <h2>InBox</h2>
        <p>
            Ansible has some benefits compared to <a>Docker Compose</a>. Syntax
            of compose files and <a>playbooks</a> <a>YAML</a> are almost the
            same, but for Ansible flexibility of this tool is vital while for
            Docker it's more an addon.
        </p>
    </>
);

export default Page;
