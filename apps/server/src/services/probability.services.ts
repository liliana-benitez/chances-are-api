import { BASE_RATES } from "../constants/baseRates"
import {
  sharkCityModifier,
  lightningCityModifier,
  meteorCityModifier
} from "../utils/cityClassifier"
import { toPercentage } from "../utils/formatters"

export function calculateAllProbabilities(age: number, city: string) {
  const shark = BASE_RATES.SHARK_ANNUAL * age * sharkCityModifier(city)

  const lightning =
    BASE_RATES.LIGHTNING_ANNUAL * age * lightningCityModifier(city)

  const meteorAnnual =
    (BASE_RATES.METEOR_LIFETIME / BASE_RATES.ASSUMED_LIFESPAN) * age

  const meteor = meteorAnnual * meteorCityModifier(city)

  return {
    shark_attack: {
      probability: toPercentage(shark),
      verdict: "Relax."
    },
    lightning_strike: {
      probability: toPercentage(lightning),
      verdict: "Still very unlikely."
    },
    meteor_impact: {
      probability: toPercentage(meteor),
      verdict: "Astronomically low."
    }
  }
}
