const express = require('express');
const axios = require('axios');
require("dotenv").config()
const app = express();
const PORT = 3000;

const API_KEY = process.env.weather_api_key

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Please Enter a city' });
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`);
        const data = response.data;
        if (data.error) {
            return res.status(400).json({ error: data.error.info });
        }

        res.json({
            data
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
