import { createAction, NavigationActions } from '../utils';
import * as authService from '../services/auth';

const month = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
    timeArr: [],
    headerTitle: `${month[new Date().getMonth()]}月`,
  },
  reducers: {
    loginStart(state, { payload }) {
      return { ...state, ...payload, fetching: true };
    },
    loginEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false };
    },
    saveHeaderTitle(state, { payload: { headerTitle } }) {
      return { ...state, headerTitle };
    },
    saveCount(state, { payload: { count }}) {
      
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put(createAction('loginStart')());
      const login = yield call(authService.login, payload);
      if (login) {
        yield put(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
          })
        );
      }
      yield put(createAction('loginEnd')({ login }));
    },
  },
};
