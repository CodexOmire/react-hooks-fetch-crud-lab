import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

// Set up a global fetch mock
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            prompt: "What is the capital of Kenya?",
            answers: ["Nairobi", "Kampala", "Dodoma", "Addis Ababa"],
            correctIndex: 0,
          },
          {
            id: 2,
            prompt: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correctIndex: 1,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders App component without crashing", async () => {
  render(<App />);
  const prompt = await screen.findByText("What is the capital of Kenya?");
  expect(prompt).toBeInTheDocument();
});

test("loads and displays question prompts", async () => {
  render(<App />);
  const firstPrompt = await screen.findByText("What is the capital of Kenya?");
  const secondPrompt = await screen.findByText("What is 2 + 2?");
  expect(firstPrompt).toBeInTheDocument();
  expect(secondPrompt).toBeInTheDocument();
});

test("renders all answer options", async () => {
  render(<App />);
  await screen.findByText("What is the capital of Kenya?");
  expect(screen.getByText("Nairobi")).toBeInTheDocument();
  expect(screen.getByText("Kampala")).toBeInTheDocument();
  expect(screen.getByText("Dodoma")).toBeInTheDocument();
  expect(screen.getByText("Addis Ababa")).toBeInTheDocument();
});
