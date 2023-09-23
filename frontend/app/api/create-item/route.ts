import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const userEmail = data.email;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    console.log(user);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

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
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log("Item created:", newItem);

    return new Response("Item created successfully", { status: 201 }); // 201 Created status
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
