import "../ui/styles.css";
import Toolbar from "../ui/toolbar";
import AlphaAlert from "../ui/alpha-alert";

export const Page = ({ Component, pageProps }) => (
    <>
        <AlphaAlert />
        <Component {...pageProps} />
        <Toolbar />
    </>
);

export default Page;
