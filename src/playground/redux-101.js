



store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: "Hello here",
    amount: 100,
    createdAt:999
}));

const expenseTwo = store.dispatch(addExpense({
    description: "Pizza",
    amount: 200,
    createdAt:45
}));

// store.dispatch(editExpense({
//     id: expenseTwo.expense.id,
//     updates: {
//         amount:111
//     }
// }));

// store.dispatch(removeExpense({
//     id: expenseTwo.expense.id,
// }));

// store.dispatch(setFilterText({text: "zza"}));

// store.dispatch(setFilterText());

store.dispatch(sortByDate());
store.dispatch(sortByAmount());
// store.dispatch(setStartDate(46));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1000));
// store.dispatch(setEndDate());


const demoState = {
    expenses: [
        {
            id: "asdsdasa",
            description: "Some description",
            amount: 5.00,
            note: "",
            createdAt: 0
        }
    ],
    filters: {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    }
};
