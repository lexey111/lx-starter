import CAppStateStore from './app-state/app-state-store';
import CAppExampleStore from './example-store/app-example-store';

export const AppStateStore = new CAppStateStore(); // current view state + auth state

export const AppExampleStore = new CAppExampleStore(); // just an example
