import { createSlice } from '@reduxjs/toolkit'

// L'initialisation de l'etat actuelle de l'utilisateur
   const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

// Creation de slice 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // au debut
        signInStart: (state) => {
            state.loading = true
        },
        //data reussis
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        // echoué
        signInFailure: (state, action) => {
             state.error = action.payload
            state.loading = false;
           
        },

    }
 
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;