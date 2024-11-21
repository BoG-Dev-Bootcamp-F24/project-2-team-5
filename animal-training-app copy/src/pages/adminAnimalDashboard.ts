import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Oswald } from "next/font/google";
import Sidebar from "@/components/sidebar";
import AnimalCard from "@/components/animalCard";
import { useAppContext } from "@/context";

const oswald = Oswald({ subsets: ["latin"] });

export default function AdminAnimalDashboard(): React.ReactElement {
    const { ready, red } = useAppContext();
    const [allAnimals, setAllAnimals] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("/api/admin/animals");
                const animals = await response.json();
                setAllAnimals(animals);
            } catch (error) {
                console.error("Failed to fetch animals:", error);
            }
        }
        getData();
    }, []);

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
        router.push("/trainingDashboard");
        return React.createElement(
            "div",
            { className: "flex justify-center items-center h-screen" },
            React.createElement(
                "p",
                { className: "text-2xl text-gray-500" },
                "Redirecting..."
            )
        );
    }

    return React.createElement(
        "main",
        { className: "overflow-hidden text-black" },
        React.createElement(
            "div",
            null,
            React.createElement(
                "nav",
                {
                    className: `bg-white border-gray-300 shadow-md shadow-black-500/40 ${oswald.className}`,
                },
                React.createElement(
                    "div",
                    {
                        className:
                            "max-w-screen-xl flex items-center justify-between mx-auto p-4",
                    },
                    React.createElement(
                        "a",
                        {
                            className:
                                "flex items-center space-x-1 rtl:space-x-reverse absolute top-4 left-6",
                        },
                        React.createElement("img", {
                            src: "images/appLogo.png",
                            className: "h-8",
                        }),
                        React.createElement(
                            "span",
                            {
                                className:
                                    "self-center text-3xl font-medium dark:text-black",
                            },
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
                                {
                                    className:
                                        "flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none",
                                },
                                React.createElement("svg", {
                                    className:
                                        "w-5 h-5 text-gray-500 dark:text-gray-400",
                                    fill: "currentColor",
                                    viewBox: "0 0 20 20",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: React.createElement("path", {
                                        fillRule: "evenodd",
                                        d:
                                            "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
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
            { className: "flex flex-row" },
            React.createElement(Sidebar, { currentPage: "animalDash" }),
            React.createElement(
                "div",
                { className: "flex flex-col w-screen" },
                React.createElement(
                    "div",
                    {
                        className:
                            "flex flex-row justify-between items-end w-full h-[70px]",
                    },
                    React.createElement(
                        "p",
                        {
                            className:
                                "text-2xl mb-[10px] ml-[50px] text-gray-500 font-medium",
                        },
                        "All Animals"
                    ),
                    React.createElement("div", {
                        className: "w-[150px] mr-[50px]",
                    })
                ),
                React.createElement("hr", {
                    className: "bg-gray-300 w-full h-[2px]",
                }),
                React.createElement(
                    "div",
                    {
                        className:
                            "flex flex-row flex-wrap content-start justify-start items-start w-11/12 h-screen ml-[90px] mt-[20px]",
                    },
                    allAnimals
                        .filter((element) =>
                            search === ""
                                ? true
                                : element.name
                                      .toLowerCase()
                                      .includes(search.toLowerCase())
                        )
                        .map((element) =>
                            React.createElement(AnimalCard, {
                                key: element._id,
                                owner: element.owner,
                                name: element.name,
                                breed: element.breed,
                                hours: element.hoursTrained,
                                //pic: element.profilePicture,
                            })
                        )
                )
            )
        )
    );
}
