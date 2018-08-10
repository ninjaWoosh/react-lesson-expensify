import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routes/AppRouter";
import {Provider} from "react-redux";
import configStore from "./store/configStore";
import {addExpense} from "./actions/expenses";
import {setFilterText} from "./actions/filters";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configStore();

store.dispatch(addExpense({description: "Water bill", amount: 20, createdAt: 0}));
store.dispatch(addExpense({description: "Gas bill", amount: 35, createdAt: 2}));
store.dispatch(addExpense({description: "Internet bill", amount: 15, createdAt: 5}));
console.log(React.version);
const jsx = (
    <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
);
ReactDOM.render(jsx, document.getElementById("app"));