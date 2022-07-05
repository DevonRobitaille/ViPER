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

    const jobs = await prisma.job.createMany({
        data: [
            {
                name: "Painter"
            },
            {
                name: "Electrician"
            },
            {
                name: "Duct Cleaner"
            },
            {
                name: "Carpenter"
            },
            {
                name: "Plumber"
            },
            {
                name: "Landscaper"
            }
        ]
    })

    console.log("Jobs", jobs)
}

doBackFill()