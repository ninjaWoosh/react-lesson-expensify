import React from "react";
import {shallow} from "enzyme";
import { Header } from "../../components/Header";

let startLogout = () => {};
beforeEach(() => {
    startLogout = jest.fn();
});

test("Should render Header snapshot", () => {
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    expect(wrapper).toMatchSnapshot();
});

test("Should render Header snapshot", () => {
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    wrapper.find("button").simulate("click");
    expect(startLogout).toBeCalled();
});