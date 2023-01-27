import { FC, PropsWithChildren } from "react"
import { Inter, Roboto_Mono } from "@next/font/google"
import clsx from "clsx";
import "@/styles/global.css"

//TODO: Move to /ui/styles.tsx?
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

  export type PageWithParams = {
    params: {
        lang: string;
    }
  }

const Layout: FC<PropsWithChildren<PageWithParams>> = ({ children, params }) => (
    <html lang={ params.lang } className={ clsx(inter.variable, roboto_mono.variable) }>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>XDE.Team</title>
        </head>
        <body>
            <main>
                {children}
            </main>
        </body>
    </html>
)

export default Layout