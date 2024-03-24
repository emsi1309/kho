// Item.js

const db = require('./DbConnect');

class Item {
    constructor(id, name, price, total) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.total = total;
    }
}

// Hàm để lấy danh sách các Item từ cơ sở dữ liệu
Item.getAllItems = function(callback) {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const items = results.map(row => new Item(row.id, row.name, row.price, row.total));
        callback(null, items);
    });
};

// Hàm để thêm một Item mới vào cơ sở dữ liệu
Item.createItem = function(newItemData, callback) {
    const { name, price, total } = newItemData;
    const sql = 'INSERT INTO items (name, price, total) VALUES (?, ?, ?)';
    db.query(sql, [name, price, total], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result.insertId);
    });
};

// Hàm để cập nhật thông tin của một Item trong cơ sở dữ liệu
Item.updateItem = function(itemId, updatedItemData, callback) {
    const { name, price, total } = updatedItemData;
    const sql = 'UPDATE items SET name = ?, price = ?, total = ? WHERE id = ?';
    db.query(sql, [name, price, total, itemId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

// Hàm để xóa một Item từ cơ sở dữ liệu
Item.deleteItem = function(itemId, callback) {
    const sql = 'DELETE FROM items WHERE id = ?';
    db.query(sql, itemId, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

module.exports = Item;