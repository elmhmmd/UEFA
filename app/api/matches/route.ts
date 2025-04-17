// /app/api/matches/route.ts
import { NextResponse } from "next/server"

const API_BASE_URL = "https://v3.football.api-sports.io"
const API_KEY = process.env.APISPORTS_KEY

export async function GET() {
  if (!API_KEY) {
    console.error("API key is missing.")
    return NextResponse.json({ error: "API key configuration error." }, { status: 500 })
  }

  // Construct the API URL for UCL 2024 Quarter Finals
  // League ID 2 = UEFA Champions League
  // Season 2023 = 2023/2024 season
  // Stage = Quarter-finals (API-Football uses this parameter name)
  const apiUrl = `${API_BASE_URL}/fixtures?league=2&season=2023&round=Quarter-finals`  // Old line using stage

  try {
    const apiResponse = await fetch(apiUrl, {
      headers: {
        "x-apisports-key": API_KEY,
      },
      // Optional: Revalidate data periodically or on demand
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!apiResponse.ok) {
      const errorData = await apiResponse.text()
      console.error(`API Error (${apiResponse.status}): ${errorData}`)
      throw new Error(`Failed to fetch matches from API-FOOTBALL: ${apiResponse.statusText}`)
    }

    const data = await apiResponse.json()

    // Check for API-level errors reported in the JSON response
    if (data.errors && Object.keys(data.errors).length > 0) {
        console.error("API-FOOTBALL reported errors:", data.errors)
        // Format a user-friendly error message if possible
        const errorKey = Object.keys(data.errors)[0];
        const errorMessage = data.errors[errorKey] || "API returned an unspecified error.";
        return NextResponse.json({ error: `API Error: ${errorMessage}` }, { status: 500 });
    }

    // The actual match data is in the `response` array
    const matches = data.response || []

    // Return the matches array directly
    return NextResponse.json(matches)

  } catch (error) {
    console.error("Error fetching matches:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred fetching matches."
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}