const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://weather-app-five-murex-73.vercel.app",
    methods: ["GET"],
  })
);

app.get("/api/fetchnearbycities", async (req, res) => {
  const { lat, lon, username } = req.query;

  // Validate input
  if (!lat || !lon) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required.",
    });
  }
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  try {
    const response = await fetch(
      `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&cities=cities15000&radius=200&maxRows=120&username=${username}`,
    );

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: "Error fetching data from api",
      });
    }
    const data = await response.json();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error fetching data from api",
      error: err.message,
    });
  }
});

module.exports = app;
