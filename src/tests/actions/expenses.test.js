import {startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureStore([thunk]);
const uid = "testuid";
const defaultAuthState = {auth: {uid}};

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = {
            description,
            note,
            amount,
            createdAt
        }
    });

    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test("Should remove expense", () => {
    const action = removeExpense("123abc");
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc"
    });
});

test("Should remove expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id
        });

        return database.ref(`users/${uid}/expenses/${id}`).once("value");
        
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });;
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

test("Should edit expense on firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = {
        description: "Updated description",
        amount: 19
    };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${id}`).once("value");
    }).then((snapshot) => {
        const snapshotValues = snapshot.val();
        const updatedExpense = {
            description: snapshotValues.description,
            amount: snapshotValues.amount
        }

        expect(updatedExpense).toEqual(updates);
        done();
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
    const store = createMockStore(defaultAuthState);
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
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});

test("Should add expense to the database with defaults", (done) => {
    const store = createMockStore(defaultAuthState);
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
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
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
    const store = createMockStore(defaultAuthState);

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        
        done();
    });
});