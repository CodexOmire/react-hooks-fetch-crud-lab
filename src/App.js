import React, { useEffect, useState } from "react";
import QuestionList from "./components/QuestionList";
import NewQuestionForm from "./components/NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(
      (q) => q.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestions);
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <section>
        <h1>Quiz Questions</h1>
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      </section>
      <section>
        <h2>New Question</h2>
        <NewQuestionForm onAddQuestion={handleAddQuestion} />
      </section>
    </main>
  );
}

export default App;
