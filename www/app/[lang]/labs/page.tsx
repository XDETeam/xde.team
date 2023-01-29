import { FC } from "react";
import { PageWithParams } from "../layout";
import { Container } from "@/components/Container";

const Page: FC<PageWithParams> = ({ params }) => (
    <>
        <article>
            <Container>
                <h1 className="mb-12 text-8xl font-black">Лаборатории</h1>
            </Container>

            <section className="py-8">
                <Container>
                    <h2 className="text-4xl font-extrabold">Знания</h2>
                </Container>
            </section>

            <section className="py-8">
                <Container>
                    <h2 className="text-4xl font-extrabold">Организации</h2>
                </Container>
            </section>

            <section className="py-8">
                <Container>
                    <h2 className="text-4xl font-extrabold">Политика</h2>
                </Container>
            </section>
        </article>
    </>
)

export default Page;
