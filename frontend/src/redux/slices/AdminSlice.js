const { createSlice } = require('@reduxjs/toolkit')

const AdminSlice = createSlice(
    {
        name: "Admin",
        initialState: {
            data: null,
            token: null,
            timestamp: null
        },
        reducers: {
            lstoadmin(state) {
                if (localStorage.getItem("admin")) {
                    const lsToken = localStorage.getItem("admin_token")
                    const logintimestamp = localStorage.getItem("admin_timestamp")
                    const now = new Date().getTime()
                    const diff = now - logintimestamp
                    if (diff >= Number(process.env.NEXT_PUBLIC_LOGIN_ALLOWED_TIME)) {
                        localStorage.removeItem("admin")
                        localStorage.removeItem("admin_timestamp")
                        return;
                    }
                    state.timestamp = logintimestamp
                    state.data = JSON.parse(localStorage.getItem("admin"))
                    state.token = lsToken
                }
            },
            updateAdminData(state, actions) {
                state.data = actions.payload.admin
                localStorage.setItem('admin', JSON.stringify(actions.payload.admin))
            },
            adminlogin(state, actions) {
                state.data = actions.payload.admin;
                state.timestamp = new Date().getTime()
                state.token = actions.payload.token;
            },
            adminlogout(state) {
                state.data = null;
                state.timestamp = null;
                state.token = null;
                localStorage.removeItem("admin_token")
                localStorage.removeItem("admin")
                localStorage.removeItem("admin_timestamp")
            }
        }
    }
)

export const { adminlogin, adminlogout, lstoadmin, updateAdminData } = AdminSlice.actions;
export default AdminSlice.reducer;
