import Vue from 'vue';
import { Module } from 'vuex';
import * as interfaces from '../interfaces';
import KrateApi from '@/krateapi';

const notificationsModule: Module<any, any> = {
  state: {
    notifications: [],
    nextId: 1
  },
  mutations: {
    PUSH(state, notification: any) {
      state.notifications.push({
        ...notification,
        id: state.nextId++
      });
    },
    DELETE(state, notificationToRemove: any) {
      state.notifications = state.notifications.filter(
        (notification: any) => notification.id !== notificationToRemove.id
      );
    }
  },
  actions: {
    add({ commit }, notification: any) {
      commit('PUSH', notification);
    },
    remove({ commit }, notificationToRemove: any) {
      commit('DELETE', notificationToRemove);
    }
  }
};

export default notificationsModule;
