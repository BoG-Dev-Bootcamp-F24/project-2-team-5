import React from "react";

interface UserCardProps {
    name: string;
    admin: boolean;
}

export default function UserCard({ name, admin }: UserCardProps): React.ReactElement {
    return React.createElement(
        "div",
        {
            className:
                "flex flex-col justify-between items-center w-[310px] h-[75px] rounded-xl ml-[20px] mr-[20px] mb-[30px] shadow-lg",
        },
        React.createElement(
            "div",
            {
                className:
                    "flex flex-row justify-start items-center w-full h-[65px] rounded-b-xl",
            },
            React.createElement(
                "div",
                {
                    className:
                        "flex flex-row justify-center items-center bg-red-500 w-[35px] h-[35px] font-bold text-lg rounded-[50px] ml-[15px] mr-[15px] text-white",
                },
                name.substr(0, 1).toUpperCase()
            ),
            React.createElement(
                "div",
                {
                    className:
                        "flex flex-col justify-start items-start w-[250px] h-[55px] font-bold text-lg",
                },
                React.createElement(
                    "p",
                    { className: "font-bold text-lg" },
                    name
                ),
                React.createElement(
                    "p",
                    {
                        className:
                            "text-gray-400 align-bottom text-sm font-semibold",
                    },
                    admin ? "Admin - Atlanta Georgia" : "Atlanta Georgia"
                )
            )
        )
    );
}
