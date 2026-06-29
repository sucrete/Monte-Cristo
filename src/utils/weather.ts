const EDINBURG_LAT = 26.3017;
const EDINBURG_LON = -98.1633;

export async function fetchWeather() {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${EDINBURG_LAT}&longitude=${EDINBURG_LON}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FChicago&forecast_days=5`,
      { next: { revalidate: 1800 } },
    );
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export function getWeatherLabel(code: number, windSpeed = 0): string {
  if (windSpeed > 20) return 'Windy';
  if (code === 0)     return 'Sunny';
  if (code <= 2)      return 'Partly Cloudy';
  if (code === 3)     return 'Cloudy';
  if (code <= 48)     return 'Foggy';
  if (code <= 82)     return 'Rainy';
  if (code <= 86)     return 'Snowy';
  return                     'Stormy';
}
