import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function updatePasswords(): Promise<void> {
  const newPassword = process.env.NEW_ADMIN_PASSWORD;
  if (!newPassword) {
    throw new Error('NEW_ADMIN_PASSWORD environment variable is not set');
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update Eloise's password
    const eloise = await prisma.user.update({
      where: { email: 'eloisebissei@gmail.com' },
      data: { password: hashedPassword },
    });
    console.log(`✅ Updated password for ${eloise.email}`);

    // Update Christepher's password
    const christepher = await prisma.user.update({
      where: { email: 'christepher.vonstade@gmail.com' },
      data: { password: hashedPassword },
    });
    console.log(`✅ Updated password for ${christepher.email}`);

    console.log('\n🎉 Both passwords updated successfully');
  } catch (error) {
    console.error('❌ Error updating passwords:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updatePasswords();

