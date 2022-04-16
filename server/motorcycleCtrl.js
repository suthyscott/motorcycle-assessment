let motorcycles = require('./motorcycles.json')
let globalId = motorcycles[motorcycles.length - 1].id + 1

module.exports = {
    getMotorcycles: (req, res) => {
        res.status(200).send(motorcycles)
    },
    addMotorcycle: (req, res) => {
        const {make, model, year, color} = req.body
        let newMotorcycle = {
            make, 
            model,
            year, 
            color,
            id: globalId
        }
        motorcycles.push(newMotorcycle)
        res.status(200).send(motorcycles)
        globalId++
    },
    updateMotorcycle: (req, res) => {
        const {id} = req.params
        const {make, model, year, color} = req.body
        let updatedMoto = {
            make, 
            model, 
            year, 
            color,
            id
        }
        let index = motorcycles.findIndex(moto => moto.id === +id)
        motorcycles.splice(index, 1, updatedMoto)

        res.status(200).send(motorcycles)
    },
    deleteMotorcycle: (req, res) => {
        const {id} = req.params
        let index = motorcycles.findIndex(moto => moto.id === +id)
        motorcycles.splice(index, 1)
        console.log('delete',motorcycles)

        res.status(200).send(motorcycles)
    }
}