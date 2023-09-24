"use client";

import AuthComponent from "@/components/Auth/AuthComponent";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  BsTruck,
  BsFillDropletFill,
  BsCapslock,
  BsHouse,
  BsChatSquareDots,
  BsSearch,
  BsBatteryCharging,
  BsShieldShaded,
  BsTrophy,
  BsTools,
  BsClipboardData,
  BsBoxArrowUpRight,
  BsCardChecklist,
} from "react-icons/bs";
const Update = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [expires, setExpires] = useState(false);
  const [transportable, setTransportable] = useState(true);
  const [borrowed, setBorrowed] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemQuality, setItemQuality] = useState(0);
  const [itemDescription, setItemDescription] = useState("");
  const [daysTillExpiration, setDaysTillExpiration] = useState(0);
  const [itemWeight, setItemWeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const createItem = async () => {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-item`;
      const body = {
        email: session?.user?.email,
        step,
        selectedOption,
        expires,
        transportable,
        borrowed,
        itemName,
        itemQuantity,
        itemQuality,
        itemDescription,
        daysTillExpiration,
        itemWeight,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        console.log("Item created:", data);
      } else {
        console.error("Failed to create item.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleCheckboxChange = (checkboxNumber: any) => {
    switch (checkboxNumber) {
      case 1:
        setExpires(!expires);
        break;
      case 2:
        setTransportable(!transportable);
        break;
      case 3:
        setBorrowed(!borrowed);
        break;
      default:
        break;
    }
  };

  const handleRatingClick = (value: any) => {
    setItemQuality(value);
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCardClick = (value: any) => {
    setSelectedOption(value);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mt-12 text-xl">
              Step 1: Classify The Resource You Want To Insert:
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Transportation Assets" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Transportation Assets"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Transportation Assets")}
              >
                <BsTruck size="25" />
                Transportation Assets
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Food and Water Supplies" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Food and Water Supplies"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Food and Water Supplies")}
              >
                <BsFillDropletFill size="25" />
                Food and Water Supplies
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Medical Supplies" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Medical Supplies"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Medical Supplies")}
              >
                <BsCapslock size="25" />
                Medical Supplies
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Shelter and Housing" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Shelter and Housing"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Shelter and Housing")}
              >
                <BsHouse size="25" />
                Shelter and Housing
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Communication Equipment" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Communication Equipment"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Communication Equipment")}
              >
                <BsChatSquareDots size="25" />
                Communication Equipment
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Search and Rescue Gear" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Search and Rescue Gear"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Search and Rescue Gear")}
              >
                <BsSearch size="25" />
                Search and Rescue Gear
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Power and Energy Supplies"
                    ? "selected"
                    : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Power and Energy Supplies"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Power and Energy Supplies")}
              >
                <BsBatteryCharging size="25" />
                Power and Energy Supplies
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Hygiene and Sanitation Items"
                    ? "selected"
                    : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Hygiene and Sanitation Items"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Hygiene and Sanitation Items")}
              >
                <BsShieldShaded size="25" />
                Hygiene and Sanitation Items
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Clothing and Personal Items"
                    ? "selected"
                    : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Clothing and Personal Items"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Clothing and Personal Items")}
              >
                <BsTrophy size="25" />
                Clothing and Personal Items
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Tools and Equipment" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Tools and Equipment"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Tools and Equipment")}
              >
                <BsTools size="25" />
                Tools and Equipment
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Financial and Administrative Resources"
                    ? "selected"
                    : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Financial and Administrative Resources"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() =>
                  handleCardClick("Financial and Administrative Resources")
                }
              >
                <BsClipboardData size="25" />
                Financial and Administrative Resources
              </div>
              <div
                className={`card flex items-center justify-center text-xl gap-2 rounded-sm border min-w-75 border-stroke hover:bg-primary/40 dark:hover:bg-primary/70 cursor-pointer py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
                  selectedOption === "Miscellaneous Resources" ? "selected" : ""
                } border p-4 cursor-pointer transition duration-300 ${
                  selectedOption === "Miscellaneous Resources"
                    ? "bg-primary dark:bg-primary/70 hover:bg-blue-600 dark:hover:bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleCardClick("Miscellaneous Resources")}
              >
                <BsCardChecklist size="25" />
                Miscellaneous Resources
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="mt-12 text-xl">
              Step 2: Give Detailed Information About The Item:
            </div>
            <div className="h-auto w-full flex flex-col">
              <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                <label className="text-lg">Item Name: </label>
                <input
                  type="text"
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                <label className="text-lg">Item Quantity: </label>
                <input
                  type="number"
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(Number(e.target.value))}
                />
              </div>
              <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                <label className="text-lg">Item Quality: </label>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handleRatingClick(index + 1)}
                      className={`text-4xl cursor-pointer ${
                        index < itemQuality
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                <label className="text-lg">Item Description: </label>
                <textarea
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
                  placeholder="(optional)"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </div>
              <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                <label className="text-lg">Item Features:</label>
                <br />
                <label className="flex items-center">
                  Does the item expire?
                  <input
                    type="checkbox"
                    checked={expires}
                    onChange={() => handleCheckboxChange(1)}
                    className="mx-2"
                  />
                </label>
                <label className="flex items-center">
                  Is it light & transportable?
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={() => handleCheckboxChange(2)}
                    className="mx-2"
                  />
                </label>
                <label className="flex items-center">
                  Is it borrowed?
                  <input
                    type="checkbox"
                    checked={borrowed}
                    onChange={() => handleCheckboxChange(3)}
                    className="mx-2"
                  />
                </label>
              </div>
              {expires && (
                <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                  <label className="text-lg">
                    How many days till it expires?:
                  </label>
                  <input
                    type="number"
                    className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
                    value={daysTillExpiration}
                    onChange={(e) =>
                      setDaysTillExpiration(Number(e.target.value))
                    }
                  />
                </div>
              )}
              {!transportable && (
                <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                  <label className="text-lg">
                    How much does it weigh? (in kgs):
                  </label>
                  <input
                    type="number"
                    className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
                    value={itemWeight}
                    onChange={(e) => setItemWeight(Number(e.target.value))}
                  />
                </div>
              )}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="mt-12 text-2xl">Step 3: Confirm The Item:</div>
            <ul className="h-auto w-full mt-3 flex flex-col">
              <li className="flex gap-3 text-xl">
                <div className="font-semibold">Item Type:</div>
                <div>{selectedOption}</div>
              </li>
              <li className="flex gap-3 text-xl">
                <div className="font-semibold">Item Name:</div>
                <div>{itemName}</div>
              </li>
              <li className="flex gap-3 text-xl">
                <div className="font-semibold">Item Quantity:</div>
                <div>{itemQuantity} units</div>
              </li>
              <li className="flex gap-3 text-xl">
                <div className="font-semibold">Item Quality:</div>
                <div>{itemQuality}/5</div>
              </li>
              {itemDescription && (
                <li className="flex gap-3 text-xl">
                  <div className="font-semibold">Item Type:</div>
                  <div>{itemDescription}</div>
                </li>
              )}
              {expires && (
                <li className="flex gap-3 text-xl">
                  <div className="font-semibold">Item Type:</div>
                  <div>{daysTillExpiration} days</div>
                </li>
              )}
              {!transportable && (
                <li className="flex gap-3 text-xl">
                  <div className="font-semibold">Item Type:</div>
                  <div>{itemWeight} kg</div>
                </li>
              )}
              {borrowed && (
                <li className="flex gap-3 text-xl">
                  <div className="font-semibold">This is a borrowed item.</div>
                </li>
              )}
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {session?.user !== null ? (
        <div className="container mx-auto p-4">
          <h1 className="text-4xl">Add Resources</h1>
          {renderStepContent()}
          {loading && "loading"}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button onClick={prevStep} className="bg-gray-200 px-6 py-2 mt-8">
                Previous
              </button>
            )}
            <div className="flex-grow"></div>
            {step === 1 && selectedOption !== "" && (
              <button
                onClick={nextStep}
                className="bg-primary text-white px-6 py-2 mt-8"
              >
                Next
              </button>
            )}
            {step === 2 &&
              itemName !== "" &&
              itemQuantity !== 0 &&
              itemQuality !== 0 &&
              (expires ? daysTillExpiration !== 0 : true) &&
              (!transportable ? itemWeight !== 0 : true) && (
                <button
                  onClick={nextStep}
                  className="bg-primary text-white px-6 py-2 mt-8"
                >
                  Next
                </button>
              )}
            {step === 3 && selectedOption !== "" && (
              <button
                className="bg-green-500 text-white px-6 py-2 mt-8"
                onClick={createItem}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <AuthComponent />
      )}
    </>
  );
};

export default Update;
