/* eslint-disable react/no-unescaped-entities */
"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Edit = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    aboutOrganization: "",
    phoneNumber: "",
    email: "",
    address: "",
    expertise: "",
    location: { latitude: 0, longitude: 0 },
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  ``;
  const { data: session } = useSession();

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: { latitude, longitude },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in your browser.");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const requestBody = {
      userEmail: session?.user?.email,
      organizationName: formData.organizationName,
      aboutOrganization: formData.aboutOrganization,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      expertise: formData.expertise,
      location: formData.location,
    };

    // Create the POST request
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agency-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successfully!");
        } else {
          console.error("Error sending data:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label
            htmlFor="organizationName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Agency Name
          </label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
            required
            placeholder="Your Agency Name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="aboutOrganization"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            About the Agency
          </label>
          <textarea
            id="aboutOrganization"
            name="aboutOrganization"
            value={formData.aboutOrganization}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
            rows={4}
            required
            placeholder="Tell us more about the organization..."
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Agency's Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
            required
            placeholder="Others can see this number"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Agency's Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
            required
            placeholder="Others can see this email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Agency's Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
            required
            placeholder="Where is your Agency located?"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Location (Latitude and Longitude)
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="location"
              name="location"
              value={`${formData.location.latitude}, ${formData.location.longitude}`}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
              readOnly
            />
            <button
              type="button"
              onClick={handleLocationClick}
              className="ml-2 bg-primary hover:bg-primary/80 whitespace-nowrap h-full py-2 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Get Location
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="expertise"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Area of Expertise
          </label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-graydark"
            required
            placeholder="Expertise of Agency"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
