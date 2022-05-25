import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home, {AddToBlogButton, WebsiteHeader} from "./components/HomePage";
import {BlogPage} from "./components/BlogPage";

const App = () => {
  return (
      <Router>
          <div>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/Blog">
                      <BlogPage />
                  </Route>
                  <Route path="/AddCity">
                      <div>
                          {/*<WebsiteHeader>*/}
                          {/*    {"כיפת השמיים"}*/}
                          {/*</WebsiteHeader>*/}
                          <div>{"בעבודה"}</div>
                      </div>
                  </Route>
                  <Route path="/">
                      <Home />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
