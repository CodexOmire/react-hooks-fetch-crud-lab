import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((data) => {
        onAddQuestion(data);
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      });
  }

  const answerInputs = formData.answers.map((answer, index) => (
    <React.Fragment key={index}>
      <label htmlFor={`answer${index}`}>Answer {index + 1}:</label>
      <input
        type="text"
        name={`answer${index}`}
        id={`answer${index}`}
        value={answer}
        onChange={handleChange}
      />
    </React.Fragment>
  ));

  const answerOptions = formData.answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer || `Answer ${index + 1}`}
    </option>
  ));

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          name="prompt"
          id="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
        {answerInputs}
        <label htmlFor="formCorrectAnswer">Correct Answer (Form):</label>
        <select
          id="formCorrectAnswer"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {answerOptions}
        </select>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
