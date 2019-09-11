import React, { useState } from "react";
import axios from "axios";

export default function ClaimAccount() {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const claimAccount = () => {
    axios
      .post(
        `https://api.consensys.space:8080/claimAccount`,
        JSON.stringify({
          email: "0x5C760Ba09C12E4fd33be49f1B05E6E1e648EB312"
        })
      )
      .then(result => {
        console.log(result);
        setShowMessage(true);
      })
      .catch(err => console.log(err));
  };

  // /verifyClaimAccount
  // takes in encryptedWallet, address, and secret needed to verify (is taken from the URL)
  return (
    <div className="claim-account__wrapper">
      <h1 className="claim-account__header">Claim Account</h1>
      <form className="email-form">
        <label className="email-form__label">EMAIL</label>
        <input
          className="email-form__input"
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        ></input>
        <span className="app__white-button--small" onClick={claimAccount}>
          Submit
        </span>
      </form>
      {showMessage ? (
        <p className="claim-account__message">
          Check your email for further instructions!
        </p>
      ) : null}
    </div>
  );
}
