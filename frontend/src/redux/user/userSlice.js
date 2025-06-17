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

        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        }

    }
 
})

export const {
      signInStart, 
      signInSuccess, 
      signInFailure,
      updateUserFailure,
      updateUserSuccess,
      updateUserStart,
      deleteUserStart,
      deleteUserSuccess, 
      deleteUserFailure
    } = userSlice.actions;

export default userSlice.reducer;