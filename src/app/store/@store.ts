import CAppStateStore from './app-state/app-state-store';
import CAppExampleToDoStore from './example-todo-store/app-example-store';
import CAppExampleTodoStoreItem from './example-todo-store/app-example-store-item';

export const AppStateStore = new CAppStateStore(); // current view state + auth state

export const AppExampleToDoStore = new CAppExampleToDoStore(); // just an example of ToDo store
export const AppExampleToDoStoreItem = new CAppExampleTodoStoreItem(); // current (active, on-edit) store item
