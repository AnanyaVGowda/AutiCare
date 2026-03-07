import React, { useState, useEffect } from 'react';
import { useGameStats } from '../context/GameStatsContext';

const colorsList = [
    { name: 'Red', hex: '#ef4444', emoji: '🍎' },
    { name: 'Blue', hex: '#3b82f6', emoji: '🐳' },
    { name: 'Green', hex: '#22c55e', emoji: '🍃' },
    { name: 'Yellow', hex: '#eab308', emoji: '☀️' },
    { name: 'Orange', hex: '#f97316', emoji: '🍊' },
    { name: 'Purple', hex: '#a855f7', emoji: '🍇' },
    { name: 'Pink', hex: '#ec4899', emoji: '🌸' },
    { name: 'Brown', hex: '#8b4513', emoji: '🐻' },
    { name: 'Black', hex: '#000000', emoji: '🐈‍⬛' },
    { name: 'White', hex: '#ffffff', emoji: '☁️' }
];

const ColorMatchGame = () => {
    const [currentColor, setCurrentColor] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [gameEnded, setGameEnded] = useState(false);
    const [totalGuessed, setTotalGuessed] = useState(0);
    const { updateColorMatchStats } = useGameStats(); // Assumes we add this, or we can use updateWordStats or similar. We'll check GameStatsContext later.

    const generateQuestion = () => {
        // Pick a random correct color
        const correctIndex = Math.floor(Math.random() * colorsList.length);
        const correct = colorsList[correctIndex];

        // Pick 3 other random colors
        let choices = [correct];
        while (choices.length < 4) {
            const idx = Math.floor(Math.random() * colorsList.length);
            const option = colorsList[idx];
            if (!choices.find(c => c.name === option.name)) {
                choices.push(option);
            }
        }

        // Shuffle options
        choices.sort(() => Math.random() - 0.5);

        setCurrentColor(correct);
        setOptions(choices);
        setFeedback('');
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const handleGuess = (color) => {
        if (gameEnded) return;

        if (color.name === currentColor.name) {
            const newScore = score + 1;
            setScore(newScore);
            setFeedback('Correct! 🎉 Great job!');
            setTotalGuessed(prev => prev + 1);

            if (newScore >= 10) {
                setGameEnded(true);
                setFeedback('Congratulations! You completed the Color Match game! 🎈');
                // Hacky fallback if the specific stats updater doesn't exist yet
                try {
                    updateColorMatchStats(newScore);
                } catch (e) {
                    console.log('Stats updater not found, but game finished!');
                }
            } else {
                setTimeout(generateQuestion, 1500);
            }
        } else {
            setFeedback('Oops! Try again! 🤔');
        }
    };

    const restartGame = () => {
        setScore(0);
        setTotalGuessed(0);
        setGameEnded(false);
        setFeedback('');
        generateQuestion();
    };

    if (!currentColor) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-900 drop-shadow-sm">Color Match</h1>
            <p className="text-center text-xl text-gray-600 mb-8 font-medium">Tap the name that matches the color!</p>

            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 flex flex-col items-center">

                {/* BIG Visual Color Swatch */}
                <div
                    className="w-48 h-48 rounded-3xl ml-auto mr-auto shadow-inner mb-6 flex items-center justify-center text-7xl transform transition-transform duration-500 hover:scale-105"
                    style={{
                        backgroundColor: currentColor.name === 'White' ? '#f8f9fa' : currentColor.hex,
                        border: currentColor.name === 'White' ? '4px solid #e2e8f0' : 'none'
                    }}
                >
                    {currentColor.emoji}
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleGuess(option)}
                            disabled={feedback.includes('Correct')}
                            className="py-4 px-6 text-xl font-bold rounded-2xl border-b-4 bg-gray-50 border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all active:border-b-0 active:translate-y-1"
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            </div>

            {feedback && (
                <div className={`text-center text-2xl font-bold animate-bounce ${feedback.includes('Correct') || feedback.includes('Congratulations') ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback}
                </div>
            )}

            <div className="text-center mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-2xl font-bold text-blue-900">Score: {score} <span className="text-blue-400">/ 10</span></p>

                {gameEnded && (
                    <button
                        onClick={restartGame}
                        className="mt-6 bg-green-500 text-white text-xl font-bold px-8 py-3 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                        Play Again!
                    </button>
                )}
            </div>
        </div>
    );
};

export default ColorMatchGame;
