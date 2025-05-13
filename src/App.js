import React, { useEffect, useState } from "react";
import Papa from "papaparse";

export default function LCAFlashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    Papa.parse("/LCA_Flashcard_Questions.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const formatted = results.data
          .filter(row => row.question && row.options && row.answer)
          .map(row => ({
            question: row.question,
            options: JSON.parse(row.options.replace(/'/g, '"')),
            answer: row.answer
          }));
        setFlashcards(formatted);
      }
    });
  }, []);

  if (!flashcards.length) return <p>Loading flashcards...</p>;

  const current = flashcards[index];

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <h1>LCA Flashcards</h1>

      <div
        onClick={() => setShowAnswer(!showAnswer)}
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
          <p><strong>Answer: {current.answer}</strong></p>
        ) : (
          <>
            <p>{current.question}</p>
            {current.options.map((opt, i) => <p key={i}>{opt}</p>)}
          </>
        )}
      </div>

      <button
        onClick={() => {
          setShowAnswer(false);
          setIndex((index + 1) % flashcards.length);
        }}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Next
      </button>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Card {index + 1} of {flashcards.length}
      </p>
    </div>
  );
}
