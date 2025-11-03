import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function updatePasswords(): Promise<void> {
  try {
    const newPassword = 'Eli&Goose';
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

    console.log('\n🎉 Both passwords updated successfully to: Eli&Goose');
  } catch (error) {
    console.error('❌ Error updating passwords:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updatePasswords();

