import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import balance from "./balance";
import transaction from "./transaction";

export default combineReducers({
  auth,
  user,
  balance,
  transaction,
});
