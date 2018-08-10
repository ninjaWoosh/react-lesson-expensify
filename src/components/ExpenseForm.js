import React, {Component} from "react";
import moment from "moment";
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : "",
            amount: props.expense ? (props.expense.amount/100).toString() : "",
            note: props.expense ? props.expense.note : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ""
        };
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({amount}));
        }       
    };

    onDateChange = (createdAt) => {
        if(createdAt)
        this.setState(() => ({createdAt}));
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount){
            this.setState(() => ({error: "Please provide description and amount"}));
        }else{
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            });
        }
    };

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        value={this.state.description}
                        placeholder="Description" 
                        autoFocus
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        onChange={this.onAmountChange}
                        value={this.state.amount}
                        type="text" 
                        placeholder="Amount" 
                    />
                    <SingleDatePicker
                        onDateChange={this.onDateChange}
                        date={this.state.createdAt}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                    />
                    <textarea 
                        value={this.state.note}
                        onChange={this.onNoteChange}
                        placeholder="Add notes here (Optional)">
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}