import React from 'react'

interface NavBarProps {
    cartItemcount: number
}
const NavBar = ({cartItemcount}: NavBarProps) => {
  return (
    <div>
      NavBar: {cartItemcount}
    </div>
  )
}

export default NavBar
