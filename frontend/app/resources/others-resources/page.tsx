import AuthComponent from "@/components/Auth/AuthComponent";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { AiFillInfoCircle, AiFillTags } from "react-icons/ai";
import Link from "next/link";

async function getData() {
  const data = await prisma.agency.findMany();

  return data;
}

export const dynamic = "force-dynamic";

const Resources = async () => {
  const session = await getServerSession();
  const data = await getData();

  console.log(data);

  return (
    <>
      {session?.user != null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4  border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark dark:hover:bg-boxdark/70 hover:bg-white/70 sm:px-7.5"
            >
              <Link
                key={item.id}
                href={`others-resources/agency-data?id=${item.id}`}
              >
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <HiLocationMarker />
                  {item.address}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <MdEmail />
                  {item.email}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <BsTelephoneFill />
                  {item.contactNumber}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <AiFillInfoCircle />
                  {item.about}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <AiFillTags />
                  {item.areaOfExpertise}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <AuthComponent />
      )}
    </>
  );
};

export default Resources;
