import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const id = data.id;

    const agency = await prisma.agency.findUnique({
      where: {
        id: id,
      },
    });

    if (!agency) {
      return new Response(JSON.stringify({ error: "No Such Agency Found" }), {
        status: 404,
      });
    }

    // Fetch the user associated with the agency
    const user = await prisma.user.findUnique({
      where: {
        id: agency.userId,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "No User Found for Agency" }),
        {
          status: 404,
        }
      );
    }

    const items = await prisma.item.findMany({
      where: {
        userId: user.id,
      },
    });

    console.log("Agency:", agency);
    console.log("User:", user);
    console.log("Items:", items);

    return new Response(JSON.stringify({ agency, items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
