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

const baseUrl: string = 'http://thirtydays.test/';

enum UserEndpoints {
  joinSpace = 'http://thirtydays.test/api/kratespace/join/',
  leaveSpace = 'http://thirtydays.test/api/kratesspace/leave/',
  subscribeToGroup = 'http://thirtydays.test/api/zonegroup/subscribe',
  unsubscribeToGroup = 'http://thirtydays.test/api/zonegroup/unsubscribe',
  makeUsertask = 'http://thirtydays.test/api/usertask',
  makeSubmission = 'http://thirtydays.test/api/submission',
  searchSpaces = 'http://thirtydays.test/api/kratespace/search',
  spaceDetails = 'http://thirtydays.test/api/kratespace/details',
  submitMedia = 'http://thirtydays.test/api/usermedia',
  buyKrate = 'http://thirtydays.test/api/krates/buy',
  buyAndOpenKrate = 'http://thirtydays.test/api/krates/buyandopen',
  openKrate = 'http://thirtydays.test/api/krates/open'
}

enum EndPoints {
  login = 'http://thirtydays.test/oauth/token',
  register = 'http://thirtydays.test/signup',
  providerData = 'http://thirtydays.test/api/provider/superdata',
  userData = 'http://thirtydays.test/api/user/superdata',
  createReward = 'http://thirtydays.test/api/reward',
  createEvent = 'http://thirtydays.test/api/events',
  createKrate = 'http://thirtydays.test/api/krates',
  createSpace = 'http://thirtydays.test/api/kratespace',
  awardXp = 'http://thirtydays.test/api/award/',
  createGroup = 'http://thirtydays.test/api/kratespace/',
  deleteGroup = 'http://thirtydays.test/api/zonegroup/',
  createTask = 'http://thirtydays.test/api/provider/task/ ',
  deleteTask = 'http://thirtydays.test/api/provider/task/',
  approveUsertask = 'http://thirtydays.test/api/provider/usertask/approve/',
  denyUsertask = 'http://thirtydays.test/api/provider/usertask/deny/',
  getKrates = 'http://thirtydays.test/api/krates/store',
  rejectSubmission = 'http://thirtydays.test/api/provider/submission/reject/',
  acceptSubmission = 'http://thirtydays.test/api/provider/submission/accept/',
  addToBank = 'http://thirtydays.test/api/provider/addtobank'
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
  private clientToken = 'onQzs2oJCPJhy3Sh7sCwsW7tuO8NuV9mVf1rtZeg';
  private clientId = 2;

  //   urls;
  constructor() {
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
        EndPoints.register
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
      formData.append('media', file);
      formData.append('type', data.type);
      const result = await this.makeRequest(
        RequestTypes.POST,
        formData,
        UserEndpoints.submitMedia
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

  public async approveUsertask(usertask: string) {
    try {
      const result = await this.makeRequest(
        RequestTypes.GET,
        {},
        EndPoints.approveUsertask + usertask
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
        UserEndpoints.searchSpaces
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
        EndPoints.login
      );
      return token;
    } catch (error) {
      return error;
    }
  }

  public async getProviderData() {
    try {
      const response = await this.makeRequest(
        RequestTypes.GET,
        {},
        EndPoints.providerData
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
        EndPoints.userData
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
        EndPoints.createSpace
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
        EndPoints.awardXp
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
        EndPoints.addToBank
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
        UserEndpoints.joinSpace + space
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
      payload = { usertask: newTask };
    }
    try {
      // var payload = { usertask: newTask };

      const response = await this.makeRequest(
        RequestTypes.POST,
        payload,
        EndPoints.createTask
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
        UserEndpoints.makeUsertask
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
        UserEndpoints.spaceDetails
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
        EndPoints.createGroup + newGroup.kratespace_id + '/group'
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
        EndPoints.deleteGroup + group
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
        EndPoints.getKrates
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
        EndPoints.deleteTask + task
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
        EndPoints.createReward
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
        { krate: { krate } },
        UserEndpoints.buyAndOpenKrate
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
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('krateToken')
    };
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
