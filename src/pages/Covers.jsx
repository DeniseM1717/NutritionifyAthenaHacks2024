import React from 'react';


const ImageArray = () => {
  // Array of image URLs
  const imageUrls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    // Add more image URLs here
  ];

  // Map over the image URLs array and create image elements
  const imageElements = imageUrls.map((imageName, index) => (
    <img key={index} src={'src/img/album_covers/${imageName}'} alt={'Image ${index + 1}: ${imageName}'} />
  ));

  return (
    <div className="container">
    <div className="col-12 col-md-6 col-lg-4 covers">
    {/* <img src="src/img/album_covers/1.jpg" alt="David"></img>
    <img src="src/img/album_covers/Apollo XXI.jpg" alt="Apollo XXI"></img>
    <img src="src/img/album_covers/JACKBOYS.jpg" alt="JACKBOYS"></img>
    <img src="src/img/album_covers/Shop Lifestyle - Trouva.jpg" alt="Shop Lifestyle - Trouva"></img>
    <img src="src/img/album_covers/summer walker album cover.jpg" alt="summer walker album cover"></img>
    <img src="src/img/album_covers/Tyler, the Creator - Flower Boy - Hip-Hop Vinyl LP (Columbia Records).jpg" alt="Tyler, the Creator - Flower Boy - Hip-Hop Vinyl LP (Columbia Records)"></img>
    <img src="src/img/album_covers/Tyler, The Creator Announces New Album, Drops Two Songs And A Music Video.jpg" alt="Tyler, The Creator Announces New Album, Drops Two Songs And A Music Video"></img>
    <img src="src/img/album_covers/Melophobia Poster.jpg" alt="Melophobia Poster"></img>
    <img src="src/img/album_covers/Lo Que Siento_ Cuco (single).jpg" alt="Lo Que Siento_ Cuco (single)"></img>
    <img src="src/img/album_covers/1.jpg" alt="David"></img>
    <img src="src/img/album_covers/1.jpg" alt="David"></img>
    <img src="src/img/album_covers/1.jpg" alt="David"></img>
    <img src="src/img/album_covers/1.jpg" alt="David"></img>
    <img src="src/img/album_covers/1.jpg" alt="David"></img> */}

    </div>
    </div>
  );
};
export default ImageArray;