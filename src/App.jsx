import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import "./App.css"
import Hero from "./Hero"
import Quiz from "./Quiz"
import LoadingSpinner from "./LoadingSpinner"

function App() {
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [check, setCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [start, setIsStart] = useState(false)
  const [quizData, setQuizData] = useState([])

  //Getting Data
  useEffect(() => {
    async function getQuiz() {
      setIsLoading(true)
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&encode=base64"
      )
      const data = await res.json()
      const quiz = []
      data.results.forEach((item) => {
        quiz.push({
          id: nanoid(),
          question: item.question,
          correct: item.correct_answer,
          answers: shuffleArray([
            ...item.incorrect_answers,
            item.correct_answer,
          ]),
          selected: "",
          answered: false,
        })
      })
      setQuizData(quiz)
      setIsLoading(false)
    }
    getQuiz()
  }, [count])

  //Starting quiz button
  function startQuiz() {
    setIsStart((prev) => !prev)
  }

  // shuffling Array
  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5)
  }

  //Checking answer
  function handleClick(id, answer) {
    setQuizData((quiz) =>
      quiz.map((item) => {
        return item.id === id
          ? {
              ...item,
              selected: answer,
            }
          : item
      })
    )
  }

  //handleCheck button
  function handleCheck() {
    const allSelected = quizData.every((quiz) => quiz.selected)
    if (allSelected) {
      setQuizData((quiz) =>
        quiz.map((quiz) => {
          return {
            ...quiz,
            answered: true,
          }
        })
      )
      // Checking score
      quizData.forEach((quiz) => {
        if (quiz.selected === quiz.correct) {
          setScore((score) => score + 1)
        }
      })
      setCheck(true)
    }
  }

  function handleReset() {
    if (check) {
      setScore(0)
      setCount((count) => count + 1)
      setCheck(false)
    }
  }

  const quizElements = quizData
    ? quizData.map((data) => {
        return (
          <Quiz
            key={data.id}
            id={data.id}
            quiz={data}
            question={data.question}
            answers={data.answers}
            selected={data.selected}
            handleClick={handleClick}
          />
        )
      })
    : []

  return (
    <div className="App">
      <Hero display={start} clickBtn={startQuiz} />
      {start && quizElements}
      {check && (
        <span className="score">You scored {score}/5 correct answers </span>
      )}
      {start && (
        <button
          onClick={check ? handleReset : handleCheck}
          disabled={isLoading}
          className="checkBtn"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : check ? (
            "play again"
          ) : (
            "check Answers"
          )}
        </button>
      )}
    </div>
  )
}

export default App
