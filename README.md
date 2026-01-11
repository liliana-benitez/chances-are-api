# ChancesAre API 🌍🦈⚡☄️

ChancesAre is a playful API that calculates your chances of experiencing some extremely unlikely events like being attacked by a shark, struck by lightning, or hit by a meteor in any city in the world.

Spoiler: you’re probably fine. Relax.

## What It Does
Given a user’s age and city, the API calculates probabilities for:

🦈 Shark attacks </br>
⚡ Lightning strikes </br>
☄️ Meteor impacts

Each result comes with:
- A probability (formatted in a human-friendly way)
- A short verdict to keep things light

## How the Calculations Work (Simplified)
⚠️ Note: These calculations are intentionally approximate and not scientifically precise. Improving accuracy is a planned next step.

### 🦈 Shark Attack
Base rate: 1 in 11,500,000 per year </br>
Adjusted by: Distance to the coast & Age 

```js
sharkProbability = BASE_SHARK_ANNUAL * age * sharkModifier(distanceToCoastKm)
```

### ⚡ Lightning Strike
Base rate: 1 in 1,200,000 per year
Adjusted by: City’s average thunderstorms & Age

```js
lightningProbability = BASE_LIGHTNING_ANNUAL * age * (cityAvgThunderstorms / globalAvgThunderstorms)
```

### ☄️ Meteor Impact
Base rate: 1 in 174,000,000 (lifetime)
Adjusted by: Age & City population

```js
meteorProbability = (BASE_METEOR_LIFETIME / 80 * age) * (1 + log10(cityPopulation / 1_000_000) * 0.1)
```

## 🚀 How to Use the API
Base URL
`http://localhost:8080`

Required Query Parameters
```
age — positive number
city — any city name (e.g. Barcelona)
```

**Endpoints** </br>
- Get all probabilities </br>
`GET /probability/weird?age=27&city=Barcelona`

- Get only shark attack probability </br>
`GET /probability/shark?age=27&city=Barcelona`

- Get only lightning strike probability </br>
`GET /probability/lightning?age=27&city=Barcelona`

- Get only meteor impact probability </br>
`GET /probability/meteor?age=27&city=Barcelona`

📦 Example Response
```js
{
  "inputs": {
    "age": 27,
    "city": "Barcelona"
  },
  "results": {
    "shark_attack": {
      "probability": "1 in 9,800,000",
      "verdict": "Extremely unlikely 🦈"
    },
    "lightning_strike": {
      "probability": "1 in 1,300,000",
      "verdict": "Still very unlikely ⚡"
    },
    "meteor_impact": {
      "probability": "1 in 160,000,000",
      "verdict": "Cosmically unlucky ☄️"
    }
  }
}
```

❌ Error Handling
```
Missing age or city → 400 Bad Request
Invalid age (non-number or ≤ 0) → 400 Bad Request
```

## 🛠 Tech Stack
Turborepo

**Frontend** </br>
Vite </br>
TypeScript </br>
Tailwind CSS </br>

**Backend** </br>
Node.js </br>
Express.js </br>
TypeScript </br>

## Data Sources & APIs
- OpenCage Geocoding API
- OpenWeatherMap API
- GeoNames Population API
- Natural Earth Coastline Data

## Next Steps
Improve accuracy of probability calculations
Add better age- and city-specific modeling
Expand to more “weird but unlikely” scenarios
Add caching and rate limiting

## ⚠️ Disclaimer
This project is for educational and entertainment purposes only.
Please do not make life decisions based on these statistics.
