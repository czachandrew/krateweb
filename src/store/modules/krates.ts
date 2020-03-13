import Vue from 'vue';
import { Module } from 'vuex';
import * as interfaces from '../interfaces';
import KrateApi from '@/krateapi';

declare global {
  interface Array<T> {
    remove(item: T): T[];
  }
}

Array.prototype.remove = function(item: any) {
  let what = {};
  const a = arguments;
  let L = a.length;
  let ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

const getDefaultState = () => {
  return {
    openingKrate: null as number | null,
    myKrates: [] as any,
    spaceKrates: [] as any
  };
};

const api = new KrateApi();

const kratesModule: Module<any, any> = {
  namespaced: true,
  state: {
    openingKrate: null as number | null,
    myKrates: [] as any,
    spaceKrates: [] as any
  },
  getters: {
    krateBeingOpened: state => state.openingKrate
  },
  mutations: {
    setOpeningKrate(state, krate) {
      state.openingKrate = krate;
    },
    setMyKrates(state, krates) {
      Vue.set(state, 'myKrates', krates);
    },
    reset(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    buyKrate({ commit }, krateId: Number) {},
    async buyAndOpenKrate({ commit, dispatch }, krateId: Number) {
      commit('setOpeningKrate', krateId);
      try {
        const reward = await api.buyAndOpenKrate(krateId);
        // console.log('Here is the reward in the store');
        // console.log(reward);
        dispatch('rewards/addReward', reward, { root: true });
        return reward;
      } catch (error) {
        // console.log('I caught the rror in the store');
        // console.log(error);
        throw error;
      }
    },
    createCustomKrate({ commit }, krate: any) {},
    openKrate({ commit }, myKrateId: Number) {
      commit('setOpeningKrate', myKrateId);
    },
    reset({ commit }) {
      commit('reset');
    },
    setMyKrates({ commit }, krates: any) {
      commit('setMyKrates', krates);
    }
  }
};

export default kratesModule;
