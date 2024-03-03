import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

// import './pages/App.css'
// import ImageArray from './pages/Covers';

function Clicked() {
  console.log("hello");
}

function images(items){
  return [items.images, items.name].join(" ");
}

// function timeConversion({track.duration_ms}){
//   minutes = Math.floor(({track.duration_ms}/60000)),
//   seconds = Math.floor(({track.duration_ms}/1000) % 60);
// }

function Results() {
  const [token, setToken] = useState();
  const [me, setMe] = useState();

  const [data, setData] = useState();
  // const [items, setItems] = useState();
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
      setData(response.items);
      // setItems(response.items);
    })

  }, [token]);


  return (
    <div>
      <p>testing</p>
      {/* {token} TOKENNNN */}
      console.log(userName);

      {/* {me && JSON.stringify(me)}
      {data && JSON.stringify(data)} */}
      {/* {data.items && JSON.stringify(data.items)} */}
      {/* {items && JSON.stringify(items)} */}

      {/* {me && <p>User ID: {me.id}</p>} */}
      
      {data && data.map((track, index) => (
        <div key={index}>
          <p>Album: {track.album.name}</p>

          <p>Title: {track.name}</p>
          <p>Artist: {track.artists[0].name}</p>
          
          {(() => {
          const minutes = Math.floor(track.duration_ms / 60000);
          const seconds = Math.floor((track.duration_ms / 1000) % 60);
          return (
            <p>Duration: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
          );
          })()}

          <img src={track.album.images[0].url} alt="Track Album" />
          
    </div>))}
    </div>
  );
}



export default Results;
