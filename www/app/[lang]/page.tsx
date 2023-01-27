import { FC } from "react";
import Link from "next/link";
import { Languages } from "@/settings";
import { PageWithParams } from "../layout";

const Page: FC<PageWithParams> = ({ params }) => (
    <>
        <h1 className="text-6xl font-black">XDE.Team</h1>

        <ul>
            <li><Link href="/ru/labs">Labs</Link></li>
        </ul>
    </>
)

export default Page;

export async function generateStaticParams() {
    const result = Languages
        .map(item => ({ lang: item.alpha2 }))
    ;

    return result;
}
