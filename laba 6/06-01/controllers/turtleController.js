const express = require('express');
const TurtleService = require('../services/turtleService');

const router = express.Router();

module.exports = function(db) {
    const turtleService = new TurtleService(db); 

    router.get('/turtles/:id', async (req, res) => {
        const { id } = req.params;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try {
            const turtle = await turtleService.getTurtleById(id);
            if (!turtle) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json(turtle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get('/turtles', async (req, res) => {
        const { favoritePizza } = req.query;
        if (!favoritePizza) {
            const turtles = await turtleService.getAllTurtles();
            res.json(turtles);
            return;
        }

        try {
            const turtles = await turtleService.getTurtlesByFavoritePizza(favoritePizza);
            res.json(turtles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/turtles', async (req, res) => {
        const turtleData = req.body;
        if (turtleData.name && turtleData.color) {
            const newTurtleId = await turtleService.createTurtle(turtleData);
            res.json({ id: newTurtleId, message: 'Turtle created successfully' });
            return;
        }
        try {
            res.json({ message: 'Some values is null' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.put('/turtles/:id', async (req, res) => {
        const { id } = req.params;
        const turtleData = req.body;
        if (turtleData.name && turtleData.color) {
            const updatedRows = await turtleService.updateTurtle(id, turtleData);
            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Turtle updated successfully' });
            return;
        }
        try {
            res.json({ message: 'Some values is null' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.put('/turtles/favoritePizzaBind/:id', async (req, res) => {
        const { id } = req.params;
        const { pizzaId } = req.body;

        try {
            const updatedRows = await turtleService.bindFavoritePizza(id, pizzaId);
            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Favorite pizza bound successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.put('/turtles/secondFavoritePizzaBind/:id', async (req, res) => {
        const { id } = req.params;
        const { pizzaId } = req.body;

        try {
            const updatedRows = await turtleService.bindSecondFavoritePizza(id, pizzaId);
            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Second favorite pizza bound successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.put('/turtles/weaponBind/:id', async (req, res) => {
        const { id } = req.params;
        const { weaponId } = req.body;

        try {
            const updatedRows = await turtleService.bindWeapon(id, weaponId);
            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Weapon bound successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete('/turtles/favoritePizzaUnbind/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const updatedRows = await turtleService.unbindFavoritePizza(id);
            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Favorite pizza unbound successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete('/turtles/secondFavoritePizzaUnbind/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const updatedRows = await turtleService.unbindSecondFavoritePizza(id);
            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Second favorite pizza unbound successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete('/turtles/weaponUnbind/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const updatedRows = await turtleService.unbindWeapon(id);
            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Weapon unbound successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete('/turtles/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const deletedRows = await turtleService.deleteTurtle(id);
            if (deletedRows === 0) {
                return res.status(404).json({ error: 'Turtle not found' });
            }
            res.json({ message: 'Turtle deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}