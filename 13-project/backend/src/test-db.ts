import { prisma } from "./config/database";

async function main() {
  const users = await prisma.user.findMany();
  console.log(users, "users");
}
main();
