const express = require('express');

const app = express();

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

app.get('/popularCars', async (_req, res) => {
    const url = 'https://dm-assignment-commonshare.koyeb.app/api/cars/popular';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/cars', async (_req, res) => {
    const url = 'https://dm-assignment-commonshare.koyeb.app/api/cars';

    const { q } = _req.query;

    try {
        const response = await fetch(url + '?q=' + q);

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const url = `https://dm-assignment-commonshare.koyeb.app/api/cars/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});      

const port = 3456;

app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`),
);
