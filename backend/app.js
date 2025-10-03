require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')
const {
  getEulerJaenischTourCoordinates,
  getDeMoivreTourCoordinates,
  getRogetTour1Coordinates,
  getKingMagicTourCoordinates,
  getRogetTour2Coordinates,
  getEuler6x6TourCoordinates,
  get7x7TourCoordinates,
  get5x5TourCoordinates,
} = require('./logic')
const PORT = process.env.PORT || 8020;

app.use(cors())

// The route is updated to /api/v1/options/:id
app.get("/api/v1/options/:id", (req, res) => {
  const optionId = req.params.id;
  let coordinatesArr = [];
  let tourName = "";

  // A switch statement selects the correct function based on the ID
  switch (optionId) {
    case '1':
      tourName = "Knight's Tour (Euler-Jaenisch)";
      coordinatesArr = getEulerJaenischTourCoordinates();
      break;
    case '2':
      tourName = "Knight's Tour (DeMoivre)";
      coordinatesArr = getDeMoivreTourCoordinates();
      break;
    case '3':
      tourName = "Knight's Tour I (Roget)";
      coordinatesArr = getRogetTour1Coordinates();
      break;
    case '4':
      tourName = "King's Magic Tour";
      coordinatesArr = getKingMagicTourCoordinates();
      break;
    case '5':
      tourName = "Knight's Tour II (Roget)";
      coordinatesArr = getRogetTour2Coordinates();
      break;
    case '6':
      tourName = "Knight's Tour on 6x6 Board (Euler)";
      coordinatesArr = getEuler6x6TourCoordinates();
      break;
    case '7':
      tourName = "Knight's Tour on 7x7 Board";
      coordinatesArr = get7x7TourCoordinates();
      break;
    case '8':
      tourName = "Knight's Tour on 5x5 Board";
      coordinatesArr = get5x5TourCoordinates();
      break;
    default:
      // Handle cases where the ID is not valid
      return res.status(404).json({
        error: `Invalid option ID: ${optionId}`,
        message: "Please provide a valid ID (1-8 or 11-18)."
      });
  }

  // Build the success response object
  const response = {
    message: `Successfully retrieved data for option ID: ${optionId}`,
    data: {
      id: optionId,
      name: tourName,
      coordinates: coordinatesArr
    },
  };

  res.json(response);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
