const express = require('express');
const app = express();
const port = 3000;

// Route to display group names
app.get('/', (req, res) => {
    res.send('<h1>Group Members</h1><h2>Dhrumil</h2><h2>Gagandeep</h2><h2>Ishika</h2>');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
