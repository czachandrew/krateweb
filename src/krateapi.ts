import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { faThList } from '@fortawesome/free-solid-svg-icons';

enum RequestTypes {
  POST = 'post',
  GET = 'get',
  DELETE = 'delete'
}

interface NewUser {
  name: string;
  username: string;
  password: string;
  type: string;
}

var baseUrl: string = 'http://api.kratelyfe.com';

enum UserEndpoints {
  joinSpace = '/api/kratespace/join/',
  leaveSpace = '/api/kratesspace/leave/',
  subscribeToGroup = '/api/zonegroup/subscribe',
  unsubscribeToGroup = '/api/zonegroup/unsubscribe',
  makeUsertask = '/api/usertask',
  makeSubmission = '/api/submission',
  searchSpaces = '/api/kratespace/search',
  spaceDetails = '/api/kratespace/details',
  submitMedia = '/api/usermedia',
  buyKrate = '/api/krates/buy',
  buyAndOpenKrate = '/api/krates/buyandopen',
  openKrate = '/api/krates/open'
}

enum EndPoints {
  login = '/oauth/token',
  register = '/signup',
  providerData = '/api/provider/superdata',
  userData = '/api/user/superdata',
  createReward = '/api/reward',
  createEvent = '/api/events',
  createKrate = '/api/krates',
  createSpace = '/api/kratespace',
  awardXp = '/api/award/',
  createGroup = '/api/kratespace/',
  deleteGroup = '/api/zonegroup/',
  createTask = '/api/provider/task/ ',
  deleteTask = '/api/provider/task/',
  approveUsertask = '/api/provider/usertask/approve/',
  denyUsertask = '/api/provider/usertask/deny/',
  approveJoinRequest = '/api/provider/joinrequests/approve/',
  getKrates = '/api/krates/store',
  rejectSubmission = '/api/provider/submission/reject/',
  acceptSubmission = '/api/provider/submission/accept/',
  addToBank = '/api/provider/addtobank'
}

export default class KrateApi {
  public krate = new schema.Entity('krates');
  public reward = new schema.Entity('rewards');
  public rewards = new schema.Array(this.reward);
  public usertask = new schema.Entity('usertasks');
  public usertasks = new schema.Array(this.usertask);
  public task = new schema.Entity('tasks', {
    usertasks: this.usertasks
  });

  public tasks = new schema.Array(this.task);

  public group = new schema.Entity('groups', {
    tasks: this.tasks
  });
  public user = new schema.Entity('users');
  public users = new schema.Array(this.user);
  public groups = new schema.Array(this.group);
  public providerData = new schema.Entity('kratespace', {
    groups: this.groups,
    users: this.users,
    rewards: this.rewards
  });

  public kratespace = new schema.Entity('kratespace', {
    groups: this.groups
  });
  public kratespaces = new schema.Array(this.kratespace);
  public progression = new schema.Entity('progression');

  public krates = new schema.Array(this.krate);

  public apiData = new schema.Object({
    krates: this.krates,
    rewards: this.rewards,
    kratespaces: this.kratespaces,
    usertasks: this.usertasks
  });
  // This is for dev
  // private clientToken = 'onQzs2oJCPJhy3Sh7sCwsW7tuO8NuV9mVf1rtZeg';
  // private clientId = 2;

  // This is for prod

  private clientToken = 'eNKZ1GVUaa2JxD5ZRs8ALkXe7pJ9i0COl18SlUum';
  private clientId = 2;

  //   urls;
  constructor() {
    // console.log('constructing');
    // console.log(window.location.hostname);
    // if (window.location.hostname == 'localhost') {
    //   console.log('local host');
    //   this.clientToken = 'onQzs2oJCPJhy3Sh7sCwsW7tuO8NuV9mVf1rtZeg';
    //   this.clientId = 2;
    //   baseUrl = 'http://thirtydays.test';
    // }
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
    if (localStorage.getItem('krateToken')) {
      axios.defaults.headers['Authorization'] =
        'Bearer ' + localStorage.getItem('krateToken');
    }
  }

  public async register(newuser: NewUser) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        newuser,
        baseUrl + EndPoints.register
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async submitMedia(file: any, data: any) {
    console.log("Here is the data that I'm sending with the media");
    console.log(data);
    try {
      let formData = new FormData();
      var key = 0;
      for (const obj in file) {
        formData.append(`media[${key}]`, file[obj]);
        key++;
      }
      //formData.append('media', file);
      formData.append('type', data.type);
      const result = await this.makeRequest(
        RequestTypes.POST,
        formData,
        baseUrl + UserEndpoints.submitMedia
      );
      console.log('I have uplaoded the media');
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log('there was an error');
      console.log(error);
      throw 'There was an error ' + error.message;
    }
  }

