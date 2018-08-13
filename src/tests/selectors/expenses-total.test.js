import selectExpenseTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("Should return the total amount of expenses.", () => {
    const totalAmount = selectExpenseTotal(expenses);
    expect(totalAmount).toBe(30168);
});

test("Should correctly add up one expense.", () => {
    const totalAmount = selectExpenseTotal([expenses[0]]);
    expect(totalAmount).toBe(123);
});

test("Should return the 0 if no expenses provided.", () => {
    const totalAmount = selectExpenseTotal();
    expect(totalAmount).toBe(0);
});