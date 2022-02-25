import { createSlice } from '@reduxjs/toolkit'
const initialState = { UserID: null, AuthenticationKey: null };
const BreakException = {};

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserID(state, action) {
            state.UserID = action.payload
        },
        setAuthenticationKey(state, action) {
            state.AuthenticationKey = action.payload
        },
        resetLogin(state, action) {
            state.UserID = null;
            state.AuthenticationKey = null;
        },
    },
})
    
export const { setUserID, setAuthenticationKey, resetLogin } = LoginSlice.actions
export default LoginSlice.reducer