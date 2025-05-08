import { createAuthEntity } from '../../shared/createAuthEntity';
import { loginUser, registerUser } from './api';

export const {
  slice: userSlice,
  saga: userSaga,
  actions: userActions,
  reducer: userReducer,
} = createAuthEntity({
  name: 'user',
  loginFn: loginUser,
  registerFn: registerUser,
});
