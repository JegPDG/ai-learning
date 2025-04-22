import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'

const NavBar = (props) => {
  const {setnavbarelm} = props

  return (
    <div className="main-nav-cont">
      <div className='max-width'>
        <div className="logo-text">
          <div className="circle">
            <img src={assets.logo} alt="" />
          </div>
          <div>CramPal</div>
        </div>
        <div className="links-cont">
          <p onClick={ () => 
            setnavbarelm(1)
          } 
          >Home</p>
          <p onClick={ () => 
            setnavbarelm(2)
          } 
          >Result</p>
        </div>
      </div>
    </div>
  )
}

export default NavBar