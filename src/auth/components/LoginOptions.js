import React from "react";
import { useAuthState } from "../auth-context";

import LoginForm from "./LoginForm";

import MetaMask from "./MetaMask";
import Burner from "./Burner";

export default function LoginOptions() {
  const { isAuth } = useAuthState();

  return (
    <React.Fragment>
      {isAuth ? null : (
        <div className="login-options__wrapper">
          <LoginForm />
          <div>
            <MetaMask />
            <Burner />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
