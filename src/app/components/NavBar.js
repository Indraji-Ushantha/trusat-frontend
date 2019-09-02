import React, { useState, useEffect } from "react";
import { useAuthDispatch, useAuthState } from "../../auth/auth-context";
import { ethers } from "ethers";
import { withRouter } from "react-router-dom";
// import SignUpModal from "../../auth/components/SignUpModal";
import JoinButton from "../../auth/components/JoinButton";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  const [selected, setSelected] = useState(props.location.pathname);
  const { address } = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    // get jwt from local storage, utilized for all login options
    const retrieveJwt = () => {
      if (localStorage.getItem("trusat-jwt")) {
        const jwt = localStorage.getItem("trusat-jwt");
        dispatch({ type: "SET_JWT", payload: jwt });
        dispatch({ type: "AUTHENTICATED", payload: true });
      }
      // TODO - move this to its own function?
      if (localStorage.getItem("trusat-address")) {
        const address = localStorage.getItem("trusat-address");
        dispatch({ type: "SET_ADDRESS", payload: address });
      }
    };
    // get burner wallet from local storage, utilized for burner login only
    const retrieveWallet = () => {
      if (localStorage.getItem("trusat-private-key")) {
        const privateKey = localStorage.getItem("trusat-private-key");
        const wallet = new ethers.Wallet(privateKey);

        dispatch({ type: "SET_BURNER", payload: wallet });
        dispatch({
          type: "SET_ADDRESS",
          payload: wallet.signingKey.address
        });
        dispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
      }
    };
    retrieveJwt();
    retrieveWallet();
    // ToDO - create an app context to handle a shared 'app' state for things like loading state
    // setIsAppLoading(false);
  }, [dispatch]);

  return (
    <div className="nav-bar">
      <NavLink
        className="nav-bar__logo"
        onClick={() => setSelected("/")}
        to="/"
      >
        EARTH SPACE PROGRAM
      </NavLink>

      <NavLink
        onClick={() => setSelected("/")}
        className={
          selected === "/"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/"
      >
        WELCOME
      </NavLink>
      <NavLink
        onClick={() => setSelected(`/catalog/priorities`)}
        className={
          selected === "/catalog/priorities"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/catalog/priorities"
      >
        CATALOG
      </NavLink>
      <NavLink
        onClick={() => setSelected(`/profile/${address}`)}
        className={
          selected === `/profile/${address}`
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to={`/profile/${address}`}
      >
        MY PROFILE
      </NavLink>

      <NavLink
        onClick={() => setSelected("/about")}
        className={
          selected === "/about"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/about"
      >
        ABOUT
      </NavLink>
      <NavLink
        onClick={() => setSelected("/how")}
        className={
          selected === "/how"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/how"
      >
        HOW TO
      </NavLink>
      {/* <SignUpModal /> */}

      <NavLink onClick={() => setSelected("/join")} to="/login">
        <JoinButton />
      </NavLink>
    </div>
  );
}

export default withRouter(NavBar);
