const { createSlice } = require('@reduxjs/toolkit');

const UserSlice = createSlice({
    name: "User",
    initialState: {
        data: null,
        timestamp: null,
        isLoading: true, // Add isLoading state
    },
    reducers: {
        lstouser(state) {
            state.isLoading = true; // Set loading to true when fetching starts
            if (localStorage.getItem("user")) {
                const lstimestamp = localStorage.getItem("user_timestamp");
                const now = new Date().getTime();
                const difference = now - lstimestamp;

                if (difference > Number(process.env.NEXT_PUBLIC_LOGIN_ALLOWED_TIME)) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("user_timestamp");
                    state.isLoading = false; // Set loading to false if user is removed
                    return;
                }
                state.timestamp = lstimestamp;
                state.data = JSON.parse(localStorage.getItem("user"));
            }
            state.isLoading = false; // Set loading to false after fetching is complete
        },
        updateUserData(state, actions) {
            state.data = actions.payload.user;
            console.log("User Data Updated", actions);

            localStorage.setItem("user", JSON.stringify(actions.payload.user));
        },
        login(state, actions) {
            state.data = actions.payload.user;
            state.timestamp = new Date().getTime();
            state.isLoading = false; // Set loading to false after login
        },
        logout(state) {
            state.data = null;
            state.timestamp = null;
            state.isLoading = false; // Set loading to false after logout
            localStorage.removeItem("user");
            localStorage.removeItem("user_timestamp");
        },
    },
});

export const { login, logout, lstouser, updateUserData } = UserSlice.actions;
export default UserSlice.reducer;