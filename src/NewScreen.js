import React, { useState, useEffect } from 'react';
import './NewScreen.css';
import axios from 'axios';

function NewScreen() {
  console.log("NewScreen component mounted");

  const [question, setQuestion] = useState({
    q: "Loading question...",
    a: "",
    b: "",
    c: "",
    d: "",
  });

  // Function to fetch question
  const fetchQuestion = async () => {
    console.log("getting question...");
    try {
      const response = await axios.get('http://localhost:3001/api/question');
      setQuestion(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
      setQuestion({
        q: "Failed to load question.",
        a: "default A",
        b: "default B",
        c: "default C",
        d: "default D",
      });
    }
  };

  const fetchResponse = async (answer) => {
    console.log("getting answer...");
    try {
        const response = await axios.post(`http://localhost:3001/submit-answer?answer=${answer}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching answer:', error);
    }
    fetchQuestion();
};

  // Fetch question when component mounts
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div id="background-container">
      <img id="background-image" src="/background.png" alt="background" />
      <div className="text-box">
        <p>{question.q}</p>
      </div>
      <div className="Answer-A">
        <button type="button" onClick={() => fetchResponse("A")}>{question.a}</button>
      </div>
      <div className="Answer-B">
        <button type="button" onClick={() => fetchResponse("B")}>{question.b}</button>
      </div>
      <div className="Answer-C">
        <button type="button" onClick={() => fetchResponse("C")}>{question.c}</button>
      </div>
      <div className="Answer-D">
        <button type="button" onClick={() => fetchResponse("D")}>{question.d}</button>
      </div>
      <div className="Seeker">
        <img id="seeker-image" src="Socrates.png" alt="Seeker" />
      </div>
    </div>
  );
}

export default NewScreen;
