const song = document.querySelector('#song');
const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-back');

const currentTimeEl = document.querySelector('.current-time');
const durationTimeEl = document.querySelector('.duration-time');
const rangeTimeEl = document.querySelector('.music-range');

let musicIndex = 0;
let isPLaying = false;

const musics = [
  'BadHabits-EdSheeran.mp3',
  'Happier-EdSheeran.mp3',
  'Perfect-EdSheeran.mp3',
  'ShapeOfYou-EdSheeran.mp3',
];

song.src = `./musics/${musics[musicIndex]}`;

const rangeChangeHandler = () => {
  song.currentTime = rangeTimeEl.value;
};

rangeTimeEl.addEventListener('change', rangeChangeHandler);

const updateTime = () => {
  const { currentTime, duration } = song;
  rangeTimeEl.max = duration;
  rangeTimeEl.value = currentTime;
  if (currentTime) {
    currentTimeEl.textContent = formatTime(currentTime);
  } else {
    currentTimeEl.textContent = '00:00';
  }
  durationTimeEl.textContent = formatTime(duration);
};

const formatTime = number => {
  const minutes = Math.floor(number / 60);
  const secconds = Math.floor(number - minutes * 60);

  return `${minutes < 10 ? minutes.toString().padStart(2, 0) : minutes} : ${
    secconds < 10 ? secconds.toString().padStart(2, 0) : secconds
  }`;
};

let timer = setInterval(() => {
  updateTime();
}, 500);

const changeMusic = direction => {
  if (direction === 1) {
    musicIndex++;
    if (musicIndex > musics.length - 1) {
      musicIndex = 0;
    }
    song.src = `./musics/${musics[musicIndex]}`;
    isPLaying = false;
  }
  if (direction === -1) {
    musicIndex--;
    if (musicIndex < 0) {
      musicIndex = musics.length - 1;
    }
    song.src = `./musics/${musics[musicIndex]}`;
    isPLaying = false;
  }

  playPause();
};

const playPause = () => {
  if (isPLaying) {
    song.pause();
    playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
    clearInterval(timer);
  } else {
    song.play();
    playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
    timer = setInterval(() => {
      updateTime();
    }, 500);
  }
  isPLaying = !isPLaying;
};

playBtn.addEventListener('click', playPause);

prevBtn.addEventListener('click', () => {
  changeMusic(-1);
});
nextBtn.addEventListener('click', () => {
  changeMusic(1);
});

song.addEventListener('ended', () => {
  changeMusic(1);
});
