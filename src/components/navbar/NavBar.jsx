import React from 'react'
import './navbar.css'

const NavBar = (props) => {
  const {setnavbarelm} = props

  return (
    <div className="main-nav-cont">
      <div className="circle"></div>
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
  )
}

export default NavBar