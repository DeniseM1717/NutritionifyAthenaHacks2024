import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import './nutrition_table.css'; // Import the CSS file

function Clicked() {
  console.log("hello");
}

function images(items){
  return [items.images, items.name].join(" ");
}


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

const NutritionFacts = () => {
  return (
    <div id="nutritionTable">
    <section className="performance-facts">
      <header className="performance-facts__header">
        <h1 className="performance-facts__title">Nutrition Facts</h1>
        <p>Serving of <strong>{me?.display_name}</strong></p>
        <p>Serving country <strong>{me?.country}</strong></p>
      </header>
      <table className="performance-facts__table">
        <thead>
          <tr>
            <th colSpan="3" className="small-info">
              <b>Amount Per Serving</b>
            </th>
          </tr>
        </thead>
        <tbody>
        {data && data.map((track, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              
              <td>{track.album.name} - {track.name} </td>
              <td>
                {(() => {
                  const minutes = Math.floor(track.duration_ms / 60000);
                  const seconds = Math.floor((track.duration_ms / 1000) % 60);
                  return (
                    <span className="trackDuration">{minutes}:{seconds < 10 ? '0' : ''}{seconds}</span>
                  );
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="performance-facts__table--grid">
        <tbody>
        
        </tbody>
        
      </table>
      
      <p className="small-info">* Daily Music Values are based on personal preference. Your daily values may be higher or lower depending on your music needs.</p>
    </section></div>
  );
}

  return (
    <div>



          <img className="album-cover" src={data?.[0].album.images[0].url} alt="Track Album" />
          {/* Display the NutritionFacts component */}
          <NutritionFacts username="Your Username" country="Your Country" />
          
    </div>
  );
}



export default Results;
