"use client";
import { Agency, Item } from "@prisma/client"; // Import Item type
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [agency, setAgency] = useState<Agency | null>(null);
  const [items, setItems] = useState<Item[] | null>(null); // State for items
  const searchParams = useSearchParams();
  const page = searchParams.get("id");

  useEffect(() => {
    const id = page;

    const payload = {
      id: id,
    };

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-agency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAgency(data.agency); // Set agency
        setItems(data.items); // Set items
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });
  }, [page]);

  return (
    <div>
      {agency && (
        <>
          <h3 className="text-3xl font-semibold mb-4">Agency Information:</h3>
          <div className="border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h2 className="text-3xl font-semibold">{agency.name}</h2>
            <p className="text-gray-600 text-xl mt-4">
              <span className="text-primary mr-2">Location:</span>
              {agency.address}
            </p>
            <p className="text-gray-600 text-xl">
              <span className="text-primary mr-2">Email:</span>
              {agency.email}
            </p>
            <p className="text-gray-600 text-xl">
              <span className="text-primary mr-2">Contact Number:</span>
              {agency.contactNumber}
            </p>
            <p className="text-gray-600 text-xl">
              <span className="text-primary mr-2">About:</span>
              {agency.about}
            </p>
            <p className="text-gray-600 text-xl">
              <span className="text-primary mr-2">Area of Expertise:</span>
              {agency.areaOfExpertise}
            </p>
          </div>
        </>
      )}

      {/* Render items here */}
      {items && (
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-4">Agency Resources:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 border-stroke bg-white px-5 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark dark:hover:bg-boxdark/70 hover:bg-white/70 sm:px-7.5"
              >
                <div className="text-gray-600 text-xl flex">
                  <p className="text-3xl mb-1">{item.itemName}</p>
                </div>
                <div className="text-gray-600 text-xl flex">
                  <span className="text-primary mr-2">Item Quantity:</span>
                  <p className="text-lg">{item.itemQuantity}</p>
                </div>
                <div className="text-gray-600 text-xl flex">
                  <span className="text-primary mr-2">Item Quality:</span>
                  <p className="text-lg">{item.itemQuality}</p>
                </div>
                {item.itemDescription && (
                  <div className="text-gray-600 text-xl flex">
                    <span className="text-primary mr-2">Item Description:</span>
                    <p className="text-lg">{item.itemDescription}</p>
                  </div>
                )}
                {item.itemType && (
                  <div className="text-gray-600 text-xl flex">
                    <span className="text-primary mr-2">Item Type:</span>
                    <p className="text-lg">{item.itemType}</p>
                  </div>
                )}
                {item.itemWeight !== 0 && (
                  <div className="text-gray-600 text-xl flex">
                    <span className="text-primary mr-2">Item Weight:</span>
                    <p className="text-lg">{item.itemWeight}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
