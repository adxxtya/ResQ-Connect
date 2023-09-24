import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const agencies = await prisma.agency.findMany();

    const responseBody = JSON.stringify(agencies); // Convert the array to a JSON string

    return new Response(responseBody, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching agencies:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
