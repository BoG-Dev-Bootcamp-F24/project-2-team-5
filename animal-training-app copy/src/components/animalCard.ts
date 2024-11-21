import React from "react";

interface AnimalCardProps {
    owner?: string;
    name?: string;
    breed?: string;
    hours?: number;
    dogImage?: string;
}

export default function AnimalCard({
    owner = "John Doe",
    name = "Buddy",
    breed = "Golden Retriever",
    hours = 10,
    dogImage = "/images/dogImage.png", // Updated path for the image
}: AnimalCardProps): React.ReactElement {
    return React.createElement(
        "div",
        {
            className: "flex flex-col justify-between items-center w-full max-w-sm rounded-xl shadow-xl",
        },
        React.createElement("img", {
            src: dogImage,
            alt: `${name}'s picture`,
            className: "w-full h-auto bg-red-500 rounded-t-3xl object-cover",
        }),
        React.createElement(
            "div",
            {
                className: "flex flex-row justify-start items-center w-full p-4 bg-white rounded-b-xl",
            },
            React.createElement(
                "div",
                {
                    className:
                        "flex justify-center items-center bg-red-500 w-10 h-10 font-bold text-lg rounded-full text-white",
                },
                owner.substr(0, 1).toUpperCase()
            ),
            React.createElement(
                "div",
                { className: "flex flex-col justify-start items-start ml-4" },
                React.createElement(
                    "p",
                    { className: "font-bold text-lg" },
                    `${name} - ${breed}`
                ),
                React.createElement(
                    "p",
                    { className: "text-gray-400 text-sm font-semibold" },
                    `${owner} - Trained ${hours} hours`
                )
            )
        )
    );
}
