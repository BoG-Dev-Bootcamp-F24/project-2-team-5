import React from "react";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

interface TrainingLogCardProps {
    breed?: string;
    hours?: number;
    description?: string;
    date?: Date;
    title?: string;
    name?: string;
    owner?: string;
}

export default function TrainingLogCard({
    breed = "Golden Retriever",
    hours = 5,
    description = "A productive training session with the dog.",
    date = new Date(),
    title = "Training Log 1",
    name = "Buddy",
    owner = "John Doe",
}: TrainingLogCardProps): React.ReactElement {
    return React.createElement(
        "div",
        { className: "w-[60rem]" },
        React.createElement(
            "div",
            {
                className:
                    "flex flex-row text-black justify-start items-start bg-white w-full h-32 mt-[10px] mb-[10px] rounded-xl drop-shadow-xl",
            },
            React.createElement(
                "div",
                {
                    className: `flex flex-col justify-center items-center bg-blue-900 h-full w-44 rounded-l-xl ${oswald.className}`,
                },
                React.createElement(
                    "p",
                    { className: "font-extrabold text-4xl text-white" },
                    new Date(date).getDate()
                ),
                React.createElement(
                    "p",
                    { className: "font-normal text-white" },
                    `${new Date(date).toLocaleString("default", {
                        month: "short",
                    })} - ${new Date(date).getFullYear()}`
                )
            ),
            React.createElement(
                "div",
                { className: "flex flex-col w-full mr-16 h-full" },
                React.createElement(
                    "div",
                    { className: "flex flex-row ml-[20px] mt-[5px]" },
                    React.createElement(
                        "p",
                        { className: "font-bold text-2xl" },
                        title
                    ),
                    React.createElement(
                        "p",
                        {
                            className:
                                "text-gray-400 align-bottom pt-[6px] ml-[5px]",
                        },
                        `- ${hours} hours`
                    )
                ),
                React.createElement(
                    "div",
                    { className: "flex flex-row w-full ml-[20px] mb-[5px]" },
                    React.createElement(
                        "p",
                        { className: "text-gray-400 align-bottom" },
                        `${owner} - ${breed} - ${name}`
                    )
                ),
                React.createElement(
                    "div",
                    { className: "flex flex-row w-full ml-[20px] mt-[5px]" },
                    React.createElement(
                        "p",
                        { className: "align-bottom" },
                        description
                    )
                )
            ),
            React.createElement(
                "div",
                {
                    className:
                        "flex flex-col justify-center items-center w-36 h-full rounded-r-xl",
                },
                React.createElement(
                    "div",
                    {
                        className:
                            "flex justify-center items-center h-14 w-14 bg-red-500 pl-[5px] pr-[5px] pt-[5px] pb-[5px] rounded-[30px]",
                    },
                    React.createElement("img", {
                        src: "images/activeTrainingLogo.png",
                        className: "h-7",
                        alt: "Training Logo",
                    })
                )
            )
        )
    );
}
