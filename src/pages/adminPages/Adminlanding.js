import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Adminlanding() {
  const {user, logout} = useContext(UserContext)
  return (
    <div>
      <h1>admin</h1>
      <button onClick={logout}>
        Logout
      </button>
      <h1>{user.fname}</h1>
    </div>
  );
}
