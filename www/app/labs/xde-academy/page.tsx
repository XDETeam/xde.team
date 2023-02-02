import { Container } from "@/components/Container";
import Link from "next/link";

export const Page = () => (
    <>
        <Container>
            <h1 className="text-6xl font-black my-12">XDE.Academy</h1>
        </Container>

        <Container>
            <p className="mt-4">
                Образовательный фундамент строится с упором на
                идею <Link href="/labs/informatics" className="text-red-600">Информатики</Link>.
                А интересным практическим кандидатом для исследования является идея рассматривать
                человеческую деятельность на примере
                лаборатории <Link href="/labs/application-flow" className="text-red-600">Application flow</Link>.
            </p>
        </Container>
    </>
);

export default Page;
