import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null, // 'adding', 'removing', 'renaming'
  item: null, // { id: '1', name: 'general', removable: false}
}

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => { // { type, item }
      return { type: payload.type, item: payload.item || null }
    },
    hideModal: () => {
      return { type: null, item: null }
    },
  },
})

export const { actions } = modalSlice
export default modalSlice.reducer
