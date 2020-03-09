import Vue from 'vue';
import { Module } from 'vuex';
import * as interfaces from '../interfaces';
import KrateApi from '@/krateapi';
const krateapi = new KrateApi();
const getDefaultState = () => {
  return {
    kratespaces: [] as any,
    groups: [] as any,
    tasks: [] as any,
    usertasks: [] as any
  };
};
const spacesModule: Module<any, any> = {
  namespaced: true,
  state: {
    kratespaces: [], // these are subscribed kratespaces
    groups: [], // this is subscribed groups
    tasks: [], // this should be tasks relevant to groups you follow
    usertasks: [] // these are pending tasks that are awaiting approval from an admin
    // activity: {} // this is just recent activity approvals xp awards / etc. move to notifications?
  },
  getters: {
    getKratespaces: state => state.kratespaces,
    lastUsertask: state => (task_id: string) => {},
    usertasksForTask: state => (task_id: string) => {
      //console.log('checking for usertasks');
      for (const usertask in state.usertasks) {
        if (state.usertasks[usertask].task_id === task_id) {
          if (
            state.usertasks[usertask].status !== 'approved' &&
            state.usertasks[usertask].status !== 'archived'
          ) {
            return usertask;
          }
        }
      }
      //console.log('I should be returning false');
      return false;
    },
    tasksForZone: state => (id: string) => {
      //console.log('DOING IT');
      let tasks = [];
      for (let i in state.tasks) {
        //console.log(state.tasks[i]);
        if (state.tasks[i].zonegroup_id === id) {
          tasks.push(state.tasks[i]);
        }
      }
      console.log(tasks);
      return tasks;
    },
    hasPendingUserTasks: state => (taskId: number) => {
      state.usertasks.find((usertask: any) => usertask.task_id === taskId);
    },
    groupsForMySpace: state => (id: string) => {
      let groups = [];
      return state.kratespaces[id].groups.filter((group: any) => {
        //console.log(state.groups[group]);
        return state.groups[group];
      });
    }
  },
  mutations: {
    setKratespaces(state, kratespaces: any) {
      Vue.set(state, 'kratespaces', kratespaces);
    },
    reset(state) {
      Object.assign(state, getDefaultState());
    },
    setGroups(state, groups: any) {
      Vue.set(state, 'groups', groups);
    },
    setTasks(state, tasks: any) {
      Vue.set(state, 'tasks', tasks);
    },
    setUsertasks(state, payload: any) {
      Vue.set(state, 'usertasks', payload);
    },
    approveUsertask(state, usertask: number) {
      state.usertasks[usertask].status = 'approved';
    },
    denyUsertask(state, usertask: number) {
      state.usertasks[usertask].status = 'denied';
    },
    addUsertask(state, usertask: any) {
      console.log('Here is the user task object');
      console.log(usertask);
      //state.tasks[usertask.task_id].usertasks.push(usertask.id);
      Vue.set(state.usertasks, usertask.id, usertask);
    }
  },
  actions: {
    initKratespaces({ commit }, payload) {
      // payload should be normalized data
      console.log('Initialize krate spaces');
      commit('setKratespaces', payload.kratespace);
      commit('setGroups', payload.groups);
      commit('setTasks', payload.tasks);
      // commit('setGroups', payload.groups);
      //
    },
    reset({ commit }) {
      commit('reset');
    },
    initGroups({ commit }, payload) {
      commit('setGroups', payload.groups);
    },
    approveUsertask({ commit }, payload) {
      commit('approveUsertask', payload);
    },
    denyUsertask({ commit }, taskId: number) {
      commit('denyUsertask', taskId);
    },
    initUsertasks({ commit }, payload) {
      console.log('here are the tasks');
      console.log(payload);
      commit('setUsertasks', payload);
    },
    async createUsertask({ commit }, payload: any) {
      console.log('at the store');
      console.log(payload);
      krateapi
        .createUsertask(payload.usertask, payload.media)
        .then(response => {
          console.log(response);
          commit('addUsertask', response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default spacesModule;
