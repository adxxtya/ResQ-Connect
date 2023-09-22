import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const data = await req.json();
    const userEmail = data.email;
    // Step 1: Find the user based on the email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    console.log(user);

    if (!user) {
      // User not found, handle this case as needed
      return new Response("User not found", { status: 404 });
    }

    // Step 2: Create a new item associated with the user
    const newItem = await prisma.item.create({
      data: {
        itemType: data.selectedOption,
        expires: data.expires,
        transportable: data.transportable,
        borrowed: data.borrowed,
        itemName: data.itemName,
        itemQuantity: data.itemQuantity,
        itemQuality: data.itemQuality,
        itemDescription: data.itemDescription,
        daysTillExpiration: data.daysTillExpiration,
        itemWeight: data.itemWeight,
      },
    });

    // You can log the created item if needed
    console.log("Item created:", newItem);

    return new Response("Item created successfully", { status: 201 }); // 201 Created status
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the request
  }
}
