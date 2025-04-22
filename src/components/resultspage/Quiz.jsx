import React, { useState } from 'react'
import './quiz.css'
import { assets } from '../../assets/assets'

const Quiz = (props) => {
const {quizItems, handleQuiz, quiz, loading} = props
const [userAnswer, setUserAnswers] = useState({})
const [submitted, setSubmitted] = useState(false)
const [score, setScore] = useState(null)


const handleChange = (questionIndex, value) => {
  setUserAnswers((prev) => ({
    ...prev,
    [questionIndex]: value,
  }));
};

const handleRetake = (e) => {
  e.preventDefault();
  setScore(null)
  setSubmitted(false)
  setUserAnswers({})

}

const handleSubmit = (e) => {
  e.preventDefault();

  let newScore = 0;
  quiz.forEach((question, index) => {
    if (userAnswer[index] === question.answer) {
      newScore += 1;
    }
  });

  setScore(newScore)
  setSubmitted(true)
}

const getResult = (index, correctAnswer) => {
  if (!submitted) return null;
  let verdict = ''
  if (userAnswer[index] === correctAnswer){
      verdict = 'Correct'
  } else {
      verdict = `Incorrect        Answer: ${correctAnswer}`
  }
  return verdict
}

  return (
    <>
      <div className='quiz-functions'>
          <p>Click the button to generate flashcards from your PDF file</p>
          <div>
            <button onClick={handleQuiz}>Generate Quiz</button>
          </div>
      </div>
      {quiz.length > 0 ? (
        <form onSubmit={handleSubmit} className="quiz-container">
          { quiz.map ((item, index) => 
            <fieldset key={index}>
              <legend>{index + 1 + '.'} {item.question}</legend>
                {item.options.map((option, optindex) => (
                  <label key={optindex} className=''>
                    <input 
                      type="radio" 
                      name={`q${index}`}
                      value='option'
                      onChange={() => handleChange(index, option)}
                      checked={userAnswer[index] === option}
                      />
                    {option}
                  </label>
                ))}

                <div
                  className={getResult(index, item.answer) === 'Correct' ? 'right-answer' : 'wrong-answer' }
                >{getResult(index, item.answer)}</div>
            </fieldset>
          )}
          <div className="button-cont">
            <button type='submit'>Submit</button>
            <button
              onClick={handleRetake}
            >Retake</button>
            <div className='score-cont'>{score} / {quiz.length}</div>
          </div>
        </form>

      ) : (
        <>
          <div className='empty-cont'>
            <div className={loading ? 'loader' : ''}>
            </div>

            <div className="empty-state">
              <img src={assets.logo} alt="" />
              <p>CramPal</p>
            </div>
          </div>
        </>
      )}
        
    </>
  )
}

export default Quiz