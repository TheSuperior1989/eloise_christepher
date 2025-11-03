import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Test 1: Database connection
    const userCount = await prisma.user.count();
    
    // Test 2: Find the specific user
    const user = await prisma.user.findUnique({
      where: { email: 'christiaanvonstade@gmail.com' }
    });
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found',
        userCount,
      });
    }
    
    // Test 3: Test password hash
    const testPassword = 'Bike2453';
    const passwordMatch = await bcrypt.compare(testPassword, user.password);
    
    return NextResponse.json({
      success: true,
      userCount,
      userExists: !!user,
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      passwordHashLength: user.password.length,
      passwordHashPrefix: user.password.substring(0, 10),
      passwordMatches: passwordMatch,
      testPassword: testPassword,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}

