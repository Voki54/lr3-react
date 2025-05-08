import { createSlice } from '@reduxjs/toolkit';
import { takeLatest, call, put } from 'redux-saga/effects';

export function createAuthEntity({ name, loginFn, registerFn }) {
  const slice = createSlice({
    name,
    initialState: {
      user: JSON.parse(localStorage.getItem('authUser') || 'null'),
      loading: false,
      error: null,
    },
    reducers: {
      loginRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      loginSuccess: (state, action) => {
        localStorage.setItem('authUser', JSON.stringify(action.payload));
        state.loading = false;
        state.user = action.payload;
      },
      loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      registerRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      registerSuccess: (state, action) => {
        localStorage.setItem('authUser', JSON.stringify(action.payload));
        state.loading = false;
        state.user = action.payload;
      },
      registerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      logoutRequest: (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem('authUser');
      },
    },
  });

  function* loginSaga(action) {
    try {
      const user = yield call(loginFn, action.payload);
      yield put(slice.actions.loginSuccess(user));
    } catch (e) {
      yield put(slice.actions.loginFailure(e.message));
    }
  }

  function* registerSaga(action) {
    try {
      const user = yield call(registerFn, action.payload);
      yield put(slice.actions.registerSuccess(user));
    } catch (e) {
      yield put(slice.actions.registerFailure(e.message));
    }
  }


  function* authSaga() {
    yield takeLatest(slice.actions.loginRequest.type, loginSaga);
    yield takeLatest(slice.actions.registerRequest.type, registerSaga);
  }

  return {
    slice,
    saga: authSaga,
    actions: slice.actions,
    reducer: slice.reducer,
  };
}
