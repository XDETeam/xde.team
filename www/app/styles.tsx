import { Inter, Roboto_Mono } from "@next/font/google"

export const sans = Inter({
    subsets: ["latin", "cyrillic"],
    weight: "variable",
    variable: "--font-inter"
})

export const mono = Roboto_Mono({
    subsets: ["latin", "cyrillic"],
    variable: "--font-roboto-mono",
    display: "optional"
});
