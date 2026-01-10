import { Router } from "express"
import {
  getLightningProbability,
  getMeteorProbability,
  getSharkProbability,
  getWeirdProbabilities
} from "../controllers/probability.controller"

const router = Router()

router.get("/weird", getWeirdProbabilities)
router.get("/shark", getSharkProbability)
router.get("/lightning", getLightningProbability)
router.get("/meteor", getMeteorProbability)

export default router
