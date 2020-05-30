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
    </>
);

export default Page;
