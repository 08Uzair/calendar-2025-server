import express from "express";
import {
  addEvent,
  deleteEvent,
  getEvent,
  getEventById,
  updateEvent,
} from "../controllers/event.js";

// import auth from "../middleware/auth.js"
export const eventRouter = express.Router();
eventRouter.post("/", addEvent);
eventRouter.get("/", getEvent);
eventRouter.get("/:id", getEventById);
eventRouter.delete("/:id", deleteEvent);
eventRouter.put("/:id", updateEvent);
