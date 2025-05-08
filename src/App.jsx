import { createContext, useContext, useEffect, useState } from 'react'
import HomePage from './components/homepage/HomePage'
import NavBar from './components/navbar/NavBar'
import './app.css';
import { assets } from './assets/assets';
import {pdfjs, Document, Page} from 'react-pdf';
import pdfToText from 'react-pdftotext'
import { getResult } from './aimlapi';
import ResultsPage from './components/resultspage/ResultsPage';


function App() {
  const [navbarelm, setnavbarelm] = useState(1)
  const [text, setText] = useState('')
  const [pdfReceive, setPdfreceive] = useState(false)

  const [summary, setSummary] = useState('')
  const [quiz, setQuiz] = useState([])
  const [flashItem, setFlashItem] = useState([])


  const [loading, setLaoding] = useState(false)


  // AI prompts
  const sumprompt ='Summarize the following text in a clear and concise manner only 3 paragraphs, highlighting the most important points, key ideas, and essential details. Keep the language simple and easy to understand. Enclose each paragraph double asterisk for splitting'

  const quizprompt = "Create a 10-question multiple choice quiz based on the following text. Each question should include four answer options and the correct answer. Return the quiz in JSON format with this structure:\n\n[\n  {\n    \"question\": \"What is the capital of France?\",\n    \"options\": [\"Berlin\", \"London\", \"Paris\", \"Madrid\"],\n    \"answer\": \"Paris\"\n  }\n]\n\nHere is the text:\n\n[Insert your text here]"

  const flCardPrompt = "Create a 10 item flashcard based on the given text. Return flashcard JSON format in this structure: \n\n[\n{\n \"term\": \"Example Term 1\",\n    \"definition\": \"Concise definition of term 1.\"\n  },\n  {\n    \"term\": \"Example Term 2\",\n    \"definition\": \"Concise definition of term 2.\"\n  }\n]\n\nHere is the text:\n\n[Insert your text here]"
  
  const apiKey = import.meta.env.VITE_API_KEY;

  // Extracting PDF tp text
  useEffect(() => {
    const savedText = localStorage.getItem('text')
    if (savedText){
      setText(savedText)
    }
  }, [text])

  const extractText = (event) => {

    const file = event.target.files[0];

    if(file.type !== 'application/pdf'){
      alert('Please choose a PDF file')
      return
    }

    console.log(file.type)

    localStorage.removeItem('text')
    pdfToText(file)
      .then((extractText) => {
        setText(extractText);
        localStorage.setItem('text',JSON.stringify(extractText))
      })
      .catch((error) => console.error('Failed to extract PDF', error));

      setPdfreceive(true)

      setTimeout(() => {
          setPdfreceive(false)
          console.log('just removed bukli')
          setnavbarelm(2)
      }, 2000);

      localStorage.removeItem('summary')
      localStorage.removeItem('quiz')
      localStorage.removeItem('flashcard')

  }

  // Function for Handdling API request

  //Summary handling
  useEffect(() => {
    const savedSummary = localStorage.getItem('summary')
    if (savedSummary) {
      setSummary(savedSummary)
    }
  }, [])

  const handleSummarize = async () => {
      localStorage.removeItem('summary')
      setSummary('')

      setLaoding(true)
      const result = await getResult(text, sumprompt)
      setSummary(result)
      localStorage.setItem('summary', result)
      setLaoding(false)
  }


// Quiz Handling
  useEffect(() => {
    const savedQuiz = JSON.parse(localStorage.getItem('quiz'))
    if (savedQuiz){
      setQuiz(savedQuiz)
    }
  }, [])


  const handleQuiz = async () => {

    localStorage.removeItem('quiz')
    setQuiz('')

    setLaoding(true)
    const result = await getResult(text, quizprompt)
    
    let parsedData;
    try {
      parsedData = JSON.parse(result)
      console.log(typeof(parsedData))
    } catch (error){
      console.error("Failed to parse JSON", error)
    }
    setQuiz(parsedData)
    localStorage.setItem('quiz', JSON.stringify(parsedData))
    setLaoding(false)
}

// Flash Card Handling
useEffect(() => {
  const savedFlash = JSON.parse(localStorage.getItem('flashcard'))
  if (savedFlash){
    setFlashItem(savedFlash)
  }
}, [])


const handleFlash = async () => {
  localStorage.removeItem('flashcard')
  setFlashItem('')

  const result = await getResult(text, flCardPrompt)

  let parsedData;
  try {
    parsedData = JSON.parse(result)
    console.log(typeof(parsedData))
  } catch (error){
    console.error("Failed to parse JSON", error)
  }
  setFlashItem(parsedData)
  localStorage.setItem('flashcard', JSON.stringify(parsedData))
  setLaoding(false)
}

  return (
    <>
      <div className="pop-ups-cont">
      { pdfReceive && 
        <div className="pop-up">
          <div className="pop-up-message">
            <img src={assets.check} alt="" />
            <p>           
              PDF RECEIVED
            </p>
          </div>        
        </div>
      }

        <div className={pdfReceive ? 'not-pop-up' : ' '}>
          <NavBar 
            setnavbarelm={setnavbarelm} 
            navbarelm={navbarelm}/>

          {navbarelm === 1 && 
            <HomePage 
              text={text} 
              setText={setText} 
              extractText={extractText} 
              pdfReceive={pdfReceive} 
              setPdfreceive ={setPdfreceive}
              />
          }

          {navbarelm === 2 && 
            <> 
              <ResultsPage 
                text={text} 
                handleSummarize={handleSummarize} 
                handleQuiz={handleQuiz} 
                handleFlash={handleFlash} 
                summary={summary} 
                loading={loading} 
                quiz={quiz} 
                flashItem={flashItem} />
            </>
          }
        </div>
    
      </div>
    </>
  )
}

export default App
