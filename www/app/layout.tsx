import { FC, PropsWithChildren } from "react"
import clsx from "clsx";
import "@/styles/global.css"
import { sans, mono } from "./styles"
import Header from "./Header";
import Footer from "./Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <html className={clsx("h-full", sans.variable, mono.variable)}>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>XDE.Team</title>
        </head>
        <body className="antialiased flex flex-col min-h-screen bg-gray-50">
            <Header/>

            <main>
                {children}
            </main>

            <Footer/>
        </body>
    </html>
)

export default Layout
