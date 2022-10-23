import Vimeo from '@vimeo/player';
import _throttle from 'lodash.throttle';

const STORAGE_KEY = "videoplayer-current-time"

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

player.on(
  'timeupdate',
  _throttle(({ seconds }) => {
    localStorage.setItem(STORAGE_KEY, seconds);
  }, 1000)
);

player.on('loaded', () => {
  const currentTime = localStorage.getItem(STORAGE_KEY) || 0;
  player.setCurrentTime(currentTime);
});
