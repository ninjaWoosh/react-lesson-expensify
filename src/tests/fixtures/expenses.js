import moment from "moment";

const expenses = [
    {
        id: "1",
        description: "Coffee",
        amount: 123,
        note: "",
        createdAt: 0
    },
    {
        id: "2",
        description: "Black Car",
        amount: 30000,
        note: "",
        createdAt: moment(0).subtract(5, "days").valueOf()
    },
    {
        id: "3",
        description: "Phone",
        amount: 45,
        note: "",
        createdAt: moment(0).add(5, "days").valueOf()
    },
];

export default expenses;
