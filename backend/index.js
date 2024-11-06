import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'keszulekek' 
}).promise();

app.get('/phones', async (req, res) => {
    
    try {
        const temp = await db.query('SELECT * FROM phones');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.post('/phones', async (req, res) => {
    try {
        const value = req.body
        const query = `INSERT INTO phones (Id, Brand, Model, Price) VALUES ('${value.Id}', '${value.Brand}', '${value.Model}', ${value.Price})`
        
        await db.query(query, value, function(err, result) {
            if (err) {
                throw err
            }
            console.log(result)
        })
       res.status(201)
    } catch(error) {
        console.error(`Error posting phone ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.delete('/phones/:id', async (req, res) => {
    try {
        await db.query(`DELETE FROM phones WHERE 'Id' = ${req.params.id}`)
    } catch (err) {
        throw err
    }
})





app.listen(3000);
