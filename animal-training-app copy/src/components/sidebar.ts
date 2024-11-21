"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  currentPage: string;
}

export default function Sidebar({ currentPage }: SidebarProps): React.ReactElement {
  const fullName = "John Doe"; // Simulated user name
  const admin = true; // Simulated admin access
  const router = useRouter();

  useEffect(() => {
    const pageIds: { [key: string]: string } = {
      training: "training",
      animals: "animals",
      userDash: "userDash",
      animalDash: "animalDash",
      allTraining: "allTraining",
    };
    const elementId = pageIds[currentPage];
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.add("bg-red-600", "text-white");
      }
    }
  }, [currentPage]);

  return React.createElement(
    "div",
    { className: "flex flex-col w-[300px] h-screen bg-gray-50 shadow-md" },
    React.createElement(
      "div",
      { className: "p-4" },
      React.createElement(
        "button",
        {
          onClick: () => router.push("/trainingDashboard"),
          id: "training",
          className:
            "flex items-center text-lg font-medium text-gray-700 hover:bg-red-600 hover:text-white p-2 rounded-lg",
        },
        "Training Logs"
      ),
      React.createElement(
        "button",
        {
          onClick: () => router.push("/animalsDashboard"),
          id: "animals",
          className:
            "flex items-center text-lg font-medium text-gray-700 hover:bg-red-600 hover:text-white p-2 rounded-lg mt-2",
        },
        "Animals"
      )
    ),
    admin &&
      React.createElement(
        "div",
        { className: "mt-4 border-t border-gray-300 pt-4" },
        React.createElement("p", { className: "text-sm font-semibold text-gray-500" }, "Admin Access"),
        React.createElement(
          "button",
          {
            onClick: () => router.push("/allTraining"),
            id: "allTraining",
            className:
              "flex items-center text-lg font-medium text-gray-700 hover:bg-red-600 hover:text-white p-2 rounded-lg mt-2",
          },
          "All Training"
        ),
        React.createElement(
          "button",
          {
            onClick: () => router.push("/adminAnimalDashboard"),
            id: "animalDash",
            className:
              "flex items-center text-lg font-medium text-gray-700 hover:bg-red-600 hover:text-white p-2 rounded-lg mt-2",
          },
          "All Animals"
        ),
        React.createElement(
          "button",
          {
            onClick: () => router.push("/userDashboard"),
            id: "userDash",
            className:
              "flex items-center text-lg font-medium text-gray-700 hover:bg-red-600 hover:text-white p-2 rounded-lg mt-2",
          },
          "All Users"
        )
      )
  );
}
