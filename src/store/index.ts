import Vue from 'vue';
import Vuex from 'vuex';
import * as interfaces from './interfaces';
import providers from './modules/provider';
import spaces from './modules/spaces';
import krates from './modules/krates';
import rewards from './modules/rewards';
import notifications from './modules/notifications';
import createPersistedState from 'vuex-persistedstate';
import API from '../krateapi';

Vue.use(Vuex);

const api = new API();
const getDefaultState = () => {
  return {
    activeGroup: 0 as number,
    kratespaces: [] as any,
    groups: [] as any,
    userId: 0 as number,
    user: {} as interfaces.User,
    username: '' as string,
    progression: {} as interfaces.Progression,
    // krates: [] as interfaces.UserKrates,
    type: 'user' as string,
    events: {},
    token: '' as string
  };
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    activeGroup: 0 as number,
    kratespaces: [] as any,
    groups: [] as any,
    userId: 0 as number,
    user: {} as interfaces.User,
    username: '' as string,
    progression: {} as interfaces.Progression,
    // krates: [] as interfaces.UserKrates,
    type: 'user' as string,
    events: {},
    token: '' as string
  },
  getters: {
    accountType: state => state.user.type,
    userId: state => state.userId,
    isLoggedIn: state => state.userId !== 0
  },
  mutations: {
    resetState(state: any) {
      if (state.rewards) {
        Vue.delete(state, 'rewards');
      }
      Object.assign(state, getDefaultState());
    },
    setUsername(state: any, username: string) {
      state.username = username;
    },
    setUser(state: any, user: interfaces.User) {
      Vue.set(state, 'user', user);
      state.userId = user.id;
    },
    setType(state: any, usertype: string) {
      state.type = usertype;
    },
    setToken(state: any, token: string) {
      state.token = token;
      localStorage.setItem('krateToken', token);
    },
    setKrates(state: any, payload: any) {
      state.krates = payload;
    },
    setRewards(state: any, payload: any) {
      state.rewards = payload;
    },
    setProgression(state: any, progression: any) {
      Vue.set(state, 'progression', progression);
    },
    setGroups(state: any, groups: any) {
      Vue.set(state, 'groups', groups);
    },
    addXp(state: any, xp: number) {
      state.progression.current_xp += xp;
      state.progression.lifetime_xp += xp;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        console.log('Trying to login');
        const tokenResp = await api.login(
          credentials.username,
          credentials.password
        );
        // console.log('here is the response from login');
        // console.log(tokenResp);
        return tokenResp;
      } catch (error) {
        console.log(error.response);
      }
    },
    addXp({ commit }, xpValue: number) {
      commit('addXp', xpValue);
    },
    async logout({ commit, dispatch }, credentials) {
      localStorage.removeItem('krateToken');
      commit('resetState');
      dispatch('spaces/reset');
      dispatch('providers/reset');
      dispatch('rewards/reset');
      dispatch('krates/reset');

      return true;
    },
    async storeCredentials({ commit, dispatch }, credentials) {
      commit('setUsername', credentials.username);
      commit('setToken', credentials.token);
      const user = await dispatch('initFromServer');
      return user;
    },
    async registerUser({ commit }, payload) {
      try {
        const userResponse = await api.register(payload);
        console.log(userResponse);
        return userResponse;
      } catch (error) {
        console.log(error);
      }
    },
    setProgression({ commit }, payload) {
      // commit('setXp', payload);
      // commit('setLevel', payload.level);
      // commit('')
      commit('setProgression', payload);
    },
    async initFromServer({ commit, dispatch }) {
      try {
        const userdata = await api.fetchData();
        console.log(userdata);
        if (userdata !== undefined) {
          if (userdata.entities.krates) {
            dispatch('krates/setMyKrates', userdata.entities.krates);
            // commit('setKrates', userdata.entities.krates);
          }
          if (userdata.entities.rewards) {
            //commit('setRewards', userdata.entities.rewards);
            dispatch('rewards/setRewards', userdata.entities.rewards);
          }

          if (userdata.entities.groups) {
            commit('setGroups', userdata.entities.groups);
          }

          if (userdata.entities.kratespace) {
            dispatch('spaces/initKratespaces', userdata.entities);
          }

          if (userdata.entities.usertasks) {
            console.log('I am setting usertasks');
            dispatch('spaces/initUsertasks', userdata.entities.usertasks);
          }

          commit('setUser', userdata.result);
          commit('setProgression', userdata.result.progression);
        }
        // commit('setKrates', userdata.entities.krates);
        // commit('setRewards', userdata.entities.rewards);
        return userdata;
      } catch (error) {
        console.log('there was an error fetching the data');
        console.log(error);
      }
    }
  },
  modules: {
    providers,
    spaces,
    notifications,
    krates,
    rewards
  }
});
