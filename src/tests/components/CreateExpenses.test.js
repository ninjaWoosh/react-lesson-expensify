import React from 'react';
import { shallow } from "enzyme";
import {CreateExpenses} from "../../components/CreateExpenses";
import expenses from "../fixtures/expenses";

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<CreateExpenses startAddExpense={startAddExpense} history={history} />);
});

test("Should render CreateExpenses component", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should render CreateExpenses component with correct parameters", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
    expect(startAddExpense).toBeCalledWith(expenses[0]);
    expect(history.push).toBeCalledWith("/");
});