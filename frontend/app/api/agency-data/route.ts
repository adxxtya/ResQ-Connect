import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const userEmail = data.userEmail;

    const user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const existingAgency = await prisma.agency.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (existingAgency) {
      const updatedAgency = await prisma.agency.update({
        where: {
          id: existingAgency.id,
        },
        data: {
          name: data.organizationName,
          email: data.email,
          address: data.address,
          about: data.aboutOrganization,
          contactNumber: data.phoneNumber,
          location: data.location,
          areaOfExpertise: data.expertise,
        },
      });
      return new Response("Agency updated successfully", { status: 200 });
    } else {
      const agency = await prisma.agency.create({
        data: {
          name: data.organizationName,
          email: data.email,
          address: data.address,
          about: data.aboutOrganization,
          contactNumber: data.phoneNumber,
          location: data.location,
          areaOfExpertise: data.expertise,
          user: {
            connect: { id: user.id },
          },
        },
      });
      return new Response("Agency created successfully", { status: 201 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
