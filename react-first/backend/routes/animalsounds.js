const express = require('express');
const router = express.Router();

// Mock data for animal sounds game
const animalQuestions = [
    {
        id: 1,
        animal: 'Dog',
        image: '🐕',
        sound: 'Woof woof!',
        options: ['Cat', 'Dog', 'Cow', 'Horse'],
        answer: 'Dog'
    },
    {
        id: 2,
        animal: 'Cat',
        image: '🐈',
        sound: 'Meow!',
        options: ['Pig', 'Sheep', 'Cat', 'Duck'],
        answer: 'Cat'
    },
    {
        id: 3,
        animal: 'Cow',
        image: '🐄',
        sound: 'Moo!',
        options: ['Horse', 'Cow', 'Dog', 'Chicken'],
        answer: 'Cow'
    },
    {
        id: 4,
        animal: 'Lion',
        image: '🦁',
        sound: 'Roar!',
        options: ['Tiger', 'Bear', 'Lion', 'Elephant'],
        answer: 'Lion'
    },
    {
        id: 5,
        animal: 'Elephant',
        image: '🐘',
        sound: 'Pawoo!',
        options: ['Rhino', 'Hippo', 'Elephant', 'Giraffe'],
        answer: 'Elephant'
    }
];

// Get animal sound questions
router.get('/questions', (req, res) => {
    res.json(animalQuestions);
});

module.exports = router;
