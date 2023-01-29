import type { AppProps } from "next/app"
import { Inter, Roboto_Mono } from "@next/font/google"
import "@/styles/globals.css"

const inter = Inter({
	subsets: ["latin", "cyrillic"],
	weight: "variable",
	variable: "--font-inter"
})

const roboto_mono = Roboto_Mono({
	subsets: ["latin"],
	variable: "--font-roboto-mono",
	display: "optional"
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
            <style jsx global>
                {`
                    :root {
                        --font-inter: ${inter.style.fontFamily};
						--font-roboto-mono: ${roboto_mono.style.fontFamily};
                    }
                `}
            </style>		

			<header>
				TODO:Header
			</header>

			<main>
				<Component {...pageProps} />
			</main>

			<footer>
				TODO:Footer
			</footer>
		</>
	)
}
