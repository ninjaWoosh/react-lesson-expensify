import React from 'react';
import {shallow} from "enzyme";
import {EditExpenses} from "../../components/EditExpenses";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpenses expense={expenses[0]} editExpense={editExpense} removeExpense={removeExpense} history={history} />);
});

test("Should render edit expenses component", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should render with correct submit data", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
    expect(editExpense).toBeCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toBeCalledWith("/");
});

test("Should render with click data", () => {
    wrapper.find("button").prop("onClick")();
    expect(removeExpense).toBeCalledWith(expenses[0].id);
    expect(history.push).toBeCalledWith("/");
});