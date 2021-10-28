import React, { useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom";
import RenderList from "./components/RenderList";
import IssueCard from "./components/IssueCard";
// const axios = require("axios");

function AuthenticatedApp({ currentUser, setCurrentUser }) {
  const [punchCards, setPunchCards] = useState(null);
  const [toggleIssuingForm, setToggleIssuingForm] = useState(false);
  const [toggleCustomerList, setToggleCustomerList] = useState(false);
  const history = useHistory();

  // async function getUser() {
  //   setToggleCustomerList(!toggleCustomerList);
  //   if (toggleCustomerList) {
  //     try {
  //       const response = await axios.get(`/coffee_shops/${currentUser.id}`, {
  //         withCredentials: true,
  //       });
  //       setPunchCards(response.data.punch_cards);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  const getUser = () => {
    if (toggleCustomerList) {
      fetch("/coffee_shops/${currentUser.id}", {
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          res.json().then((response) => {
            setPunchCards(response.data.punch_cards);
          });
        } else {
          console.log("not cutting it");
        }
      });
    }
  };

  const logOut = () => {
    fetch("/logout", { method: "DELETE" }).then(() => {
      setCurrentUser(null);
      history.push("/");
    });
  };

  const displayIssuingForm = () => {
    setToggleIssuingForm(!toggleIssuingForm);
  };
  return (
    <div>
      <nav>
        <span>
          <h3>
            <Link to="/">ePUNCH</Link>
          </h3>
        </span>
        <span>
          <p>You are signed in as {currentUser.name}</p>
          <button onClick={logOut}>Logout</button>
          <button onClick={getUser}>Show list of clients</button>
          <button onClick>Your profile</button>
          <button onClick={displayIssuingForm}>Issue a card</button>
        </span>
      </nav>
      <div className="App">
        <Switch>
          <Route path="/customers">
            <p>hola {currentUser.name}</p>
            {punchCards && toggleCustomerList ? (
              <RenderList list={punchCards} />
            ) : (
              <div></div>
            )}
            {toggleIssuingForm ? (
              <IssueCard
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            ) : (
              <div></div>
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default AuthenticatedApp;
