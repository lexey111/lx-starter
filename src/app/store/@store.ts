import CAppStateStore from './app-state/app-state-store';
import CPeopleStore from './examples/example-people-store/app-example-person';
import CAppExampleTodoStoreItem from './examples/example-todo-store/app-example-store-item';
import CAppExampleToDoStore from './examples/example-todo-store/app-example-store-list';

export const AppStateStore = new CAppStateStore(); // current view state + auth state

// TODO Store example
export const AppExampleToDoStoreList = new CAppExampleToDoStore(); // just an example of ToDo store
export const AppExampleToDoStoreItem = new CAppExampleTodoStoreItem(); // current (active, on-edit) store item

// Person Store example
export const AppPersonStore = new CPeopleStore();
