export const Page = () => (
    <>
        <h1>Docker</h1>

        <h2>InBox</h2>
        <p>
            A good option to cleanup docker images/containers after a lot of
            experiments: <code>docker system prune</code>. Option{" "}
            <code>--all</code> (<code>-a</code>) to remove also volumes and
            unreference images (not only dangling ones):{" "}
            <code>docker system prune -a</code>.
        </p>
    </>
);

export default Page;
