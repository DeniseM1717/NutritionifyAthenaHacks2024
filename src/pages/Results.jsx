import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

// import './pages/App.css'
// import ImageArray from './pages/Covers';

function Clicked() {
  console.log("hello");
}

function Results() {
  const [token, setToken] = useState();
  const [me, setMe] = useState();

  const [data, setData] = useState();
  const [items, setItems] = useState();
  // get access token from url and use it to get user info
  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    setToken(params.get('code'));
    //   setTitle(params.get('title'));
    //   //    setReady(true);
  }, []);

  // Several album array of imageObject
  [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ]

  useEffect(() => {
    if (!token) return;

    console.log("AYO THID THE DOTKNE", token)
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => res.json()).then(response => {
      setMe(response);
    })

    fetch("https://api.spotify.com/v1/me/top/tracks?offset=0&limit=10", {
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => res.json()).then(response => {
      setData(response);
      setItems(response);
    })

  }, [token]);


  return (
    <div>
      <p>params</p>
      {token} TOKENNNN
      console.log(userName);

      {/* {me && JSON.stringify(me)} */}
      {/* {data && JSON.stringify(data)} */}
      {items && JSON.stringify(items)}

      {/* images */}
      
      {items.map((image, index)=>(
        <img>
        key={index}
        src={image.url}
        alt={`Image ${index + 1}`}
        height={image.height}
        width={image.width}
        </img>
      ))}

    </div>
  );
}



export default Results;
