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
}

const initialState: State = {
  members: [],
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<Member>) => {
      state.members.push(action.payload);
    },
    deleteMember: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      );
    },
  },
});

export const { addMember, deleteMember } = membersSlice.actions;

export default membersSlice.reducer;
