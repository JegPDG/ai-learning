import React from 'react'
import './summary.css'


const SummaryPage = (props) => {
  const {text, handleSummarize, loading, summary} =props
  const sumprompt ='Summarize the following text in a clear and concise manner, highlighting the most important points, key ideas, and essential details. Keep the language simple and easy to understand.'

  return (
    <>
      <div className="summary-main-cont">
        <div className="summary-button-comp">
          <p>Click the button to summarize your PDF file</p>
          <button onClick={handleSummarize} disabled={loading}>
              {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>
          {summary && (
            <div className="summary-text-cont-1">
                <>
                  <div className="summary-text-2">
                    {text}
                  </div>
                </>
            </div>
          ) }
      </div>
    
    </>
  )
}

export default SummaryPage