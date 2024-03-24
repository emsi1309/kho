const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
const Item = require('./Item');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Sử dụng middleware cors

// API endpoint để lấy danh sách hàng hóa
app.get('/api/items', (req, res) => {
    Item.getAllItems((err, items) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(items);
        }
    });
});

// API endpoint để thêm hàng hóa mới
app.post('/api/items', (req, res) => {
    const newItemData = req.body;
    Item.createItem(newItemData, (err, itemId) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).json({ id: itemId, ...newItemData });
        }
    });
});

// API endpoint để cập nhật thông tin của hàng hóa
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItemData = req.body;
    Item.updateItem(itemId, updatedItemData, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).end();
        }
    });
});

// API endpoint để xóa một hàng hóa
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    Item.deleteItem(itemId, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).end();
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
