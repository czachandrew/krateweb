import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faUser,
  faSync,
  faExclamationCircle,
  faEllipsisH,
  faUsers,
  faTasks,
  faCoins,
  faUpload,
  faArrowUp,
  faArrowDown,
  faBoxes,
  faCaretDown,
  faCaretUp,
  faCameraRetro,
  faStreetView,
  faSpinner,
  faLock,
  faLockOpen,
  faPlus,
  faMinus,
  faUniversity,
  faUserFriends,
  faAngleLeft,
  faAngleRight,
  faGift
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'buefy/dist/buefy.css';

library.add(faUserSecret);
library.add(faSync);
library.add(faExclamationCircle);
library.add(faEllipsisH);
library.add(
  faUsers,
  faTasks,
  faCoins,
  faUpload,
  faArrowUp,
  faArrowDown,
  faBoxes,
  faUser,
  faCaretUp,
  faCaretDown,
  faCameraRetro,
  faStreetView,
  faSpinner,
  faLock,
  faLockOpen,
  faPlus,
  faMinus,
  faUniversity,
  faUserFriends,
  faAngleLeft,
  faAngleRight,
  faGift
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultIconComponent: 'font-awesome-icon'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
