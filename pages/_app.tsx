import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import Layout from "./Layout";
import GlobalProvider from "../context/GlobalContext";

export default function App({ Component, pageProps }: any) {
    return (
        <GlobalProvider>
            <MantineProvider theme={theme}>
                <Head>
                    <title>Mantine Template</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                    />
                    <link rel="shortcut icon" href="/favicon.svg" />
                </Head>
                {/* TODO: Show components with sidenav bar only when json config is build */}
                <Layout>
                    <main>
                        <Component {...pageProps} />
                    </main>
                </Layout>
            </MantineProvider>
        </GlobalProvider>
    );
}
