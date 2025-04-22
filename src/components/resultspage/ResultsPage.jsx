import React, { useState } from 'react'
import './resultspage.css'
import SummaryPage from './SummaryPage';
import FlashCard from './FlashCard';
import Quiz from './Quiz';
import { assets } from '../../assets/assets';

const ResultsPage = (props) => {
  const {text, handleSummarize, loading, summary, handleQuiz, quiz, flashItem, handleFlash} = props
  const [resultPages, setResultPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0)

  const flCardItem = [
    {
      id: 1,
      term: "Photosynthesis",
      definition: "The process by which green plants use sunlight to synthesize food from carbon dioxide and water."
    },
    {
      id: 2,
      term: "Mitochondria",
      definition: "Organelles known as the powerhouse of the cell, where energy production occurs."
    },
    {
      id: 3,
      term: "Ecosystem",
      definition: "A biological community of interacting organisms and their physical environment."
    },
    {
      id: 4,
      term: "Osmosis",
      definition: "The movement of water molecules through a semi-permeable membrane from a region of low solute to high solute concentration."
    },
    {
      id: 5,
      term: "Atom",
      definition: "The basic unit of a chemical element."
    }
  ]
  
  const quizitems = [
    {
      question: "What type of fish is known for its ability to inflate its body as a defense mechanism?",
      options: ["Goldfish", "Pufferfish", "Catfish", "Angelfish"],
      answer: "Pufferfish"
    },
    {
      question: "Which part of a fish helps it maintain balance and steer?",
      options: ["Gills", "Fins", "Scales", "Tail"],
      answer: "Fins"
    },
    {
      question: "What organ allows fish to extract oxygen from water?",
      options: ["Liver", "Heart", "Gills", "Bladder"],
      answer: "Gills"
    },
    {
      question: "Which fish is known for swimming upstream to spawn?",
      options: ["Salmon", "Tuna", "Swordfish", "Marlin"],
      answer: "Salmon"
    },
    {
      question: "What is the fastest fish in the ocean?",
      options: ["Swordfish", "Blue Marlin", "Sailfish", "Barracuda"],
      answer: "Sailfish"
    },
    {
      question: "Which fish has a flattened body and is known for burying itself in the sand?",
      options: ["Stingray", "Clownfish", "Grouper", "Trout"],
      answer: "Stingray"
    },
    {
      question: "What fish is known for having a light-producing lure on its head?",
      options: ["Anglerfish", "Eel", "Guppy", "Shark"],
      answer: "Anglerfish"
    },
    {
      question: "Which of the following is a freshwater fish?",
      options: ["Cod", "Trout", "Tuna", "Mackerel"],
      answer: "Trout"
    },
    {
      question: "Which fish is famous for its vibrant colors and is often found in coral reefs?",
      options: ["Clownfish", "Catfish", "Salmon", "Tilapia"],
      answer: "Clownfish"
    },
    {
      question: "What is the largest species of fish?",
      options: ["Great White Shark", "Whale Shark", "Manta Ray", "Orca"],
      answer: "Whale Shark"
    }
  ]
  

  return (
    <>
      <div className="results-page-nav">
        <div className="result-nav">
          <p onClick={ () => {
            setResultPage(1)
          }}>Summary</p>

          <p onClick={ () => {
            setResultPage(2)
          }}>Flash Cards</p>

          <p onClick={ () => {
            setResultPage(3)
          }}>Quiz</p>
        </div>
      </div>
      {resultPages === 1 && 
        <>
          <SummaryPage 
            text={text} 
            handleSummarize={handleSummarize} 
            loading={loading} 
            summary={summary}></SummaryPage>
        </>
      }
      {resultPages === 2 && 
        <>
          <div className="flash-functions">
            <p>Click the button to generate flashcards from your PDF file</p>
            <button onClick={handleFlash}>Generate Flashcards</button>
          </div>
           {flashItem.length > 0 ? (
            <>
              <div className='flash-one-card'>
                <FlashCard 
                  term = {flashItem[currentIndex]?.term} 
                  definition = {flashItem[currentIndex]?.definition}
                  currentIndex ={ currentIndex}
                  cardNo = {flCardItem.length}
                />
              </div>

              <div className='card-number'>
                <p>Card {currentIndex + 1} of {flashItem.length}</p>
              </div>
              
              <div className="buttons-container">
                <button 
                  onClick={()  => setCurrentIndex((prev) => Math.max(prev -1, 0))}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>

                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, flashItem.length - 1 ))
                  }
                  disabled={currentIndex === flashItem.length - 1}
                >
                  Next
                </button>
              </div>
            </>
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
           )
          }
          
          
            
        </>
      }
      {resultPages === 3 && 
      <>
        <div className="quiz-cont">
          <Quiz 
            quizItems ={quizitems} 
            handleQuiz={handleQuiz} 
            quiz={quiz}
            loading = {loading}
            />
        </div>
      </>
      }

      {/* <div className="pdf-preview">
            <textarea name="text" value={text} readOnly rows={10} cols={50} id=""></textarea>
            <div>
              <button onClick={handleSummarize} disabled={loading}>
              {loading ? 'Summarizing...' : 'Summarize'}
              </button>

              {summary && (
                <div className="mt-4 bg-gray-100 p-4 rounded shadow">
                  <p>{summary}</p>
                </div>
              )}
            </div>
        </div> */}
    </>
  )
}

export default ResultsPage