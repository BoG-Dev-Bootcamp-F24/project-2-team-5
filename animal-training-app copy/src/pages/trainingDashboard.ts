"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import TrainingLogCard from "@/components/trainingLogCard";
import { useAppContext } from "@/context";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

export default function TrainingDashboard(): React.ReactElement {
    const { ready = true, red = true, fullName = "John Doe" } = useAppContext();
    const router = useRouter();

    const [mylogs, setMyLogs] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");

    const mockLogs = [
        {
            title: "Morning Training",
            animal: "1",
            hours: 2,
            description: "Basic obedience training session.",
            date: new Date(),
        },
        {
            title: "Evening Walk",
            animal: "2",
            hours: 1,
            description: "Leash training during an evening walk.",
            date: new Date(),
        },
    ];

    useEffect(() => {
        // Simulating fetching and processing logs
        const loadLogs = async () => {
            const processedLogs = mockLogs.map((log) => ({
                ...log,
                breed: "Golden Retriever",
                name: "Buddy",
                owner: fullName,
            }));
            setMyLogs(processedLogs);
        };
        loadLogs();
    }, [fullName]);

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
        router.push("/");
        return React.createElement(
            "div",
            { className: "flex justify-center items-center h-screen" },
            React.createElement(
                "p",
                { className: "text-2xl text-gray-500" },
                "Redirecting to Home..."
            )
        );
    }

    return React.createElement(
        "main",
        { className: "overflow-hidden" },
        React.createElement(
            "div",
            null,
            React.createElement(
                "nav",
                { className: `bg-white border-gray-300 shadow-md shadow-black-500/40 ${oswald.className}` },
                React.createElement(
                    "div",
                    { className: "max-w-screen-xl flex items-center justify-between mx-auto p-4" },
                    React.createElement(
                        "a",
                        { className: "flex items-center space-x-1 rtl:space-x-reverse absolute top-4 left-6" },
                        React.createElement("img", {
                            src: "images/appLogo.png",
                            className: "h-8",
                            alt: "App Logo",
                        }),
                        React.createElement(
                            "span",
                            { className: "self-center text-3xl font-medium dark:text-black" },
                            "Progress"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "flex justify-center ml-[25%] w-1/2" },
                        React.createElement("label", {
                            htmlFor: "simple-search",
                            className: "sr-only",
                        }),
                        React.createElement(
                            "div",
                            { className: "relative w-full" },
                            React.createElement(
                                "div",
                                { className: "flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none" },
                                React.createElement("svg", {
                                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: React.createElement("path", {
                                        fillRule: "evenodd",
                                        d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                                        clipRule: "evenodd",
                                    }),
                                })
                            ),
                            React.createElement("input", {
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                    setSearch(e.target.value),
                                type: "text",
                                id: "simple-search",
                                className:
                                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5",
                                placeholder: "Search",
                                required: true,
                            })
                        )
                    )
                )
            )
        ),
        React.createElement(
            "div",
            { className: "flex" },
            React.createElement(Sidebar, { currentPage: "training" }),
            React.createElement(
                "div",
                { className: "flex flex-col w-full px-6 py-4" },
                React.createElement(
                    "div",
                    { className: "flex justify-between items-center mb-6" },
                    React.createElement(
                        "h2",
                        { className: "text-xl font-semibold" },
                        "Training Logs"
                    ),
                    React.createElement(
                        "button",
                        {
                            className:
                                "bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-800 shadow-md",
                            onClick: () => router.push("/createTrainingLog"),
                        },
                        React.createElement("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            strokeWidth: 2,
                            stroke: "currentColor",
                            className: "w-5 h-5 mr-2",
                            children: React.createElement("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M12 4v16m8-8H4",
                            }),
                        }),
                        "Create New"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "space-y-4" },
                    mylogs.length > 0
                        ? mylogs.map((log, index) =>
                              React.createElement(TrainingLogCard, {
                                  key: index,
                                  breed: log.breed,
                                  hours: log.hours,
                                  description: log.description,
                                  date: log.date,
                                  title: log.title,
                                  name: log.name,
                                  owner: log.owner,
                              })
                          )
                        : React.createElement(
                              "div",
                              { className: "text-gray-500 text-xl text-center" },
                              "No training logs found."
                          )
                )
            )
        )
    );
}
