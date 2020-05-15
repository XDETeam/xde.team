import Toolbar from "../ui/toolbar";

import "../ui/styles.css";

export const Page = ({ Component, pageProps }) => (
    <>
        <Component {...pageProps} />
        <Toolbar />
    </>
);

export default Page;
