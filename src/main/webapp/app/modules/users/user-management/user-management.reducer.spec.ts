import configureStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import userManagement, {
  getUsers,
  getRoles,
  getUser,
  reset,
} from './user-management.reducer';
import { defaultValue } from 'app/shared/model/user.model';
import { AUTHORITIES } from 'app/config/constants';

describe('User management reducer tests', () => {
  const username = process.env.E2E_USERNAME ?? 'admin';

  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    } else {
      return Object.keys(element).length === 0;
    }
  }

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      updating: false,
      updateSuccess: false,
      totalItems: 0,
    });
    expect(isEmpty(state.users));
    expect(isEmpty(state.authorities));
    expect(isEmpty(state.user));
  }

  function testMultipleTypes(types, payload, testFunction, error?) {
    types.forEach(e => {
      testFunction(userManagement(undefined, { type: e, payload, error }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(userManagement(undefined, { type: 'unknown' }));
    });
  });

  describe('Requests', () => {
    it('should not modify the current state', () => {
      testInitialState(userManagement(undefined, { type: getRoles.pending.type }));
    });

    it('should set state to loading', () => {
      testMultipleTypes([getUsers.pending.type, getUser.pending.type], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          loading: true,
        });
      });
    });

  });

  describe('Failures', () => {
    it('should set state to failed and put an error message in errorMessage', () => {
      testMultipleTypes(
        [
          getUsers.rejected.type,
          getUser.rejected.type,
          getRoles.rejected.type,
        ],
        { message: 'something happened' },
        state => {
          expect(state).toMatchObject({
            loading: false,
            updating: false,
            updateSuccess: false,
            errorMessage: 'error happened',
          });
        },
        { message: 'error happened' }
      );
    });
  });

  describe('Success', () => {
    it('should update state according to a successful fetch user request', () => {
      const payload = { data: 'some handsome user' };
      const toTest = userManagement(undefined, { type: getUser.fulfilled.type, payload });

      expect(toTest).toMatchObject({
        loading: false,
        user: payload.data,
      });
    });

    it('should update state according to a successful fetch role request', () => {
      const payload = { data: [AUTHORITIES.ADMIN] };
      const toTest = userManagement(undefined, { type: getRoles.fulfilled.type, payload });

      expect(toTest).toMatchObject({
        loading: false,
        authorities: payload.data,
      });
    });

  });

  describe('Reset', () => {
    it('should reset the state', () => {
      const initialState = {
        loading: false,
        errorMessage: null,
        users: [],
        authorities: [] as any[],
        user: defaultValue,
        updating: false,
        updateSuccess: false,
        totalItems: 0,
      };
      const initialStateNew = {
        ...initialState,
        loading: true,
      };
      expect(userManagement(initialStateNew, reset)).toEqual(initialState);
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches FETCH_USERS_AS_ADMIN_PENDING and FETCH_USERS_AS_ADMIN_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: getUsers.pending.type,
        },
        {
          type: getUsers.fulfilled.type,
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getUsers({}));
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });

    it('dispatches FETCH_USERS_AS_ADMIN_PENDING and FETCH_USERS_AS_ADMIN_FULFILLED actions with pagination options', async () => {
      const expectedActions = [
        {
          type: getUsers.pending.type,
        },
        {
          type: getUsers.fulfilled.type,
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getUsers({ page: 1, size: 20, sort: 'id,desc' }));
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });

    it('dispatches FETCH_ROLES_PENDING and FETCH_ROLES_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: getRoles.pending.type,
        },
        {
          type: getRoles.fulfilled.type,
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getRoles());
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });

    it('dispatches FETCH_USER_PENDING and FETCH_USER_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: getUser.pending.type,
        },
        {
          type: getUser.fulfilled.type,
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getUser(username));
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });

    it('dispatches RESET actions', async () => {
      const expectedActions = [reset()];
      await store.dispatch(reset());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
