import React from 'react';
import { shallow } from "enzyme";
import {CreateExpenses} from "../../components/CreateExpenses";
import expenses from "../fixtures/expenses";

let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<CreateExpenses addExpense={addExpense} history={history} />);
});

test("Should render CreateExpenses component", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should render CreateExpenses component with correct parameters", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
    expect(addExpense).toBeCalledWith(expenses[0]);
    expect(history.push).toBeCalledWith("/");
});