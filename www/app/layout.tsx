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

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <html className={ clsx("h-full bg-gray-50 antialiased", inter.variable) }>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>XDE.Team</title>
        </head>
        <body className="flex h-full flex-col">
            <main>
                {children}
            </main>
        </body>
    </html>
)

export default Layout