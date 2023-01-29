import { FC } from "react";
import { Languages } from "@/settings";
import { PageWithParams } from "./layout";
import { Container } from "@/components/Container";

const Page: FC<PageWithParams> = ({ params }) => (
    <>
        <Container>
            <h1 className="text-8xl font-black">XDE.Team</h1>


            <ul>
                <li><a href="/ru/labs">Labs</a></li>
            </ul>
        </Container>
    </>
)

export default Page;

export async function generateStaticParams() {
    const result = Languages
        .map(item => ({ lang: item.alpha2 }))
    ;

    return result;
}
