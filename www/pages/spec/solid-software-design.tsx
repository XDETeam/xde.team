export const Page = () => (
    <>
        <h1>SOLID design principles</h1>

        <p>
            SOLID = <a>SRP</a> + <a>OCP</a> + <a>LSP</a> + <a>ISP</a> +{" "}
            <a>DIP</a>
        </p>
        <p>
            Author: <a>Robert C. Martin</a>
        </p>

        <h2>SRP - Single-responsibility principle</h2>
        <blockquote>
            A class should have only one reason to change,{" "}
            <a>Robert C. Martin</a>.
        </blockquote>

        <h2>OCP - Open-closed principle</h2>
        <blockquote>
            Software entities (classes, modules, functions, etc.) should be open
            for extension, but closed for modification.
        </blockquote>

        <h2>LSP - Liskov substitution principle</h2>
        <blockquote>
            Objects in a program should be replaceable with instances of their
            subtypes without altering the correctness of that program.
        </blockquote>

        <h2>ISP - Interface segregation principle</h2>
        <blockquote>
            Many client-specific interfaces are better than one general-purpose
            interface,
            <a>Robert C. Martin</a>.
        </blockquote>

        <h2>DIP - Dependency inversion principle</h2>
        <blockquote>
            Depend upon abstractions, [not] concretions,
            <a>Robert C. Martin</a>.
        </blockquote>
    </>
);

export default Page;
