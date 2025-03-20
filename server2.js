const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Read the JSON file and return it as response
app.get('/gadgets', (req, res) => {
    fs.readFile('inventory.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
