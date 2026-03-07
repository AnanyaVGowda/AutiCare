import React, { useState, useEffect } from 'react';
import { useGameStats } from '../context/GameStatsContext';

const wordLists = {
  easy: [
    { word: 'CAT', hint: 'A furry pet that meows' },
    { word: 'DOG', hint: 'A loyal furry friend' },
    { word: 'SUN', hint: 'It lights up our day' },
    { word: 'HAT', hint: 'You wear it on your head' },
    { word: 'BOOK', hint: 'You read stories in it' },
    { word: 'BIRD', hint: 'An animal that flies' },
    { word: 'TREE', hint: 'It has leaves and a trunk' },
    { word: 'FISH', hint: 'Swims in the water' },
    { word: 'STAR', hint: 'Twinkles in the night sky' },
    { word: 'MOON', hint: 'Shines at night' },
    { word: 'CAR', hint: 'Has four wheels and drives' },
    { word: 'SHOE', hint: 'You wear it on your foot' },
    { word: 'MILK', hint: 'White drink from a cow' },
    { word: 'BALL', hint: 'Round object you bounce' },
    { word: 'SNOW', hint: 'White and cold, falls from sky' },
    { word: 'BEAR', hint: 'Large furry animal' },
    { word: 'FROG', hint: 'Green animal that hops' },
    { word: 'PIG', hint: 'Pink animal that oinks' },
    { word: 'DUCK', hint: 'Bird that quacks' },
    { word: 'CUP', hint: 'You drink from it' }
  ],
  medium: [
    { word: 'APPLE', hint: 'A fruit that keeps the doctor away' },
    { word: 'HOUSE', hint: 'A place where people live' },
    { word: 'WATER', hint: 'You drink it every day' },
    { word: 'SMILE', hint: 'Shows you are happy' },
    { word: 'PLANT', hint: 'It grows in the garden' },
    { word: 'CHAIR', hint: 'Furniture you sit on' },
    { word: 'TABLE', hint: 'Furniture you eat on' },
    { word: 'PAPER', hint: 'You write or draw on it' },
    { word: 'PENCIL', hint: 'Tool for writing or drawing' },
    { word: 'SCHOOL', hint: 'Place where children learn' },
    { word: 'TRAIN', hint: 'Moves on tracks' },
    { word: 'PLANE', hint: 'Vehicle that flies in the sky' },
    { word: 'PHONE', hint: 'Used for talking to people far away' },
    { word: 'CLOCK', hint: 'Tells you the time' },
    { word: 'BREAD', hint: 'Baked food made from flour' },
    { word: 'MOUSE', hint: 'Small rodent or computer device' },
    { word: 'GRASS', hint: 'Green plants on the ground' },
    { word: 'SHIRT', hint: 'Clothing for your upper body' },
    { word: 'CLOUD', hint: 'White fluffy thing in the sky' },
    { word: 'TIGER', hint: 'Large wild cat with stripes' }
  ],
  hard: [
    { word: 'RAINBOW', hint: 'Colorful arc in the sky after rain' },
    { word: 'ELEPHANT', hint: 'Large gray animal with a trunk' },
    { word: 'COMPUTER', hint: 'Machine you use to play games' },
    { word: 'BUTTERFLY', hint: 'Beautiful insect with colorful wings' },
    { word: 'DINOSAUR', hint: 'Ancient reptile that lived long ago' },
    { word: 'UMBRELLA', hint: 'Keeps you dry when it rains' },
    { word: 'ASTRONAUT', hint: 'Person who travels to space' },
    { word: 'HOSPITAL', hint: 'Place where sick people get better' },
    { word: 'LIBRARY', hint: 'Place with many books to borrow' },
    { word: 'TEACHER', hint: 'Person who helps you learn' },
    { word: 'CHOCOLATE', hint: 'Sweet brown treat' },
    { word: 'ALLIGATOR', hint: 'Large reptile with many teeth' },
    { word: 'HELICOPTER', hint: 'Flying vehicle with blades on top' },
    { word: 'KANGAROO', hint: 'Jumping animal from Australia' },
    { word: 'MOUNTAIN', hint: 'Very tall landform' },
    { word: 'AIRPLANE', hint: 'Large vehicle that flies' },
    { word: 'VOLCANO', hint: 'Mountain that erupts lava' },
    { word: 'PENGUIN', hint: 'Black and white bird that swims' },
    { word: 'TELESCOPE', hint: 'Tool to look at stars' },
    { word: 'BACKPACK', hint: 'Bag you wear on your back' }
  ]
};

const WordScrambleGame = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [gameEnded, setGameEnded] = useState(false);
  const [wordsGuessed, setWordsGuessed] = useState(0);
  const { updateWordStats } = useGameStats();

  const scrambleWord = (word) => {
    const array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  };

  const generateNewWord = () => {
    const words = wordLists[difficulty];
    let selectedWord;

    // Pick a new random word, making sure it's not the exact same one as currentWord
    do {
      const randomIndex = Math.floor(Math.random() * words.length);
      selectedWord = words[randomIndex];
    } while (currentWord && selectedWord.word === currentWord.word && words.length > 1);

    let scrambled;

    // Ensure the scrambled word is different from the original
    do {
      scrambled = scrambleWord(selectedWord.word);
    } while (scrambled === selectedWord.word);

    setCurrentWord(selectedWord);
    setScrambledWord(scrambled);
    setUserGuess('');
    setFeedback('');
    setShowHint(false);
  };

  useEffect(() => {
    generateNewWord();
  }, [difficulty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameEnded) return;

    if (userGuess.toUpperCase() === currentWord.word) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback('Correct! 🎉');

      setWordsGuessed(prev => prev + 1);
      if (newScore >= 10) {
        setGameEnded(true);
        setFeedback('Congratulations! You\'ve completed the game! 🎉');
        updateWordStats(newScore);
      } else {
        setTimeout(generateNewWord, 1500);
      }
    } else {
      setFeedback('Try again! 🤔');
    }
  };

  const restartGame = () => {
    setScore(0);
    setWordsGuessed(0);
    setGameEnded(false);
    setFeedback('');
    generateNewWord();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">Word Scramble</h1>



      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-4xl text-center mb-6 font-mono">
          {scrambledWord}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="w-full px-4 py-2 text-2xl text-center border rounded-lg mb-4"
            placeholder="Type your answer"
            autoFocus
            maxLength={currentWord?.word.length}
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={gameEnded}
            >
              Check Answer
            </button>
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              disabled={showHint || gameEnded}
            >
              Show Hint
            </button>
          </div>
        </form>
      </div>

      {showHint && (
        <div className="text-center text-gray-600 italic mb-4">
          Hint: {currentWord.hint}
        </div>
      )}

      {feedback && (
        <div className={`text-center text-xl ${feedback.includes('Correct') || feedback.includes('Congratulations') ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-xl">Score: {score}</p>
        <p className="text-lg text-gray-600">Words Guessed: {wordsGuessed}</p>
        {!gameEnded ? (
          <button
            onClick={() => {
              setGameEnded(true);
              updateWordStats(score);
            }}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            End Game
          </button>
        ) : (
          <button
            onClick={restartGame}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default WordScrambleGame;