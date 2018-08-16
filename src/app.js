import React from "react";
import ReactDOM from "react-dom";
import AppRouter, {history} from "./routes/AppRouter";
import {Provider} from "react-redux";
import configStore from "./store/configStore";
import {login, logout} from "./actions/auth";
import {startSetExpenses} from "./actions/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import {firebase} from "./firebase/firebase";

const store = configStore();

const jsx = (
    <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
);

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if(user){

        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            
            if(history.location.pathname == "/"){
                history.push("/dashboard");
            }
        });
    }else{
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});