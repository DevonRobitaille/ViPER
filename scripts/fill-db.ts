import { prisma } from "../src/utils/prisma";

const doBackFill = async () => {
    const roles = await prisma.role.createMany({
        data: [
            {
                name: "Admin",
                value: 0
            },
            {
                name: "User",
                value: 1
            }
        ]
    })

    console.log("Roles", roles)
}

doBackFill()