import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IConnections, ICriteria, ITicket } from '../types/types';

import generateTickets from '../data/MockData';

export interface TicketState {
  tickets: ITicket[],
  shown: number,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string; 
}

export const fetchTickets = createAsyncThunk('ticket/fetchTickets', async () => {
  const tickets = generateTickets();
  return tickets;
});

const sortTickets = (criteria: ICriteria) => {
  return (a: ITicket, b: ITicket) => {
    switch (criteria.value) {

      case 'cheapest':
        return a.price - b.price;

      case 'fastest':
        return a.duration - b.duration;
      
      case 'optimal':
        const isOptimalTicketA = (
          a.price <= 20000 &&
          a.connectionAmount === 0
        );

        const isOptimalTicketB = (
          b.price <= 20000 &&
          b.connectionAmount === 0
        );

        return isOptimalTicketA ? -1 : isOptimalTicketB ? 1 : a.connectionAmount - b.connectionAmount;
      default:
        return 1;
    }
  };
};

export const filterTickets = (tickets: ITicket[], connections: IConnections[], companyValue: string) => {
  const selectedConnections = connections.filter(connection => connection.selected).map(connection => connection.value);
  
  return tickets
    .filter(ticket =>
      (selectedConnections.length === 0 || selectedConnections.includes(ticket.connectionAmount)) &&
      (companyValue === 'all' || ticket.company === companyValue)
    );
};

const initialState: TicketState = {
  tickets: [],
  status: 'idle',
  error: null,
  shown: 3,
};
  
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    showTickets(state, action) {
      const { criteria } = action.payload;
      state.tickets.sort(sortTickets(criteria));
      state.shown = 3;
    },
    loadMore(state) {
      state.shown += 3;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});

export default ticketSlice.reducer;
export const { showTickets, loadMore } = ticketSlice.actions;
