import React, { useState } from 'react'
import './flashcard.css'


const FlashCard = (props) => {
  const {term, definition, currentIndex, cardNo} = props
  const [flip, setFlip] = useState(true)


  return (
   <>
   <div className="card-container">
      <div 
      className={`card ${flip ? "flipped" : ""}`}
      onClick={() => {setFlip(!flip)}}
      >
        <div className="card-side card-front">
          <p>
            {term}
          </p>
        </div>
        <div className="card-side card-back">
          <p>
            {definition}
          </p>
        </div>
      </div>
   </div>
   </> 
  )
}

export default FlashCard