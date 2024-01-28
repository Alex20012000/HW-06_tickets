import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompany, IConnections, ICriteria } from '../types/types';

function generateConnections(): IConnections[] {
  return Array.from({ length: 4 }, (_, value) => ({
    value,
    label: `${value === 0 ? 'Без' : value} пересад${value === 1 ? 'ка' : value > 1 ? 'ки' : 'ок'}`,
    selected: false,
  }));
}

export interface FilterState {
  filter: {
    connections: IConnections[]; 
    company: ICompany; 
    criteria: ICriteria; 
  };
}

const initialState: FilterState['filter'] = {
  connections: generateConnections(),
  company: { value: 'all', selected: true },
  criteria: { value: 'cheapest' },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setConnections: (state, action: PayloadAction<{ value: number; selected: boolean }>) => {
      const { value, selected } = action.payload;
      const updatedConnections = [...state.connections];
      updatedConnections[value] = { ...updatedConnections[value], selected };

      return {
        ...state,
        connections: updatedConnections,
        company: { value: state.company.value, selected: state.company.selected },
      };
    },

    setCompany: (state, action: PayloadAction<ICompany>) => {
      const { value, selected } = action.payload;

      return {
        ...state,
        company: { value, selected },
      };
    },

    setSorting: (state, action: PayloadAction<ICriteria>) => ({
      ...state,
      criteria: action.payload,
    }),
  },
});

export default filterSlice.reducer;
export const { setConnections, setCompany, setSorting } = filterSlice.actions;
