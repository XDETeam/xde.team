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
            Conside{" "}
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

        <h2>Modules</h2>
        <p>
            The unit of execution containing a specific <a>responsibility</a>.
        </p>

        <h2>Tasks</h2>
        <p>
            Probably <a>module</a> can be considered as function with parameters
            when <a>task</a> is its call?
        </p>

        <h2>Playbooks</h2>
        <p>
            Ordered list of <a>tasks</a> applied for hosts from <a>inventory</a>
            .
        </p>

        <h2>Ad Hoc Commands</h2>
        <Code lang="shell">ansible all -m ping -i inventory</Code>
    </>
);

export default Page;
