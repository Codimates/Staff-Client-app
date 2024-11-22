import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function AddInventory() {
  const {user, logout} = useContext(UserContext)
  return (
    <div>
      <h1>{user.fname}</h1>
      <button onClick={logout}>
        Logout</button>

        <div>
          
        </div>
      
    </div>
  )
}
