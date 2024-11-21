import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { Animal } from '@/models/animal.model'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const animal = await Animal.findById(params.id)
    
    if (!animal) {
      return NextResponse.json(
        { success: false, error: 'Animal not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      data: animal 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch animal' },
      { status: 500 }
    )
  }
}