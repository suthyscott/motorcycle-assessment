const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const ctrl = require('./controller.js')
const motoCtrl = require("./motorcycleCtrl.js")

app.get("/api/compliment", ctrl.getCompliment);
app.get("/api/fortune", ctrl.getFortune);

app.get('/api/motorcycles', motoCtrl.getMotorcycles)
app.post('/api/motorcycle', motoCtrl.addMotorcycle)
app.put('/api/motorcycle/:id', motoCtrl.updateMotorcycle)
app.delete('/api/motorcycle/:id', motoCtrl.deleteMotorcycle)

app.listen(4000, () => console.log("Server running on 4000"));
