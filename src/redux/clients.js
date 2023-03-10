import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clients: [],
};
export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    getClients: () => {
      return (dispatch) => {
        fetch(`${process.env.REACT_APP_API}clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(setClients(data.clients));
          });
      };
    },
    deleteClientById: (state, action) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
  },
});

export const { setClients, getClients, deleteClientById } =
  clientsSlice.actions;
export default clientsSlice.reducer;