  public async approveJoinRequest(requestId: string) {
    try {
      const result = await this.makeRequest(
        RequestTypes.GET,
        {},
        baseUrl + EndPoints.approveJoinRequest + requestId
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error.data;
    }
  }

  public async approveUsertask(usertask: string) {
    try {
      const result = await this.makeRequest(
        RequestTypes.GET,
        {},
        baseUrl + EndPoints.approveUsertask + usertask
      );
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      throw 'There was an error ' + error.message;
    }
  }

  public async searchSpaces(term?: string) {
    // if no term just return what we think is relevant to the user default limit of 10
    let payload = {};
    if (term) {
      payload = { term };
    }
    try {
      const result = await this.makeRequest(
        RequestTypes.POST,
        payload,
        baseUrl + UserEndpoints.searchSpaces
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  public async login(username: string, password: string) {
    try {
      const token = await this.makeRequest(
        RequestTypes.POST,
        {
          username,
          password,
          grant_type: 'password',
          client_id: this.clientId,
          client_secret: this.clientToken
        },
        baseUrl + EndPoints.login
      );
      return token;
    } catch (error) {
      throw error;
    }
  }

  public async getProviderData() {
    try {
      const response = await this.makeRequest(
        RequestTypes.GET,
        {},
        baseUrl + EndPoints.providerData
      );
      console.log(response);
      const data = normalize(response.data, this.providerData);
      return data.entities;
    } catch (error) {
      console.log(error);
    }
  }

  public async fetchData() {
    try {
      const response = await this.makeRequest(
        RequestTypes.GET,
        {},
        baseUrl + EndPoints.userData
      );
      console.log(response.data);
      const normalizedData = normalize(response.data, this.apiData);
      console.log(normalizedData);
      return normalizedData;
    } catch (error) {
      return error;
    }
  }

  public async createSpace(newSpace: any) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        newSpace,
        baseUrl + EndPoints.createSpace
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async awardXp(XpObject: any) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        XpObject,
        baseUrl + EndPoints.awardXp
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log('I caught the error');
      console.log(error);
      throw error.data;
    }
  }

  public async addToBank(amount: number) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        { amount: amount },
        baseUrl + EndPoints.addToBank
      );

      return response.data;
    } catch (error) {
      return error;
      console.log(error);
    }
  }

  public async joinSpace(space: any) {
    try {
      const response = await this.makeRequest(
        RequestTypes.GET,
        {},
        baseUrl + UserEndpoints.joinSpace + space
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async createTask(newTask: any, media?: any) {
    var payload = {};
    if (media) {
      payload = { usertask: newTask, media };
    } else {
      payload = {
        experienceTask: newTask.task,
        requirements: newTask.requirements
      };
    }
    try {
      // var payload = { usertask: newTask };

      const response = await this.makeRequest(
        RequestTypes.POST,
        payload,
        baseUrl + EndPoints.createTask
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async rewardXp(payload: any) {}

  public async createUsertask(newUsertask: any, media?: any) {
    const payload = { usertask: newUsertask, media: media };
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        payload,
        baseUrl + UserEndpoints.makeUsertask
      );

      return response.data;
    } catch (error) {
      console.log(error.message);
      throw 'There was an error - ' + error.message;
    }
  }

  public async spaceDetails(id: any) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        { space: id },
        baseUrl + UserEndpoints.spaceDetails
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  public async createGroup(newGroup: any) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        newGroup,
        baseUrl + EndPoints.createGroup + newGroup.kratespace_id + '/group'
      );
      const groupData = normalize(response.data, this.groups);
      return groupData.entities;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteGroup(group: number) {
    try {
      const response = await this.makeRequest(
        RequestTypes.DELETE,
        {},
        baseUrl + EndPoints.deleteGroup + group
      );
      return true;
    } catch (error) {
      return error;
    }
  }

  public async getKrates() {
    try {
      const response = await this.makeRequest(
        RequestTypes.GET,
        {},
        baseUrl + EndPoints.getKrates
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteTask(task: number) {
    try {
      const response = await this.makeRequest(
        RequestTypes.DELETE,
        {},
        baseUrl + EndPoints.deleteTask + task
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async createReward(payload: any) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        payload,
        baseUrl + EndPoints.createReward
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  public async buyAndOpenKrate(krate: any) {
    try {
      const response = await this.makeRequest(
        RequestTypes.POST,
        krate,
        baseUrl + UserEndpoints.buyAndOpenKrate
      );
      if (response.data === 'Not enough funds') {
        throw response.data;
      } else {
        return response.data;
      }

      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  // createKrate() {}

  // distributeXP() {}

  // createXpEvent() {}
  private async makeRequest(
    method: RequestTypes,
    payload = {},
    endpoint: EndPoints | string
  ) {
    var headers = {};
    if (
      localStorage.getItem('krateToken') !== 'undefined' &&
      localStorage.getItem('krateToken') !== null
    ) {
      //console.log('Token is here');
      //console.log(localStorage.getItem('krateToken'));
      headers = {
        Authorization: 'Bearer ' + localStorage.getItem('krateToken')
      };
    }

    const config = {
      method,
      url: endpoint,
      headers,
      data: {}
    };

    // maybe manually attach header here -  I should do that in the plugin

    if (payload !== {}) {
      config.data = payload;
    }
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error);
      // console.log('Hey I got the error in the makeRequest function');
      throw error.response;
      if (error.response) {
        return error.response.data;
      } else {
        return error;
      }
    }
  }
}
