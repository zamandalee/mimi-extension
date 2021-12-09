import React from "react";
import Collapsible from 'react-collapsible';

export default function FaqContent(props) {
  return (
    <div className="content">
      <Collapsible trigger="How do I use MiMi?" open={true}>
        <ol>
          <li>Click into a password input field</li>
          <li>Fill in your MiMi master password</li>
          <li>Hit command+shift+p to transform your master password</li>
        </ol>
      </Collapsible>
      <Collapsible trigger="Is MiMi secure?"></Collapsible>
    </div>
  )
}