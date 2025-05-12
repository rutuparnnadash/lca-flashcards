
import React, { useState } from "react";

const flashcards = [
  {
    question: "What is the primary purpose of a Life Cycle Assessment (LCA)?",
    options: [
      "A. To measure economic feasibility",
      "B. To assess environmental impacts of a product or service",
      "C. To evaluate product aesthetics",
      "D. To analyze supply chain profitability"
    ],
    answer: "B"
  },
  {
    question: "Which ISO standard defines the principles and framework for LCA?",
    options: [
      "A. ISO 9001",
      "B. ISO 14001",
      "C. ISO 14040",
      "D. ISO 26000"
    ],
    answer: "C"
  }
];

export default function LCAFlashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <h1>LCA Flashcards</h1>
      <div
        onClick={toggleAnswer}
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "2rem",
          maxWidth: "600px",
          margin: "auto",
          cursor: "pointer"
        }}
      >
        {showAnswer ? (
          <p><strong>Correct Answer: {currentCard.answer}</strong></p>
        ) : (
          <>
            <p>{currentCard.question}</p>
            {currentCard.options.map((opt, idx) => (
              <p key={idx}>{opt}</p>
            ))}
          </>
        )}
      </div>
      <button onClick={nextCard} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Next
      </button>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Card {currentIndex + 1} of {flashcards.length}
      </p>
    </div>
  );
}
