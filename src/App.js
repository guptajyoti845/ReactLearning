import * as ReactDOM from "react-dom";
import { StrictMode, useState } from "react";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("pink");

  return (
    <StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

ReactDOM.render(<App />,
  document.getElementById("root"));
