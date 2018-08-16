import authReducer from "../../reducers/auth";

test("Should set uid when called with login action", () => {
    const result = authReducer(undefined, {
        type: "LOGIN",
        uid: 1
    });

    expect(result).toEqual({
        uid: 1
    });
});

test("Should set uid to null when called with logout action", () => {
    const result = authReducer(undefined, {
        type: "LOGOUT"
    });

    expect(result).toEqual({});
});