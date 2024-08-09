

import { createStore } from "vuex";
import { tweet } from "./modules/tweet";
import { user } from "./modules/user";
import { follow } from "./modules/follow";
export default createStore({
  modules: {
    follow,
    tweet,
    user
  }
});