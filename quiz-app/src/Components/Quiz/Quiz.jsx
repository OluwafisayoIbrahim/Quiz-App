// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lockAnswer, setLockAnswer] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [comment, setComment] = useState("");
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lockAnswer === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLockAnswer(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLockAnswer(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setComment(question.comment);
    }
  };

  let next_question = () => {
    if (lockAnswer === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLockAnswer(false);
      setComment("");
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLockAnswer(false);
    setResult(false);
    setComment("");
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
            <div>
              <p className="comment">{comment && `"${comment}"`}</p>
            </div>
          <button onClick={next_question}>Next Question</button>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
