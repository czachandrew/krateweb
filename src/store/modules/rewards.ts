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
    rewards: {} as any
  };
};

const api = new KrateApi();

const rewardsModule: Module<any, any> = {
  namespaced: true,
  state: {
    rewards: {} as any
  },
  getters: {
    myRewards: state => state.rewards
  },
  mutations: {
    addReward(state, reward: any) {
      console.log('Adding a reward');
      if (state.rewards) {
        console.log('rewards are set');
        Vue.set(state.rewards, reward.id, reward);
      } else {
        console.log('nnot set');
        Vue.set(state, 'rewards', { [reward.id]: reward });
      }
    },
    updateReward(state, updatedReward: any) {
      state.rewards[updatedReward.id] = updatedReward;
    },
    setRewards(state, rewards: any) {
      Vue.set(state, 'rewards', rewards);
    },
    reset(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    addReward({ commit }, reward: any) {
      commit('addReward', reward);
    },
    setRewards({ commit }, rewards: any) {
      commit('setRewards', rewards);
    },
    reset({ commit }) {
      commit('reset');
    },
    startRewardRedemption({ commit }, reward: any) {},
    redeemReward({ commit }, reward: any) {},
    updateRewardStatus({ commit }, updatedReward: any) {
      commit('updateReward', updatedReward);
    }
  }
};

export default rewardsModule;
