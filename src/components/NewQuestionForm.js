import React, { useState } from "react";

function NewQuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex)
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion)
    })
      .then(r => r.json())
      .then(onAddQuestion);

    // reset form
    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0
    });
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Prompt:</label>
        <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />

        {formData.answers.map((answer, i) => (
          <div key={i}>
            <label>Answer {i + 1}:</label>
            <input type="text" name={`answer${i}`} value={answer} onChange={handleChange} />
          </div>
        ))}

        <label>Correct Answer:</label>
        <select name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
          {formData.answers.map((_, i) => (
            <option key={i} value={i}>Answer {i + 1}</option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default NewQuestionForm;
