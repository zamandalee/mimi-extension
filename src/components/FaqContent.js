import React from "react";
import Collapsible from 'react-collapsible';

export default function FaqContent(props) {
  return (
    <div className="content">
      <Collapsible trigger="How do I use MiMi?" open={true}>
        <ol className="ml-neg20">
          <li>๐ฑ Click into a password input field</li>
          <li>๐ Fill in your MiMi master password</li>
          <li>๐ Hit command+shift+p to transform your master password</li>
        </ol>
      </Collapsible>
      <Collapsible trigger="Is MiMi secure?" open={true}>
        <div>We tried๐ฅต</div>
      </Collapsible>
    </div>
  )
}