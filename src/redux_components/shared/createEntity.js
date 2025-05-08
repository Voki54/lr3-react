import { createSlice } from '@reduxjs/toolkit';
import { takeLatest, call, put } from 'redux-saga/effects';

export const createEntity = ({ name, fetchFn, addFn, updateFn, deleteFn }) => {
  const slice = createSlice({
    name,
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {
      // FETCH
      fetchRequest: (state) => { state.loading = true;  state.error = null; },
      fetchSuccess: (state, action) => { state.loading = false; state.data = action.payload; },
      fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },

      // ADD
      addRequest: (state)  => { state.loading = true; state.error = null; },
      addSuccess: (state, action) => { state.loading = false; state.data.push(action.payload); },
      addFailure: (state, action) => { state.loading = false; state.error = action.payload; },

      // UPDATE
      updateRequest: (state)  => { state.loading = true; state.error = null; },
      updateSuccess: (state, action) => {
        state.loading = false;
        const idx = state.data.findIndex(e => e.id === action.payload.id);
        if (idx > -1) state.data[idx] = action.payload;
      },
      updateFailure: (state, action) => { state.loading = false; state.error = action.payload; },

      // DELETE
      deleteRequest: (state)  => { state.loading = true; state.error = null; },
      deleteSuccess: (state, action) => {
        state.loading = false;
        state.data = state.data.filter(e => e.id !== action.payload);
      },
      deleteFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    },
  });

  function* fetchSaga(action) {
    try {
      const data = yield call(fetchFn, action.payload);
      yield put(slice.actions.fetchSuccess(data));
    } catch (e) {
      yield put(slice.actions.fetchFailure(e.message));
    }
  }

  function* addSaga(action) {
    try {
      const created = yield call(addFn, action.payload);
      yield put(slice.actions.addSuccess(created));
    } catch (e) {
      yield put(slice.actions.addFailure(e.message));
    }
  }

  function* updateSaga(action) {
    try {
      const updated = yield call(updateFn, action.payload);
      yield put(slice.actions.updateSuccess(updated));
    } catch (e) {
      yield put(slice.actions.updateFailure(e.message));
    }
  }

  function* deleteSaga(action) {
    try {
      yield call(deleteFn, action.payload);
      yield put(slice.actions.deleteSuccess(action.payload));
    } catch (e) {
      yield put(slice.actions.deleteFailure(e.message));
    }
  }

  function* sagaWatcher() {
    yield takeLatest(slice.actions.fetchRequest.type, fetchSaga);
    if (addFn)    yield takeLatest(slice.actions.addRequest.type,    addSaga);
    if (updateFn) yield takeLatest(slice.actions.updateRequest.type, updateSaga);
    if (deleteFn) yield takeLatest(slice.actions.deleteRequest.type, deleteSaga);
  }

  return {
    slice,
    saga: sagaWatcher,
    actions: slice.actions,
    reducer: slice.reducer,
  };
};
