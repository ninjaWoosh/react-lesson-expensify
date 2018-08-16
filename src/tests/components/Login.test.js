import React from 'react';
import {shallow} from "enzyme";
import {LoginPage} from "../../components/Login";

let startLogin = () => {};
beforeEach(() => {
    startLogin = jest.fn();
});

test("Should render login page correctly", () => {
    const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
    expect(wrapper).toMatchSnapshot(wrapper);
});

test("Should call the correct props", () => {
    const wrapper = shallow(<LoginPage startLogin={startLogin} />);
    wrapper.find("button").simulate("click");
    expect(startLogin).toBeCalled();
});