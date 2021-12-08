import React, { useState } from "react";


export default function DomainImage(props) {
  const [imageExists, setImageExists] = useState(false);
  let imgUrl = "https://" + props.domain + "/favicon.ico";

  //tests if a favicon exists at the above url
  let image = document.createElement("img");
  image.src = imgUrl;
  image.onload = () => {
    setImageExists(true);
  };
  image.onerror = () => {
    setImageExists(false);
  };

  return (
    <img
      src={imageExists ? imgUrl : require("./missingImage.jpg")}
      alt={props.domain}
      style={{
        height: "25px"
      }} />
  );
}