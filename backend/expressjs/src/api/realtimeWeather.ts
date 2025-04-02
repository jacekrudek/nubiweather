import express from "express";
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

type EmojiResponse = string[];

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "realtime",
  });
});

export default router;
