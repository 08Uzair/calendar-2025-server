import { event } from "../models/event.js";

// Create Event
export const addEvent = async (req, res) => {
  // const user = req.userId;
  const { user, title, category,bgColor, startTime, endTime } = req.body;
  const saveData = new event({
    user,
    title,
    category,bgColor,
    startTime,
    endTime,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

//Get Event
// Get Events with optional filters: month, year, date
// export const getEvent = async (req, res) => {
//   try {
//     const { month, year, date } = req.query;

//     const filter = {};

//     if (year || month || date) {
//       // Default to 1st day of the given month if date is missing
//       const givenYear = parseInt(year) || new Date().getFullYear();
//       const monthMap = {
//         Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
//         Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
//       };

//       const givenMonth = month ? monthMap[month] : 0;
//       const givenDate = parseInt(date) || 1;

//       const start = new Date(givenYear, givenMonth, givenDate);
//       let end;

//       if (date) {
//         // End of the specific date
//         end = new Date(givenYear, givenMonth, givenDate + 1);
//       } else if (month) {
//         // End of the month
//         end = new Date(givenYear, givenMonth + 1, 1);
//       } else {
//         // End of the year
//         end = new Date(givenYear + 1, 0, 1);
//       }

//       filter.startTime = { $gte: start, $lt: end };
//       console.log(filter.startTime, "This is start time")
//     }

//     const events = await event.find(filter).sort({ endTime: -1 }).populate("user");
//     console.log(events, "This is EventData")
//     res.status(200).json({ events });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "failed" });
//   }
// };

export const getEvent = async (req, res) => {
  try {
      const { month, year, date } = req.query;
      const filter = {};

      if (year || month || date) {
          const monthMap = {
              Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
              Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
          };

          let givenYear = parseInt(year) || new Date().getFullYear();
          let givenMonth = month ? monthMap[month] : new Date().getMonth();
          let givenDate = date ? parseInt(date) : 1;

          let startDate, endDate;

          if (date) {
              // Start of the given date at 00:00 UTC
              startDate = new Date(Date.UTC(givenYear, givenMonth, givenDate, 0, 0, 0));
              // End of the given date at 23:59:59 UTC
              endDate = new Date(Date.UTC(givenYear, givenMonth, givenDate, 23, 59, 59));
          } else if (month) {
              startDate = new Date(Date.UTC(givenYear, givenMonth, 1, 0, 0, 0));
              endDate = new Date(Date.UTC(givenYear, givenMonth + 1, 1, 0, 0, 0));
          } else {
              startDate = new Date(Date.UTC(givenYear, 0, 1, 0, 0, 0));
              endDate = new Date(Date.UTC(givenYear + 1, 0, 1, 0, 0, 0));
          }

          filter.startTime = { $gte: startDate.toISOString(), $lt: endDate.toISOString() };
      }

      const events = await event.find(filter).sort({ endTime: -1 }).populate("user");
      res.status(200).json({ events });

  } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to retrieve events" });
  }
};



// Get Event by Id
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const events = await event.findById(id).populate("user");
    if (!events) {
      return res.status(404).json({ message: "Event Not Found" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { user, title, category,bgColor, startTime, endTime } = req.body;
  try {
    const updatedata = {
      user,
      title,
      category,
      bgColor,
      startTime,
      endTime,
    };
    const updatedEvent = await event.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event Not Found" });
    }
    res.status(200).json({ result: updatedEvent, message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event Not Found" });
    }
    res.status(200).json({ message: "Event Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
