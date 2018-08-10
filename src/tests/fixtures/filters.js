import moment from "moment";

const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const otherFilters = {
    text: "bill",
    sortBy: "amount",
    startDate: moment(0).startOf("month"),
    endDate: moment(0).endOf("month")
}

export {filters, otherFilters};