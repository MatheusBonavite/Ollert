import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StrictMode } from "react";
import MNavbar from "./materialize_comps/nav/Navbar";
//import MCard from "./materialize_comps/card/MCard";
import ListAdder from "./func_comps/list_adder/ListAdder";

//<MCard title="Update Page CSS" description="The current CSS for the page is very confusing! Should be updated!" priority="Normal"/>
const App = () => {
    return (
        <>
            <div className="rootReact">
                <Router>
                    <MNavbar />
                    <Switch>
                        <Route path="">
                            <ListAdder />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </>
    );
};

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);
