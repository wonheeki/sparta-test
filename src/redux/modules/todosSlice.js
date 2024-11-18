import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    console.log(payload)
    return payload
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log(state, action)
      state.list = [...state.list,action.payload]
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo)=> todo.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__addToDo.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });
    builder.addCase(__deleteTodo.fulfilled, (state, action) => {
       state.list = state.list.filter(todo => todo.id !== action.payload);
    })
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
