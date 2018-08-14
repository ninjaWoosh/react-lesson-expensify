import React from 'react';
import {shallow} from "enzyme";
import {EditExpenses} from "../../components/EditExpenses";
import expenses from "../fixtures/expenses";

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpenses expense={expenses[0]} editExpense={editExpense} startRemoveExpense={startRemoveExpense} history={history} />);
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
    expect(startRemoveExpense).toBeCalledWith(expenses[0].id);
    expect(history.push).toBeCalledWith("/");
});