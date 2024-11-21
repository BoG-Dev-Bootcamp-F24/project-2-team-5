import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

export default function CreateForm(): React.ReactElement {
    const { animals = [], id = "", setLogs } = useAppContext();
    const [title, setTitle] = useState<string>("");
    const [animalId, setAnimalId] = useState<string>("");
    const [hours, setHours] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [note, setNote] = useState<string>("");

    const router = useRouter();

    async function submitForm(): Promise<void> {
        try {
            const response = await fetch("/api/training", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: id,
                    animal: animalId,
                    title,
                    date,
                    description: note,
                    hours,
                }),
                credentials: "include",
            });

            const nextResponse = await fetch("/api/animal", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ animal: animalId, hours }),
                credentials: "include",
            });

            const result = await response.text();
            const newResult = await nextResponse.text();

            if (result === "Success" && newResult === "Success") {
                alert("Success!");
                router.refresh();
                window.location.href = "/trainingDashboard";
            } else {
                alert("Error: Unable to save data");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
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
                    handleForm(e);
                    submitForm();
                },
            },
            React.createElement(
                "label",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Title"
            ),
            React.createElement("input", {
                type: "text",
                value: title,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value),
                className:
                    "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] mb-[10px] focus:outline-gray-500",
                required: true,
            }),
            React.createElement(
                "p",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Animal"
            ),
            React.createElement(
                "select",
                {
                    required: true,
                    value: animalId,
                    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                        const selectedAnimal = animals.find(
                            (animal: { name: string; }) =>
                                e.target.options[e.target.selectedIndex].id ===
                                animal.name
                        );
                        if (selectedAnimal) {
                            setAnimalId(selectedAnimal._id);
                        }
                    },
                    className:
                        "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] mb-[10px] focus:outline-gray-500",
                },
                React.createElement("option", {
                    hidden: true,
                    disabled: true,
                    value: "",
                }),
                ...animals.map((animal: { name: any; _id: any; breed: any; }) =>
                    React.createElement(
                        "option",
                        { id: animal.name, key: animal._id },
                        `${animal.name} - ${animal.breed}`
                    )
                )
            ),
            React.createElement(
                "p",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Total Hours Trained"
            ),
            React.createElement("input", {
                type: "number",
                value: hours,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    setHours(Number(e.target.value)),
                className:
                    "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] mb-[10px] focus:outline-gray-500",
                required: true,
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
                        "Month"
                    ),
                    React.createElement(
                        "select",
                        {
                            value: date.getMonth(),
                            onChange: (e: ChangeEvent<HTMLSelectElement>) =>
                                setDate(
                                    new Date(
                                        date.getFullYear(),
                                        Number(e.target.value),
                                        date.getDate()
                                    )
                                ),
                            className:
                                "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] focus:outline-gray-500",
                        },
                        React.createElement("option", {
                            hidden: true,
                            disabled: true,
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
                        value: date.getDate(),
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                            setDate(
                                new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    Number(e.target.value)
                                )
                            ),
                        className:
                            "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] focus:outline-gray-500",
                        required: true,
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
                        value: date.getFullYear(),
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                            setDate(
                                new Date(
                                    Number(e.target.value),
                                    date.getMonth(),
                                    date.getDate()
                                )
                            ),
                        className:
                            "w-full h-[45px] border-[2px] border-gray-300 rounded-md pl-[20px] pb-[2px] focus:outline-gray-500",
                        required: true,
                    })
                )
            ),
            React.createElement(
                "p",
                { className: "text-lg mb-[1px] text-black font-medium" },
                "Note"
            ),
            React.createElement("textarea", {
                value: note,
                onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
                    setNote(e.target.value),
                className:
                    "w-full h-[110px] border-[2px] border-gray-300 rounded-md pl-[20px] pr-[20px] pt-3 mb-[10px] text-start focus:outline-gray-500",
            }),
            React.createElement(
                "div",
                { className: "flex flex-row" },
                React.createElement(
                    "button",
                    {
                        onClick: () => router.push("/trainingDashboard"),
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
