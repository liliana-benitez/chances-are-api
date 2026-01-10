import { useState } from "react"

type ProbabilityResult = {
  probability: string
  verdict: string
}

type APIResponse = {
  inputs: { age: number; city: string }
  results: {
    shark_attack: ProbabilityResult
    lightning_strike: ProbabilityResult
    meteor_impact: ProbabilityResult
  }
}

export default function Home() {
  const [age, setAge] = useState(27)
  const [city, setCity] = useState("Barcelona")
  const [data, setData] = useState<APIResponse | null>(null)
  const [loading, setLoading] = useState(false)

  console.log(data)

  const fetchProbabilities = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:8080/probability/weird?age=${age}&city=${city}`
      )
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            ChancesAre API 🌍🦈⚡☄️
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your chances of being attacked by a shark, struck by
            lightning, or hit by a meteor in any city in the world.
          </p>
        </header>

        {/* Try it */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Try It Yourself</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="Age"
              className="w-full sm:w-32 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={fetchProbabilities}
              className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700 transition disabled:opacity-50"
            >
              Get Probabilities
            </button>
          </div>

          {loading && (
            <p className="text-slate-500 animate-pulse">
              Calculating probabilities…
            </p>
          )}

          {data && (
            <div className="grid gap-4 sm:grid-cols-3">
              {Object.entries(data.results).map(([key, result]) => (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-semibold capitalize">
                    {key.replace("_", " ")}
                  </h3>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-900">
                      Probability:
                    </span>{" "}
                    {result.probability}
                  </p>
                  <p className="mt-2 text-sm">{result.verdict}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Calculations */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">How Calculations Work</h2>

          {[
            {
              title: "Shark Attack 🦈",
              desc: "Base Rate: 1 in 11,500,000 per year. Adjusted by distance to coast & age.",
              code: "sharkProbability = BASE_SHARK_ANNUAL * age * sharkModifier(distanceToCoastKm)",
              link: "https://www.floridamuseum.ufl.edu/shark-attacks/statistics/"
            },
            {
              title: "Lightning Strike ⚡",
              desc: "Base Rate: 1 in 1,200,000 per year. Adjusted by city climate & age.",
              code: "lightningProbability = BASE_LIGHTNING_ANNUAL * age * (cityAvgThunderstorms / globalAvgThunderstorms)",
              link: "https://www.weather.gov/safety/lightning-statistics"
            },
            {
              title: "Meteor Impact ☄️",
              desc: "Base Rate: 1 in 174,000,000 lifetime. Adjusted by city population & age.",
              code: "meteorProbability = (BASE_METEOR_LIFETIME / 80 * age) * (1 + log10(cityPopulation / 1_000_000) * 0.1)",
              link: "https://cneos.jpl.nasa.gov/stats/"
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 space-y-3"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
                {item.code}
              </pre>
              <a
                href={item.link}
                target="_blank"
                className="inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                Data source →
              </a>
            </div>
          ))}
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">How to Use the API</h2>

          {/* Base URL */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-2">
            <h3 className="text-lg font-semibold">Base URL</h3>
            <pre className="rounded-lg bg-slate-900 p-4 text-slate-100 text-sm">
              https://your-api-domain
            </pre>
          </div>

          {/* Query Parameters */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            <h3 className="text-lg font-semibold">Required Query Parameters</h3>
            <ul className="list-disc pl-6 text-slate-700 space-y-1">
              <li>
                <strong>age</strong> — A positive number representing the user’s
                age
              </li>
              <li>
                <strong>city</strong> — Any city name (e.g.{" "}
                <code>Barcelona</code>)
              </li>
            </ul>
          </div>

          {/* Endpoints */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Endpoints</h3>

            {/* Weird */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <h4 className="font-semibold">GET /probability/weird</h4>
              <p className="text-slate-600">
                Returns all probability calculations at once.
              </p>
              <pre className="rounded-lg bg-slate-900 p-4 text-slate-100 text-sm">
                {`GET /probability/weird?age=27&city=Barcelona`}
              </pre>
            </div>

            {/* Shark */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <h4 className="font-semibold">GET /probability/shark</h4>
              <p className="text-slate-600">
                Returns only the shark attack probability.
              </p>
              <pre className="rounded-lg bg-slate-900 p-4 text-slate-100 text-sm">
                {`GET /probability/shark?age=27&city=Barcelona`}
              </pre>
            </div>

            {/* Lightning */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <h4 className="font-semibold">GET /probability/lightning</h4>
              <p className="text-slate-600">
                Returns only the lightning strike probability.
              </p>
              <pre className="rounded-lg bg-slate-900 p-4 text-slate-100 text-sm">
                {`GET /probability/lightning?age=27&city=Barcelona`}
              </pre>
            </div>

            {/* Meteor */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <h4 className="font-semibold">GET /probability/meteor</h4>
              <p className="text-slate-600">
                Returns only the meteor impact probability.
              </p>
              <pre className="rounded-lg bg-slate-900 p-4 text-slate-100 text-sm">
                {`GET /probability/meteor?age=27&city=Barcelona`}
              </pre>
            </div>
          </div>

          {/* Response Example */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            <h3 className="text-lg font-semibold">Example Response</h3>
            <pre className="rounded-lg bg-slate-900 p-4 text-slate-100 text-sm overflow-x-auto">
              {`{
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
}`}
            </pre>
          </div>

          {/* Errors */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 space-y-2">
            <h3 className="text-lg font-semibold text-red-700">
              Error Responses
            </h3>
            <ul className="list-disc pl-6 text-red-700 text-sm space-y-1">
              <li>
                Missing <code>age</code> or <code>city</code> →
                <code>400 Bad Request</code>
              </li>
              <li>
                Invalid <code>age</code> (non-number or ≤ 0) →
                <code>400 Bad Request</code>
              </li>
            </ul>
          </div>
        </section>

        {/* Resources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Resources & Links</h2>
          <ul className="space-y-2">
            {[
              ["OpenCage Geocoding API", "https://opencagedata.com/"],
              ["OpenWeatherMap API", "https://openweathermap.org/api"],
              [
                "GeoNames Population API",
                "https://www.geonames.org/export/web-services.html"
              ],
              [
                "Natural Earth Coastline Data",
                "https://www.naturalearthdata.com/downloads/10m-physical-vectors/"
              ]
            ].map(([label, url]) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
