const express = require('express');
const PizzaService = require('../services/pizzaService');
const sqlite3 = require('sqlite3');

const router = express.Router();

module.exports = function(db) {
    const pizzaService = new PizzaService(db); 

    router.get('/pizzas/:id', async (req, res) => {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try {
            const pizza = await pizzaService.getPizzaById(id);
            if (!pizza) {
                return res.status(404).json({ error: 'Pizza not found' });
            }
            res.json(pizza);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get('/pizzas', async (req, res) => {
        const { calories, m } = req.query;
        if (!calories) {
            const pizzas = await pizzaService.getAllPizzas();
            res.json(pizzas);
            return;
        }

        try {
            const pizzas = await pizzaService.getPizzasByCalories(calories, m);
            res.json(pizzas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/pizzas', async (req, res) => {
        const pizzaData = req.body;
        if (pizzaData.calories && pizzaData.name) {
            if (pizzaData.calories <= 2000) {
                const newPizzaId = await pizzaService.createPizza(pizzaData);
                res.json({ id: newPizzaId, message: 'Pizza created successfully' });
                return;
            }
            else {
                res.json({ message: 'Calories most then 2000' });
                return;
            }
        }
        try {
            res.json({ message: 'Some values is null' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.put('/pizzas/:id', async (req, res) => {
        const { id } = req.params;
        const pizzaData = req.body;
        if (pizzaData.calories && pizzaData.name) {
            if (pizzaData.calories <= 2000) {
                const updatedRows = await pizzaService.updatePizza(id, pizzaData);
                if (updatedRows === 0) {
                    return res.status(404).json({ error: 'Pizza not found' });
                }
                res.json({ message: 'Pizza updated successfully' });
                return
            }
            else {
                res.json({ message: 'Calories most then 2000' });
                return;
            }
        }
        try {
            res.json({ message: 'Some values is null' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete('/pizzas/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const deletedRows = await pizzaService.deletePizza(id);
            if (deletedRows === 0) {
                return res.status(404).json({ error: 'Pizza not found' });
            }
            res.json({ message: 'Pizza deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}