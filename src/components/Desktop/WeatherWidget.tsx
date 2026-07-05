import { useEffect, useState } from 'react'
import { fetchWeather, WEATHER_LABELS, type WeatherData } from '../apps/WeatherApp'
import { useOSStore } from '../../store/osStore'
import AppIcon from '../icons/AppIcon'

function WeatherWidget() {
  const openWindow = useOSStore(state => state.openWindow)
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    fetchWeather().then(setWeather).catch(() => undefined)
  }, [])

  return (
    <button type="button" className="desktop-widget weather-widget" onClick={() => openWindow('weather')}>
      <span className="desktop-widget-label">Weather</span>
      <div className="weather-widget-body">
        <AppIcon id="weather" size={22} />
        <div>
          <strong>Sankhali, Goa</strong>
          <span>{weather ? `${weather.temperature}°C · ${WEATHER_LABELS[weather.code] ?? 'Forecast'}` : 'Loading…'}</span>
        </div>
      </div>
    </button>
  )
}

export default WeatherWidget
