import React from "react";
import {ExpenseSummary} from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenses";
import numeral from "numeral";
import selectExpenseTotal from "../../selectors/expenses-total";
import {shallow} from "enzyme";

test("Should render summary multiple expenses", () => {
    const count = expenses.length;
    const total = numeral(selectExpenseTotal(expenses) / 100).format("$0,0.00");
    const wrapper = shallow(<ExpenseSummary count={count} total={total} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render summary without expenses", () => {
    const expenses = [];
    const count = expenses.length;
    const total = numeral(selectExpenseTotal(expenses) / 100).format("$0,0.00");
    const wrapper = shallow(<ExpenseSummary count={count} total={total} />);
    expect(wrapper).toMatchSnapshot();
});