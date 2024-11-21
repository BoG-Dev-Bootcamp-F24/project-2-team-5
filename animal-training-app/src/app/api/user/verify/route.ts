import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { User } from '@/models/user.model'
import { isValidEmail, isValidPassword } from '@/lib/credentialValidation'

export async function POST(request: Request) {
  try {
    // Connect to Database
    await connectDB();

    // Email, Password
    const {email, password } = await request.json();

    // Check Email / Password
    if (!isValidEmail) {
      return NextResponse.json(
        { error: 'Please enter a valid email' },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password format' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Internel server error' },
      { status: 500 }
    )
  }
}