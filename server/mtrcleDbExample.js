const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    getMotorcycles: (req, res) => {
        sequelize.query(`
        SELECT * FROM motorcycles;
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },
    addMotorcycle: (req, res) => {
        const {make, model, year, color} = req.body
        sequelize.query(`
            INSERT INTO motorcycles (m_make, m_model, m_year, m_color)
            VALUES ('${make}', '${model}', ${year}, '${color}')
            RETURNING *;

        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => {
            res.status(500).send(err)
        })

    },
    updateMotorcycle: (req, res) => {
        const {id} = req.params
        const {make, model, year, color} = req.body
        
        sequelize.query(`
            UPDATE motorcycles
            SET m_make = '${make}',
            m_model = '${model}',
            m_year = '${year}',
            m_color = '${color}'
            WHERE motorcyce_id = '${id}'
            RETURNING *;
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },
    deleteMotorcycle: async (req, res) => {
        const {id} = req.params
        
        await sequelize.query(`
            DELETE FROM motorcycles
            WHERE motorcyce_id = '${id}'
            RETURNING *;
        `)
       
        sequelize.query(`
        SELECT * FROM motorcycles;
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
}