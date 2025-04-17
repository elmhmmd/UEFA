import { NextResponse } from "next/server"
import { getMockData } from "@/lib/mock-data"

export async function GET() {
  try {
    // Instead of fetching from SofaScore, return our mock data
    const mockData = getMockData()
    return NextResponse.json({ events: mockData })
  } catch (error) {
    console.error("Error generating mock data:", error)
    return NextResponse.json({ error: "Failed to generate match data" }, { status: 500 })
  }
}
