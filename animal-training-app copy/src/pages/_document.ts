import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): React.ReactElement {
    return React.createElement(
        Html,
        { lang: "en" },
        React.createElement(Head, null),
        React.createElement(
            "body",
            null,
            React.createElement(Main, null),
            React.createElement(NextScript, null)
        )
    );
}
