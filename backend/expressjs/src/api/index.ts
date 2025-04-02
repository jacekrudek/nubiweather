import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import forecastWeather from "./forecastWeather";
import realtimeWeather from "./realtimeWeather";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/forecast-weather", forecastWeather);
router.use("/realtime-weather", realtimeWeather);

export default router;
