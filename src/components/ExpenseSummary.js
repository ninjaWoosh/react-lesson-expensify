import React from 'react';
import selectExpenseTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";
import { connect } from "react-redux";
import numeral from "numeral";

export const ExpenseSummary = ({count, total}) => (
    <div>
        <p>Viewing {count} expenses totalling {total}</p>
    </div>
);


const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters);
    const count = expenses.length;
    const total = numeral(selectExpenseTotal(expenses) / 100).format("$0,0.00");

    return {
        count,
        total
    };
};

export default connect(mapStateToProps)(ExpenseSummary);