import { createStore} from "easy-peasy";
import model, { StoreModel } from "./models";
const store = createStore(model);
export default store;