import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { Animal } from '@/models/animal.model'

export async function GET() {
  try {
    await connectDB()

    const animals = await Animal.find({})
    
    return NextResponse.json({ 
      success: true, 
      data: animals 
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch animals' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newAnimal = await Animal.create(body)
    
    return NextResponse.json({ 
      success: true, 
      data: newAnimal 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create animal' },
      { status: 500 }
    )
  }
}