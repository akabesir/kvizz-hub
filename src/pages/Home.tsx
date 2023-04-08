import React, { useEffect } from 'react'
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate()
  return (
    <div>
      Home
      <button onClick={()=>{
            signOut(auth)
            .then(() => {
              console.log("sign out successful");
              navigate('/login')
            })
            .catch((error) => console.log(error));
            
      }} >Sign out!!</button>
    </div>
  )
}

export default Home
