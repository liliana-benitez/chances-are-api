import { Request, Response } from "express"
import { calculateAllProbabilities } from "../services/probability.services"

export function getWeirdProbabilities(req: Request, res: Response) {
  handleProbability(req, res, "all")
}

export function getSharkProbability(req: Request, res: Response) {
  handleProbability(req, res, "shark_attack")
}

export function getLightningProbability(req: Request, res: Response) {
  handleProbability(req, res, "lightning_strike")
}

export function getMeteorProbability(req: Request, res: Response) {
  handleProbability(req, res, "meteor_impact")
}

function handleProbability(
  req: Request,
  res: Response,
  event: "shark_attack" | "lightning_strike" | "meteor_impact" | "all"
) {
  const { age, city } = req.query

  if (!age || !city) {
    return res.status(400).json({ error: "age and city required" })
  }

  const ageNumber = Number(age)

  if (isNaN(ageNumber) || ageNumber <= 0) {
    return res.status(400).json({ error: "age must be a valid number" })
  }

  const results = calculateAllProbabilities(ageNumber, city as string)

  if (event === "all") {
    res.json({
      inputs: { age: ageNumber, city },
      results
    })
  } else {
    res.json({
      inputs: { age: ageNumber, city },
      results: results[event]
    })
  }
}
