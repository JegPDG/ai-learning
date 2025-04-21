import React, { useContext } from 'react'
import './homepage.css'



const HomePage = (props) => {
const {text, setText, extractText, pdfReceive, setPdfreceive} = props



  return (
    <div className="main-homepage-cont">
      <div className="intro-text">
        <p>HI! I AM YOUR AI STUDY BUDDY!</p>
      </div>
      <div className="pdf-input-cont">
        <p>Choose a PDF file to upload</p>
        <div className="input-container">
          <div>
            <input 
              type="file" 
              accept='pdf' 
              onChange= {extractText}
               />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage