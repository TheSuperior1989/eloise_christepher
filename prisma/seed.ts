import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create 3 admin users with real email addresses
  const adminUsers = [
    {
      name: 'Christiaan von Stade',
      email: 'christiaanvonstade@gmail.com',
      password: 'admin123',
    },
    {
      name: 'Eloise Bissei',
      email: 'eloisebissei@gmail.com',
      password: 'admin123',
    },
    {
      name: 'Christepher von Stade',
      email: 'christepher.vonstade@gmail.com',
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

  // Create wedding party members as guests
  const weddingPartyGuests = [
    // Bridal Party
    {
      firstName: 'Cherize',
      lastName: 'Van Stade',
      email: null,
      phone: null,
      relationToBride: 'Maid of Honor',
      relationToGroom: null,
      invitationToken: crypto.randomBytes(32).toString('hex'),
    },
    {
      firstName: 'Anieke',
      lastName: 'Kelly',
      email: null,
      phone: null,
      relationToBride: 'Bridesmaid',
      relationToGroom: null,
      invitationToken: crypto.randomBytes(32).toString('hex'),
    },
    {
      firstName: 'Bianca',
      lastName: '',
      email: null,
      phone: null,
      relationToBride: 'Bridesmaid',
      relationToGroom: null,
      invitationToken: crypto.randomBytes(32).toString('hex'),
    },
    // Groom's Party
    {
      firstName: 'Brian',
      lastName: 'Le Roux',
      email: null,
      phone: null,
      relationToBride: null,
      relationToGroom: 'Best Man',
      invitationToken: crypto.randomBytes(32).toString('hex'),
    },
    {
      firstName: 'Jeandré',
      lastName: 'Du Plessis',
      email: null,
      phone: null,
      relationToBride: null,
      relationToGroom: 'Best Man',
      invitationToken: crypto.randomBytes(32).toString('hex'),
    },
    {
      firstName: 'Pieter',
      lastName: 'Myburge',
      email: null,
      phone: null,
      relationToBride: null,
      relationToGroom: 'Groomsman',
      invitationToken: crypto.randomBytes(32).toString('hex'),
    },
    {
      firstName: 'André',
      lastName: 'Bisset',
      email: null,
      phone: null,
      relationToBride: null,
      relationToGroom: 'Groomsman',
      invitationToken: crypto.randomBytes(32).toString('hex'),
    },
  ]

  for (const guest of weddingPartyGuests) {
    // For guests without email, we can't use email as unique identifier
    // So we'll check by name instead
    const existingGuest = await prisma.guest.findFirst({
      where: {
        firstName: guest.firstName,
        lastName: guest.lastName,
      },
    })

    if (!existingGuest) {
      await prisma.guest.create({
        data: guest,
      })
      console.log(`Created wedding party guest: ${guest.firstName} ${guest.lastName}`)
    } else {
      console.log(`Wedding party guest already exists: ${guest.firstName} ${guest.lastName}`)
    }
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

