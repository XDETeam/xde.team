import Link from "next/link";

const Page = () => (
    <>
        <h1 className="text-6xl font-black">XDE.Team</h1>

        <ul>
            <li><Link href="/ru">Russian</Link></li>
            <li><Link href="/en">English</Link></li>
            <li><Link href="/bg">Bulgarian</Link></li>
            {/* TODO:Language detector */}
        </ul>
    </>
)

export default Page;
