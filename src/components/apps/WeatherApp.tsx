import { useEffect, useState } from 'react'
import AppIcon from '../icons/AppIcon'

interface WeatherData {
  temperature: number
  humidity: number
  code: number
  high: number
  low: number
}

const WEATHER_LABELS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light drizzle',
  61: 'Rain',
  63: 'Rain',
  80: 'Showers',
  95: 'Thunderstorm',
}

const GOA_LAT = 15.65
const GOA_LON = 74.12

async function fetchWeather(): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(GOA_LAT))
  url.searchParams.set('longitude', String(GOA_LON))
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code')
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
  url.searchParams.set('timezone', 'Asia/Kolkata')

  const res = await fetch(url)
  const data = await res.json()

  return {
    temperature: Math.round(data.current.temperature_2m),
    humidity: data.current.relative_humidity_2m,
    code: data.current.weather_code,
    high: Math.round(data.daily.temperature_2m_max[0]),
    low: Math.round(data.daily.temperature_2m_min[0]),
  }
}

function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeather()
      .then(setWeather)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="weather-app">
      <div className="weather-app-hero">
        <AppIcon id="weather" size={36} />
        <div>
          <p className="weather-app-location">Sankhali, Goa</p>
          <h2>{loading ? '—' : `${weather?.temperature}°C`}</h2>
          <p>{loading ? 'Loading forecast…' : WEATHER_LABELS[weather?.code ?? 0] ?? 'Local weather'}</p>
        </div>
      </div>

      {!loading && weather && (
        <div className="weather-app-grid">
          <div className="weather-app-stat">
            <span>High</span>
            <strong>{weather.high}°C</strong>
          </div>
          <div className="weather-app-stat">
            <span>Low</span>
            <strong>{weather.low}°C</strong>
          </div>
          <div className="weather-app-stat">
            <span>Humidity</span>
            <strong>{weather.humidity}%</strong>
          </div>
        </div>
      )}

      <p className="weather-app-note">Live data from Open-Meteo for Goa region.</p>
    </div>
  )
}

export default WeatherApp

export { fetchWeather, WEATHER_LABELS }
export type { WeatherData }
