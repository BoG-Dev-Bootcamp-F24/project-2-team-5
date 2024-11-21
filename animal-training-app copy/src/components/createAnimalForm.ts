import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

export default function CreateForm(): React.ReactElement {
    const { id } = useAppContext();

    const [name, setName] = useState<string>("");
    const [breed, setBreed] = useState<string>("");
    const [hours, setHours] = useState<number>(0);
    const [birth, setBirth] = useState<Date>(new Date());
    const [link, setLink] = useState<string>(
        "https://images.squarespace-cdn.com/content/v1/54e7a1a6e4b08db9da801ded/fdecc7f0-42bf-4696-bd4c-73a868e5d1d2/81.jpg"
    );

    const router = useRouter();

    async function submitForm(): Promise<void> {
        try {
            const response = await fetch("/api/animal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    breed,
                    owner: id,
                    hoursTrained: hours,
                    profilePicture: link,
                }),
                credentials: "include",
            });
            const result = await response.text();
            if (result === "Success") {
                alert("Success!");
                router.refresh();
                window.location.href = "/animalsDashboard";
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleForm(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }

    return React.createElement(
        "div",
        { className: "flex flex-col bg-slate-00 w-9/12 h-3/4 text-black" },
        React.createElement(
            "form",
            {
                onSubmit: (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    handleForm(e);
                    submitForm();
                },
            },
            React.createElement(
                "p",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Animal Name"
            ),
            React.createElement("input", {
                type: "text",
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value),
                className:
                    "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] mb-[10px] focus:outline-gray-500",
            }),
            React.createElement(
                "p",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Breed"
            ),
            React.createElement("input", {
                type: "text",
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    setBreed(e.target.value),
                className:
                    "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] mb-[10px] focus:outline-gray-500",
            }),
            React.createElement(
                "p",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Total Hours Trained"
            ),
            React.createElement("input", {
                type: "text",
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    setHours(Number(e.target.value)),
                className:
                    "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] mb-[10px] focus:outline-gray-500",
            }),
            React.createElement(
                "div",
                { className: "flex flex-row mb-[10px]" },
                React.createElement(
                    "div",
                    { className: "flex flex-col w-3/5" },
                    React.createElement(
                        "p",
                        { className: "text-lg mb-[1px] text-black font-medium" },
                        "Birth Month"
                    ),
                    React.createElement(
                        "select",
                        {
                            onChange: (e: ChangeEvent<HTMLSelectElement>) =>
                                setBirth(
                                    new Date(
                                        new Date(birth).setMonth(
                                            Number(e.target.value)
                                        )
                                    )
                                ),
                            className:
                                "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] focus:outline-gray-500",
                        },
                        React.createElement("option", {
                            hidden: true,
                            disabled: true,
                            selected: true,
                            value: "",
                        }),
                        ...Array.from({ length: 12 }, (_, i) =>
                            React.createElement(
                                "option",
                                { value: i, key: i },
                                new Date(0, i).toLocaleString("default", {
                                    month: "long",
                                })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "flex flex-col w-2/5 ml-[20px]" },
                    React.createElement(
                        "p",
                        { className: "text-lg mb-[1px] text-black font-medium" },
                        "Date"
                    ),
                    React.createElement("input", {
                        type: "number",
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                            setBirth(
                                new Date(
                                    new Date(birth).setDate(
                                        Number(e.target.value)
                                    )
                                )
                            ),
                        className:
                            "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] focus:outline-gray-500",
                    })
                ),
                React.createElement(
                    "div",
                    { className: "flex flex-col w-full ml-[20px]" },
                    React.createElement(
                        "p",
                        { className: "text-lg mb-[1px] text-black font-medium" },
                        "Year"
                    ),
                    React.createElement("input", {
                        type: "number",
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                            setBirth(
                                new Date(
                                    new Date(birth).setFullYear(
                                        Number(e.target.value)
                                    )
                                )
                            ),
                        className:
                            "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] focus:outline-gray-500",
                    })
                )
            ),
            React.createElement(
                "p",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Note"
            ),
            React.createElement("textarea", {
                rows: 2,
                onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
                    setLink(e.target.value),
                placeholder:
                    "Please provide a link to an image of your dog, a default image will be provided if no text is present",
                className:
                    "w-full h-[110px] border-[2px] border-gray-300 rounded-md pl-[20px] pr-[20px] pt-3 mb-[10px] text-start focus:outline-gray-500",
            }),
            React.createElement(
                "div",
                { className: "flex flex-row" },
                React.createElement(
                    "button",
                    {
                        onClick: () => router.push("/animalsDashboard"),
                        type: "button",
                        className:
                            "w-[200px] h-[35px] border-[2px] border-red-500 text-red-500 rounded-md mt-[10px] mr-[20px] hover:bg-red-500 hover:text-white",
                    },
                    "Cancel"
                ),
                React.createElement(
                    "button",
                    {
                        type: "submit",
                        className:
                            "w-[200px] h-[35px] border-[2px] border-red-500 rounded-md mt-[10px] bg-red-500 text-white",
                    },
                    "Save"
                )
            )
        )
    );
}
