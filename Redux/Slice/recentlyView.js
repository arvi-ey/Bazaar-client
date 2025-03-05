import { createSlice } from "@reduxjs/toolkit";

const AddRecentView = (state) => {
    localStorage.setItem("recent", JSON.stringify(state))
}

export const recentViewSlice = createSlice({
    name: "recentview",
    initialState: {
        items: []
    },
    reducers: {
        addrecentView: (state, action) => {
            // console.log(action.payload?._id)
            const index = state.items.findIndex(item => item._id == action.payload?._id)
            if (index !== -1) {
                state.items.splice(index, 1)
            }
            state.items.unshift(action.payload)
            AddRecentView(state.items)

        },
        getRecentView: (state, action) => {
            const data = localStorage.getItem("recent")
            state.items = data ? JSON.parse(data) : []
        }
    }
})

export const { addrecentView, getRecentView } = recentViewSlice.actions
export default recentViewSlice.reducer