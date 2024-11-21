import React from "react";
import { Heebo, Inter, Oswald } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

const inter = Inter({ subsets: ["latin"] });
const heebo = Heebo({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });

export default function Home(): React.ReactElement {
    const router = useRouter();
    const { ready = true, red = true } = useAppContext();

    function navigateToTrainingDashboard(): React.ReactElement {
        console.log("Navigating to Training Dashboard");
        router.push("/trainingDashboard");
        return React.createElement(
            "div",
            { className: "flex justify-center items-center h-screen" },
            React.createElement(
                "p",
                { className: "text-2xl text-gray-500" },
                "Redirecting to Dashboard..."
            )
        );
    }

    if (!ready) {
        return React.createElement(
            "div",
            { className: "flex justify-center items-center h-screen" },
            React.createElement(
                "p",
                { className: "text-2xl text-gray-500" },
                "Loading..."
            )
        );
    }

    if (!red) {
        return navigateToTrainingDashboard();
    }

    return React.createElement(
        "main",
        { className: "" },
        React.createElement(
            "nav",
            {
                className: "bg-white border-gray-300 shadow-md shadow-black/25 mb-28",
            },
            React.createElement(
                "div",
                {
                    className:
                        "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4",
                },
                React.createElement(
                    "a",
                    {
                        className:
                            "flex items-center space-x-1 rtl:space-x-reverse",
                    },
                    React.createElement("img", {
                        src: "images/appLogo.png",
                        className: "h-8",
                        alt: "App Logo",
                    }),
                    React.createElement(
                        "span",
                        {
                            className: `self-center text-3xl font-semibold whitespace-nowrap text-black ${oswald.className}`,
                        },
                        "Progress"
                    )
                )
            )
        ),
        React.createElement(
            "div",
            {
                className:
                    "flex h-full flex-col justify-center px-6 py-12 lg:px-8",
            },
            React.createElement(
                "div",
                {
                    className:
                        "sm:mx-auto sm:w-full sm:max-w-2xl",
                },
                React.createElement(
                    "h2",
                    {
                        className:
                            "mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900",
                    },
                    "Welcome"
                )
            ),
            React.createElement(
                "div",
                {
                    className: `mt-10 sm:mx-auto sm:w-full sm:max-w-md font-normal ${heebo.className}`,
                },
                React.createElement(
                    "div",
                    { className: "text-center relative" },
                    React.createElement(
                        "button",
                        {
                            onClick: navigateToTrainingDashboard,
                            className:
                                "text-white font-medium bg-red-600 hover:bg-red-800 w-full focus:outline-none text-2xl rounded-xl px-5 py-1.5 text-center",
                        },
                        "Go to Dashboard"
                    )
                ),
                React.createElement("img", {
                    src: "images/quarterCircle.png",
                    className: "fixed bottom-0 left-0",
                    alt: "Decoration",
                })
            )
        )
    );
}
