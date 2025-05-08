import { createSlice } from '@reduxjs/toolkit';
import { takeLatest, call, put } from 'redux-saga/effects';

export const createEntity = ({ name, fetchFn }) => {
  const slice = createSlice({
    name,
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {
      fetchRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      fetchFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

  function* sagaWorker() {
    try {
      const data = yield call(fetchFn);
      yield put(slice.actions.fetchSuccess(data));
    } catch (e) {
      yield put(slice.actions.fetchFailure(e.message));
    }
  }

  function* sagaWatcher() {
    yield takeLatest(slice.actions.fetchRequest.type, sagaWorker);
  }

  return {
    slice,
    saga: sagaWatcher,
    actions: slice.actions,
    reducer: slice.reducer,
  };
};
