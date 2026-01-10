export function sharkCityModifier(city: string) {
  const coastalCities = ["barcelona", "miami", "sydney", "lisbon"]
  if (coastalCities.includes(city.toLowerCase())) return 1
  return 0.01
}

export function lightningCityModifier(city: string) {
  const stormyCities = ["miami", "bangkok", "singapore"]
  if (stormyCities.includes(city.toLowerCase())) return 1.5
  return 1
}

export function meteorCityModifier(city: string) {
  const megaCities = ["tokyo", "new york", "london"]
  if (megaCities.includes(city.toLowerCase())) return 1.2
  return 1
}
