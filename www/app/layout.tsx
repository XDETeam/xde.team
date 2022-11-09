import { FC, PropsWithChildren } from "react";
import "#/styles/global.css";

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>XDE.Team</title>
            <meta
                name="description"
                content="Next.js App Directory Playground"
                key="desc"
            />
        </head>
        <body className="overflow-y-scroll bg-gray-900">
            <main className="grid grid-cols-[1fr,minmax(auto,240px),min(800px,100%),1fr] gap-x-8 py-8">
                {children}
            </main>
        </body>
    </html>
)

export default Layout