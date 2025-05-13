import React, { useState } from "react";
import flashcardSets from "./flashcardsDataWithCategories";

const categories = Object.keys(flashcardSets);

export default function LCAFlashcards() {
  const [category, setCategory] = useState(categories[0]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = flashcardSets[category];
  const current = flashcards[index];

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((index + 1) % flashcards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setIndex((index - 1 + flashcards.length) % flashcards.length);
  };

  const changeCategory = (cat) => {
    setCategory(cat);
    setIndex(0);
    setShowAnswer(false);
  };

  return (
    <div style={{ backgroundColor: "#FFFBF0", minHeight: "100vh", padding: "2rem", color: "#407F46", textAlign: "center" }}>
      <h1 style={{ marginBottom: "1rem" }}>Flashcards</h1>

      <div style={{ marginBottom: "1rem" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            style={{
              margin: "0.25rem",
              padding: "0.5rem 1rem",
              background: cat === category ? "#407F46" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          border: "2px solid #407F46",
          borderRadius: "10px",
          padding: "2rem",
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          cursor: "pointer"
        }}
      >
        {showAnswer ? (
          <p><strong>Answer: {current.answer}</strong></p>
        ) : (
          <>
            <p>{current.question}</p>
            {current.options.map((opt, i) => <p key={i}>{opt}</p>)}
          </>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={prevCard} style={{ margin: "0 1rem", padding: "0.5rem 1rem" }}>Previous</button>
        <button onClick={nextCard} style={{ margin: "0 1rem", padding: "0.5rem 1rem" }}>Next</button>
      </div>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Card {index + 1} of {flashcards.length} in "{category}"
      </p>
    </div>
  );
}
