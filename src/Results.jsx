import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageArray from './Covers';

function Clicked(){
  console.log("hello");
}

function App(){
    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [ready, setReady] = useState('');
}
// get access token from url and use it to get user info
useEffect(( ) => { 
    // Initialize Spotify client (user)

    const sp = new spotify.Spotify();

    // Fetch user info
    const fetchUserInfo = async()=> {
        try {
            const userInfo = await sp.getMe();
            // other user info elements
        } catch (error){
            console.error('Error fetching user information: ', error);
        }
    };
    fetchUserInfo();
    
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
       setName(params.get('name'));
       setTitle(params.get('title'));
    //    setReady(true);
     }, [ ]);


  return (
    <>
      <div>
        <p>params</p>
        <p>Hello user: {userName}</p>

      </div>

        
    </>
  );


export default App
