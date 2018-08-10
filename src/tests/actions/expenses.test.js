import {addExpense, removeExpense, editExpense} from "../../actions/expenses";

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
    const action = addExpense({description: "This is a new expense", amount: 100.20});
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            description: "This is a new expense", 
            amount: 100.20,
            note: "",
            createdAt: 0,
            id: expect.any(String)
        }
    });
});

test("Should add expense with defaults", () => {
    const action = addExpense();
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            description: "", 
            amount: 0,
            note: "",
            createdAt: 0,
            id: expect.any(String)
        }
    });
});