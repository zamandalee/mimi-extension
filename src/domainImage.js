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
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <img
        className="mx-2"
        src={imageExists ? imgUrl : require("./missingImage.jpg")}
        alt=""
        style={{
          height: "100%"
        }}
      ></img>
      {props.domain}
    </div>
  );
}