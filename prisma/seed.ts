import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create 3 admin users
  const adminUsers = [
    {
      name: 'Admin 1',
      email: 'admin1@wedding.com',
      password: 'admin123',
    },
    {
      name: 'Admin 2',
      email: 'admin2@wedding.com',
      password: 'admin123',
    },
    {
      name: 'Admin 3',
      email: 'admin3@wedding.com',
      password: 'admin123',
    },
  ]

  for (const admin of adminUsers) {
    const hashedPassword = await bcrypt.hash(admin.password, 10)
    
    await prisma.user.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: 'admin',
      },
    })
    
    console.log(`Created admin user: ${admin.email}`)
  }

  // Create some sample guests
  const sampleGuests = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+27 123 456 7890',
      relationToBride: 'Friend',
      relationToGroom: null,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+27 123 456 7891',
      relationToBride: null,
      relationToGroom: 'Colleague',
    },
  ]

  for (const guest of sampleGuests) {
    await prisma.guest.upsert({
      where: { email: guest.email },
      update: {},
      create: guest,
    })
    
    console.log(`Created sample guest: ${guest.firstName} ${guest.lastName}`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

