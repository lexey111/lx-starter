import CAppPageNavigationStore from './app-state/app-state-navigation-store';
import CAppStateStore from './app-state/app-state-store';
import CPeopleStore from './examples/example-people-store/app-example-person';
import CAppExampleTodoStoreItem from './examples/example-todo-store/app-example-store-item';
import CAppExampleToDoStore from './examples/example-todo-store/app-example-store-list';

// current view state + auth state
export const AppStateStore = new CAppStateStore();
// page sub-navigation
export const AppPageNavigationStore = new CAppPageNavigationStore();

// TODO Store example
export const AppExampleToDoStoreList = new CAppExampleToDoStore(); // example ToDo store
export const AppExampleToDoStoreItem = new CAppExampleTodoStoreItem(); // current (active, on-edit) store item

// Person Store example
export const AppPersonStore = new CPeopleStore();
