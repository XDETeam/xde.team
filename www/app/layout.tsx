import { FC, PropsWithChildren } from "react"
import { Inter } from "@next/font/google"
import "#/styles/global.css"

//TODO: Move to /ui/styles.tsx?
const inter = Inter({
    subsets: ["latin", "cyrillic"],
    weight: "variable",
    variable: "--font-inter"
})

const Layout: FC<PropsWithChildren> = ({ children }) => (
    // TODO:lang
    <html lang="en" className={inter.variable}>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>XDE.Team</title>
            {/* <style jsx global>{`
                html {
                    font-family: ${inter.style.fontFamily};
                }
            `}</style> */}
        </head>
        <body>
            <main>
                {children}
            </main>
        </body>
    </html>
)

export default Layout