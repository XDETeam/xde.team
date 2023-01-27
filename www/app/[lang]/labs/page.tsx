import { FC } from "react";
import Link from "next/link";
import { PageWithParams } from "../../layout";

const Page: FC<PageWithParams> = ({ params }) => (
    <>
        <h1 className="text-6xl font-black">Labs</h1>

        <ul>
            <li><Link href="/labs">Labs</Link></li>
        </ul>
    </>
)

export default Page;
