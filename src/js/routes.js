import main from './pages/home';
import slider from './pages/slider';
import player from './pages/player';

export const ROUTES = {
  main: {path: '/', component: main, exact: true},
  slider: {path: '/slider', component: slider},
  player: {path: '/player', component: player},
};

export default ROUTES;
