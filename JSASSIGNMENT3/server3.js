const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Add this route for the home page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Gadget API</h1>');
});

// GET: Retrieve all gadgets (Read operation)
app.get('/gadgets', (req, res) => {
    fs.readFile('inventory.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
        } else {
            res.json(JSON.parse(data)); 
        }
    });
});

// POST: Add a new gadget (Create operation)
app.post('/gadgets', (req, res) => {
    const gadgets = JSON.parse(fs.readFileSync('inventory.json', 'utf8')); 
    const newGadget = req.body; 

    gadgets.push(newGadget); 

    fs.writeFileSync('inventory.json', JSON.stringify(gadgets, null, 2), 'utf8');
    res.status(201).send(newGadget); 
});

// PUT: Update an existing gadget (Update operation)
app.put('/gadgets/:itemId', (req, res) => {
    const gadgets = JSON.parse(fs.readFileSync('inventory.json', 'utf8')); 
    const itemId = parseInt(req.params.itemId); 
    const index = gadgets.findIndex(gadget => gadget.itemId === itemId); 

    if (index !== -1) {
        gadgets[index] = { ...gadgets[index], ...req.body }; 
        fs.writeFileSync('inventory.json', JSON.stringify(gadgets, null, 2), 'utf8'); 
        res.send(gadgets[index]); 
    } else {
        res.status(404).send('Gadget not found'); 
    }
});

// DELETE: Remove a gadget (Delete operation)
app.delete('/gadgets/:itemId', (req, res) => {
    let gadgets = JSON.parse(fs.readFileSync('inventory.json', 'utf8')); 
    const itemId = parseInt(req.params.itemId); 
    gadgets = gadgets.filter(gadget => gadget.itemId !== itemId); 

    fs.writeFileSync('inventory.json', JSON.stringify(gadgets, null, 2), 'utf8');
    res.status(204).send(); 
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
