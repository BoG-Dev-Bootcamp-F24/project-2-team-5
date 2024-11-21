import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { Inter, Oswald } from "next/font/google";

export const userSignup = React.createContext(false);

const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });

export default function Home(): React.ReactElement {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confPassword, setConfPassword] = useState<string>("");
    const [admin, setAdmin] = useState<boolean>(false);

    const router = useRouter();

    async function registerUser(): Promise<void> {
        try {
            if (password === confPassword) {
                const query = `fullName=${fullName}&email=${email}&password=${password}&admin=${admin}`;
                const response = await fetch(`http://localhost:3000/api/user?${query}`, {
                    method: "POST",
                });

                if ((await response.text()) === "Success") {
                    alert("Success! You can now login");
                    router.refresh();
                    window.location.href = "/";
                }
            } else {
                alert("Passwords do not match");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid login");
        }
    }

    function handleForm(event: FormEvent): void {
        event.preventDefault();
    }

    return React.createElement(
        "main",
        { className: "" },
        React.createElement(
            "nav",
            {
                className: `bg-white border-gray-300 shadow-md shadow-black-500/40 text-black ${oswald.className}`,
            },
            React.createElement(
                "div",
                {
                    className:
                        "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4",
                },
                React.createElement(
                    "a",
                    { className: "flex items-center space-x-1 rtl:space-x-reverse" },
                    React.createElement("img", {
                        src: "images/appLogo.png",
                        className: "h-8",
                    }),
                    React.createElement(
                        "span",
                        {
                            className:
                                "self-center text-3xl font-semibold whitespace-nowrap",
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
                { className: "sm:mx-auto sm:w-full sm:max-w-sm" },
                React.createElement(
                    "h2",
                    {
                        className:
                            "mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900",
                    },
                    "Create Account"
                )
            ),
            React.createElement(
                "div",
                { className: "mt-5 sm:mx-auto sm:w-full sm:max-w-sm" },
                React.createElement(
                    "form",
                    {
                        className: "space-y-6",
                        onSubmit: (e: FormEvent) => {
                            e.preventDefault();
                            handleForm(e);
                            registerUser();
                        },
                        method: "POST",
                    },
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            { className: "mt-2 relative" },
                            React.createElement("input", {
                                value: fullName,
                                onInput: (e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFullName(e.target.value),
                                required: true,
                                id: "fullName",
                                className:
                                    "focus:outline-none focus:shadow-outline appearance-none block w-full placeholder:text-black text-black py-1 leading-tight",
                                type: "text",
                                placeholder: "Full Name",
                            })
                        ),
                        React.createElement("div", {
                            className: "inset-x-0 bottom-0 h-[2px] bg-red-500 rounded-b",
                        })
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            { className: "mt-2 relative" },
                            React.createElement("input", {
                                value: email,
                                onInput: (e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value),
                                required: true,
                                id: "email",
                                className:
                                    "focus:outline-none focus:shadow-outline appearance-none block w-full placeholder:text-black text-black py-1 leading-tight",
                                type: "text",
                                placeholder: "Email",
                            })
                        ),
                        React.createElement("div", {
                            className: "inset-x-0 bottom-0 h-[3px] bg-red-500 rounded-b",
                        })
                    ),
                    React.createElement(
                        "div",
                        { className: "mt-2 relative" },
                        React.createElement("input", {
                            value: password,
                            onInput: (e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value),
                            required: true,
                            id: "password",
                            className:
                                "focus:outline-none focus:shadow-outline appearance-none block w-full placeholder:text-black text-black py-1 leading-tight",
                            type: "password",
                            placeholder: "Password",
                        }),
                        React.createElement("div", {
                            className: "inset-x-0 bottom-0 h-[2px] bg-red-500 rounded-b",
                        })
                    ),
                    React.createElement(
                        "div",
                        { className: "mt-2 relative" },
                        React.createElement("input", {
                            value: confPassword,
                            onInput: (e: React.ChangeEvent<HTMLInputElement>) =>
                                setConfPassword(e.target.value),
                            required: true,
                            id: "confPassword",
                            className:
                                "focus:outline-none focus:shadow-outline appearance-none block w-full placeholder:text-black text-black py-1 leading-tight",
                            type: "password",
                            placeholder: "Confirm Password",
                        }),
                        React.createElement("div", {
                            className: "inset-x-0 bottom-0 h-[3px] bg-red-500 rounded-b",
                        })
                    ),
                    React.createElement(
                        "div",
                        { className: "flex items-start space-x-2" },
                        React.createElement("input", {
                            onClick: () => setAdmin(!admin),
                            type: "checkbox",
                            className:
                                "accent-red-600 checked:bg-red-600 h-5 w-5",
                        }),
                        React.createElement(
                            "div",
                            { className: "flex flex-col" },
                            React.createElement(
                                "h1",
                                {
                                    className:
                                        "text-gray-700 mt-0.5 font-medium leading-none",
                                },
                                "Admin Access"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(
                            "button",
                            {
                                type: "submit",
                                className:
                                    "text-white w-full bg-red-700 hover:bg-red-800 focus:outline-none text-lg rounded-lg px-5 py-1.5 text-center items-center",
                            },
                            "Sign Up"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    {
                        className:
                            "mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left",
                    },
                    React.createElement(
                        "p",
                        {
                            className: "mt-5 text-center text-sm text-black",
                        },
                        "Already have an account?",
                        React.createElement(
                            "a",
                            {
                                href: "/.",
                                className:
                                    "font-bold leading-6 text-black-600 hover:text-red-500",
                                style: { marginLeft: "2.5px" },
                            },
                            "Log In"
                        )
                    )
                ),
                React.createElement("img", {
                    src: "images/quarterCircle.png",
                    className: "fixed bottom-0 left-0",
                })
            )
        )
    );
}
