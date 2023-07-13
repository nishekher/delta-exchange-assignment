import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Member {
  id: number;
  name: string;
  company: string;
  status: string;
  notes: string;
  lastUpdate: string;
}

interface State {
  members: Member[];
  companies: string[];
  filterMembers: string[];
}

const initialState: State = {
  members: [],
  companies: [],
  filterMembers: [],
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<Member>) => {
      state.members.push(action.payload);
      const isExist = state.companies.find(
        (company) =>
          company.toLocaleLowerCase() ===
          action.payload.company.toLocaleLowerCase()
      );
      if (!isExist) {
        state.companies.push(action.payload.company);
      }
    },
    deleteMember: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      );
    },
    filterMembers: (state, action: PayloadAction<any>) => {
      state.filterMembers = action.payload;
    },
  },
});

export const { addMember, deleteMember, filterMembers } = membersSlice.actions;

export default membersSlice.reducer;
