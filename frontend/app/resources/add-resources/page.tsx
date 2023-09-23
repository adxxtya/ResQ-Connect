import AuthComponent from "@/components/Auth/AuthComponent";
import CardAdd from "@/components/Card/Add-Resources";
import CardDataStats from "@/components/Card/Card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const Resourcespage = async () => {
  const session = await getServerSession();
  return (
    <>
      {session?.user != null ? (
        <div className="flex flex-col gap-4 w-full">
          <Link href="/resources/add-resources/new">
            <CardAdd title="Add Resources" desc="Resources" />
          </Link>
          <div className="flex flex-col md:flex-row gap-4">
            <CardDataStats
              title="Access Agency's Stored Resources"
              desc="This section provides exclusive access to our agency's extensive inventory of essential resources. From food and water supplies to medical equipment and shelter materials, agencies can explore and manage the resources we have available for disaster relief operations."
            />
            <CardDataStats
              title="Discover Resources from Other Agencies"
              desc="In this section, you can explore the readily available resources shared by our partner relief agencies. Collaboration and coordination are crucial during crises, and this platform allows authorized agencies to access shared resources. Together, we can ensure that aid reaches those in need promptly."
            />
          </div>
        </div>
      ) : (
        <AuthComponent />
      )}
    </>
  );
};

export default Resourcespage;
