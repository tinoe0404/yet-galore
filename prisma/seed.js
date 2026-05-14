const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@yetgalore.com';
  const password = process.env.ADMIN_PASSWORD || 'secret';
  
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 12);
    
    await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        name: 'Super Admin',
      }
    });
    console.log(`Created default admin: ${email}`);
  } else {
    console.log(`Admin ${email} already exists.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
