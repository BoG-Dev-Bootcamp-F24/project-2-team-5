import React from "react";
import AppWrapper from "@/context";
import "@/styles/globals.css";

interface AppProps {
    Component: React.ComponentType<any>;
    pageProps: Record<string, any>;
}

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
    return React.createElement(
        AppWrapper,
        null,
        React.createElement(Component, { ...pageProps })
    );
}
