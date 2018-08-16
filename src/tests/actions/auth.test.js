import {login, logout} from "../../actions/auth";

test("Should call login properly", () => {
    const action = login(1);
    expect(action).toEqual({
        type: "LOGIN",
        uid: 1
    });
});

test("Should call logout properly", () => {
    const action = logout();
    expect(action).toEqual({
        type: "LOGOUT"
    });
});