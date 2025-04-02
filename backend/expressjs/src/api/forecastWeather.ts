import express from "express";
import axios from "axios";
import WeatherResponse from "../interfaces/WeatherResponse";

const router = express.Router();

router.get<{}, WeatherResponse>("/", async (req, res) => {
  try {
    const apiUrl = "http://api.weatherapi.com/v1/forecast.json";

    const location = req.query.location as string;
    const noOfDays = parseInt(req.query.days as string);

    const params = {
      key: process.env.API_KEY,
      q: location,
      days: noOfDays,
    };

    const response = await axios.get<JSON>(apiUrl, { params });

    res.json({
      success: true,
      data: response.data,
    });
  } catch {
    res.json({
      success: false,
      data: null,
    });
  }
});

export default router;
