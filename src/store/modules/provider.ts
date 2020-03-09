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
    active_group: null as number | null,
    zone_xp_bank: 0 as number,
    krate_xp_bank: 0 as number,
    groups: {},
    users: {},
    tasks: {},
    submissions: {},
    rewards: {},
    experience_events: [],
    kratespace: {} as interfaces.Kratespace,
    usertasksForApproval: {}
  };
};

const api = new KrateApi();

const providersModule: Module<any, any> = {
  namespaced: true,
  state: {
    active_group: null as number | null,
    space_xp: 0 as number,
    krate_xp: 0 as number,
    groups: {},
    users: {},
    tasks: {},
    submissions: {},
    rewards: {},
    experience_events: [],
    kratespace: {} as interfaces.Kratespace,
    usertasksForApproval: {}
  },
  getters: {
    kratespace: state => state.kratespace,
    kratespace_id: state => state.kratespace.id,
    myusers: state => state.users,
    groups: state => state.groups,
    taskDetails: state => {
      const tasks: any = [];
      state.groups[state.active_group].tasks.forEach((element: number) => {
        tasks.push(state.tasks[element]);
      });
      return tasks;
    },
    groupDetails: state => (groupid: number) => {
      return state.groups[groupid];
    },
    rewards: state => state.rewards,
    pendingUsertasks: state => (taskid: number) => {
      var usertasks: any = [];
      for (const usertask in state.usertasksForApproval) {
        if (
          state.usertasksForApproval[usertask].task_id === taskid &&
          state.usertasksForApproval[usertask].status === 'new'
        ) {
          usertasks.push(state.usertasksForApproval[usertask]);
        }
      }
      return usertasks;
    }
  },
  mutations: {
    addToBank(state, amt) {
      console.log('Triggered');
      state.space_xp += amt;
    },
    setTasks(state, tasks: any) {
      Vue.set(state, 'tasks', tasks);
    },
    increaseTaskCount(state, task: number) {
      state.tasks[task].count++;
    },
    deleteTask(state, task: any) {
      state.groups[state.tasks[task].zonegroup_id].tasks.remove(task);
      Vue.delete(state.tasks, task);
    },
    addTask(state, task: any) {
      console.log('adding a task');
      console.log(task);
      state.groups[task.zonegroup_id].tasks.push(task.id);
      Vue.set(state.tasks, task.id, task);
    },
    setSubmissions(state, payload) {
      Vue.set(state, 'submissions', payload);
    },
    setRewards(state, payload) {
      state.rewards = payload;
    },
    setKratespace(state, kratespace: interfaces.Kratespace) {
      console.log('Setting the kratespace');
      state.kratespace = kratespace;
      state.kratespace_id = kratespace.id;
      state.space_xp = kratespace.space_xp;
    },
    setGroups(state, groups: any) {
      Vue.set(state, 'groups', groups);
    },
    removeGroup(state, group: number) {
      Vue.delete(state.groups, group);
    },
    addGroup(state, group: any) {
      state.groups[group.id] = group;
    },
    addReward(state, reward: any) {
      state.rewards[reward.id] = reward;
    },
    setActiveGroup(state, group: number) {
      state.active_group = group;
    },
    removeFromUsertasksForApproval(state, usertask) {
      Vue.delete(state.usertasksForApproval, usertask);
      // state.usertasksForApproval[usertask].status = 'approved';
    },
    setUsertasksForApproval(state, usertasks: any) {
      Vue.set(state, 'usertasksForApproval', usertasks);
    },
    setUsers(state, users: any) {
      Vue.set(state, 'users', users);
    },
    addSpaceXp(state, xp: number) {
      Vue.set(state, 'space_xp', xp);
    },
    spendXp(state, xp: number) {
      state.space_xp -= xp;
    },
    updateUserXp(state, payload: any) {
      state.users[payload.user_id].progression.current_xp += payload.amount;
    },
    reset(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    reset({ commit }) {
      commit('reset');
    },
    async rewardUser({ commit }, payload: any) {
      try {
        const data = await api.awardXp(payload);

        commit('spendXp', payload.amount);
        commit('updateUserXp', payload);
        return data;
      } catch (error) {
        throw error;
      }
    },
    approveUsertask({ commit, state }, usertask: any) {
      api
        .approveUsertask(usertask)
        .then(response => {
          console.log('successfully approved on server');
          console.log(response);
          if (
            state.tasks[state.usertasksForApproval[usertask].task_id]
              .limited === 1
          ) {
            //update the task
            commit(
              'increaseTaskCount',
              state.usertasksForApproval[usertask].task_id
            );
          }
          commit('removeFromUsertasksForApproval', usertask);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addUsertask({ commit }, newusertask: any) {
      commit('addUsertask', newusertask);
    },
    async addToBank({ commit }, amt: number) {
      try {
        const response = await api.addToBank(amt);
        commit('addToBank', amt);
        return response;
      } catch (error) {
        return error;
      }
    },
    setActiveGroup({ commit }, group: number) {
      commit('setActiveGroup', group);
    },
    deleteGroup({ commit }, index: number) {
      api
        .deleteGroup(index)
        .then(response => {
          console.log(response);
          commit('removeGroup', index);
        })
        .catch(error => {
          console.log(error);
        });
      // commit('removeGroup', index);
    },
    async createTask({ commit }, task: any) {
      const obj = await api
        .createTask(task)
        .then(response => {
          console.log('This is from the store');
          console.log(response);
          commit('addTask', response.data);
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });

      return obj;
    },
    deleteTask({ commit }, task: any) {
      api
        .deleteTask(task)
        .then(response => {
          commit('deleteTask', task);
        })
        .catch(error => {
          console.log(error);
        });
    },
    init({ commit }) {
      api
        .getProviderData()
        .then(response => {
          console.log('I am now going to set provider data');
          console.log(response);
          if (response !== undefined) {
            commit(
              'setKratespace',
              response.kratespace[Object.keys(response.kratespace)[0]]
            );
            commit('setGroups', response.groups);
            commit('setTasks', response.tasks);
            commit('setUsers', response.users);
            commit('setRewards', response.rewards);
            commit('setUsertasksForApproval', response.usertasks);
            return response;
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    createSpace({ commit }, newSpace: interfaces.NewKrateSpace) {
      api
        .createSpace(newSpace)
        .then(response => {
          console.log('Successfully created a space!');
          console.log(response);
          commit('setKratespace', response.data);
          commit('init');
          return response.data;
        })
        .catch(error => {
          return error;
        });
    },
    createReward({ commit }, payload: any) {
      api
        .createReward(payload)
        .then(response => {
          console.log('Here is the response from the store');
          console.log(response);
          if (response !== undefined) {
            console.log(response);
            commit('addReward', response);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    createGroup({ commit }, newGroup: interfaces.NewKratespaceGroup) {
      api.createGroup(newGroup).then(response => {
        // the return object is an array of all groups / does that make sense
        if (response !== undefined) {
          console.log(response.groups);
          commit('setGroups', response.groups);
        }
      });
    }
  },
  modules: {}
};

export default providersModule;
