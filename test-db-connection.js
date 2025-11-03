const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    console.log('🔍 Testing database connection and auth...\n');
    
    // Test 1: Check database connection
    console.log('1️⃣ Testing database connection...');
    const userCount = await prisma.user.count();
    console.log(`✅ Connected! Found ${userCount} users\n`);
    
    // Test 2: Find the user
    console.log('2️⃣ Looking up user: christiaanvonstade@gmail.com');
    const user = await prisma.user.findUnique({
      where: { email: 'christiaanvonstade@gmail.com' }
    });
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }
    
    console.log('✅ User found:');
    console.log('   ID:', user.id);
    console.log('   Email:', user.email);
    console.log('   Name:', user.name);
    console.log('   Role:', user.role);
    console.log('   Password hash:', user.password);
    console.log('');
    
    // Test 3: Test password comparison
    console.log('3️⃣ Testing password comparison...');
    const password = 'Bike2453';
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (passwordMatch) {
      console.log('✅ PASSWORD MATCHES!');
      console.log('');
      console.log('🎉 AUTH SHOULD WORK!');
    } else {
      console.log('❌ PASSWORD DOES NOT MATCH!');
      console.log('Expected password:', password);
      console.log('Hash in database:', user.password);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();

