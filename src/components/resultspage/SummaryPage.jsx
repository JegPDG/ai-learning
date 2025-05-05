import React, { useEffect } from 'react'
import './summary.css'
import { assets } from '../../assets/assets'

const SummaryPage = (props) => {
  const {text, handleSummarize, loading, summary} =props


  return (
    <>
      <div className="summary-main-cont">
        <div className="summary-button-comp">
          <p>Click the button to summarize your PDF file</p>
          <button 
              onClick={handleSummarize} 
              disabled={loading}>
                
              {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>
        {summary.length > 0 ? (
            <div className="summary-text-cont-1">
                <>
                  <div className="summary-text-2">
                    {summary}
                  </div>
                </>
            </div>
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
      </div>
    
    </>
  )
}

export default SummaryPage