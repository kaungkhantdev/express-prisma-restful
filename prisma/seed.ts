import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.create({
    data: {
        name: "hello",
        email: "hello@one.com",
        gender: "male"
    }
  })
  const bi = await prisma.user.create({
    data: {
        name: "bi",
        email: "bi@one.com",
        gender: "male"
    }
  })

  const usr = await prisma.role.create({
    data: {
        name: "user",
    }
  })
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })