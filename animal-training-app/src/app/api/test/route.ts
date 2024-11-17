import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { Animal } from '@/models/animal.model'
import { User } from '@/models/user.model'
import { TrainingLog } from '@/models/training_log.model'

export async function GET() {
  try {
    await connectDB()
    // Create a test user
    const user = await User.create({
      fullName: "Test User",
      email: "test@example.com",
      password: "password123",
      admin: false
    })

    // Create a test animal
    const animal = await Animal.create({
      name: "Test Animal",
      breed: "Test Breed",
      owner: user._id,  // Link to the user
      hoursTrained: 0,
      profilePicture: "https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg"
    })

    // Create a test training log
    const trainingLog = await TrainingLog.create({
      user: user._id,
      animal: animal._id,
      title: "First Training Session",
      date: new Date(),
      description: "Initial training session",
      hours: 2
    })

    return NextResponse.json({ 
      success: true, 
      data: { user, animal, trainingLog }
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create test data' },
      { status: 500 }
    )
  }
}