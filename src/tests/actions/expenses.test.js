import {startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureStore([thunk]);
const expenseData = {};

beforeEach((done) => {
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = {
            description,
            note,
            amount,
            createdAt
        }
    });

    database.ref("expenses").set(expenseData).then(() => done());
});

test("Should remove expense", () => {
    const action = removeExpense("123abc");
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc"
    });
});

test("Should edit expense", () => {
    const action = editExpense("123abc", {note: "This is some note"});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abc",
        updates: {
            note: "This is some note"
        }
    });
});

test("Should add expense", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test("Should add expense to the database", (done) => {
    const store = createMockStore({});
    const expense = {
        description: "Rent",
        amount: 102700,
        note: "",
        createdAt: 0
    };
    store.dispatch(startAddExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expense
            }
        });
        
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});

test("Should add expense to the database with defaults", (done) => {
    const store = createMockStore({});
    const expense = {
        description: "", 
        note: "",
        amount: 0,
        createdAt: 0
    };
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expense
            }
        });
        
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});

test("Should set expenses", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses: expenses
    });
});

test("Should fetch expenses from database", (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        
        done();
    });
});