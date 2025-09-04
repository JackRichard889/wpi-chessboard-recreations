require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8020;

app.get("/options/:id", (req, res) => {
    // The parameter is available on the request object as req.params.id.
    const optionId = req.params.id;

    // You can now use optionId to fetch specific data from a database or perform other logic.
    // For this example, we'll just send a simple JSON response.
    const response = {
        message: `You requested option with ID: ${optionId}`,
        data: {
            id: optionId,
            // You would replace this with real data based on the ID.
            name: `Option ${optionId}`,
        },
    };

    res.json(response);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
