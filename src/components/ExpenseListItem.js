import React from "react";
import {Link} from "react-router-dom";

const ExpenseListItem = (props) => (
    <div>
        <Link to={`/update/${props.id}`}>
            <h3>{props.description}</h3>
        </Link>
        <p>Amount: {props.amount}</p>
        <p>Created: {props.createdAt}</p>
    </div>
);

export default ExpenseListItem;