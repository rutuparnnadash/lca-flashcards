import React, { useEffect, useState } from "react";
import Papa from "papaparse";

// Map category keys to file paths
const csvSources = {
  lca: "/LCA_Flashcard_Questions.csv",
  food: "/food_sustainability_quiz_questions.csv",
  phone: "/phone_tablet_sustainability_questions.csv"
};

export default function LCAFlashcards() {
  const [flashcards, setFlashcards] = useState({});
  const [category, setCategory] = useState("lca");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const loadAllCSV = async () => {
      const newData = {};

      for (const key of Object.keys(csvSources)) {
        await new Promise((resolve) => {
          Papa.parse(csvSources[key], {
            download: true,
            header: true,
            complete: (results) => {
              const cleaned = results.data
                .filter(row => row.question && row.options && row.answer)
                .map(row => ({
                  question: row.question,
                  options: JSON.parse(row.options.replace(/'/g, '"')),
                  answer: row.answer
                }));
              newData[key] = cleaned;
              resolve();
            }
          });
        });
      }

      setFlashcards(newData);
    };

    loadAllCSV();
  }, []);

  const flashcardList = flashcards[category] || [];
  const current = flashcardList[index] || {};

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((index + 1) % flashcardList.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setIndex((index - 1 + flashcardList.length) % flashcardList.length);
  };

  const changeCategory = (cat) => {
    setCategory(cat);
    setIndex(0);
    setShowAnswer(false);
  };

  if (!flashcardList.length) return <p style={{ textAlign: "center" }}>Loading flashcards...</p>;

  return (
    <div style={{ backgroundColor: "#FFFBF0", minHeight: "100vh", padding: "2rem", color: "#407F46", textAlign: "center" }}>
      <h1 style={{ marginBottom: "1rem" }}>Flashcards</h1>

      <div style={{ marginBottom: "1rem" }}>
        {Object.keys(csvSources).map((cat) => (
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
        Card {index + 1} of {flashcardList.length} in "{category.toUpperCase()}"
      </p>
    </div>
  );
}
