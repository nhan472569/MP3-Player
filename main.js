const song = document.querySelector('#song');
const thumb = document.querySelector('.thumb');
const musicName = document.querySelector('.music-name');
const authorName = document.querySelector('.author-name');

const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-back');
const infiniteBtn = document.querySelector('.play-infinite');
const repeatBtn = document.querySelector('.play-repeat');

const currentTimeEl = document.querySelector('.current-time');
const durationTimeEl = document.querySelector('.duration-time');
const rangeTimeEl = document.querySelector('.music-range');

const musicItems = document.querySelectorAll('.item');

let musicIndex = 0;
let isPLaying = false;
let behavior = 'repeat';

infiniteBtn.addEventListener('click', () => {
  infiniteBtn.classList.add('active');
  repeatBtn.classList.remove('active');
  behavior = 'infinite';
});

repeatBtn.addEventListener('click', () => {
  infiniteBtn.classList.remove('active');
  repeatBtn.classList.add('active');
  behavior = 'repeat';
});

const musics = [
  {
    filename: 'BadHabits-EdSheeran.mp3',
    name: 'Bad Habits',
    singer: 'Ed sheeran',
    image: './images/badhabits.jpg',
  },
  {
    filename: 'Happier-EdSheeran.mp3',
    name: 'Happier',
    singer: 'Ed sheeran',
    image: './images/happier.jpg',
  },
  {
    filename: 'Perfect-EdSheeran.mp3',
    name: 'Perfect',
    singer: 'Ed sheeran',
    image: './images/perfect.jpg',
  },
  {
    filename: 'ShapeOfYou-EdSheeran.mp3',
    name: 'Shape Of You',
    singer: 'Ed sheeran',
    image: './images/shapeofyou.jpg',
  },
];

const resetActive = items => {
  items.forEach(el => {
    el.classList.remove('active');
  });
};

const updateActive = index => {
  resetActive(musicItems);
  const musicEls = [...musicItems];
  musicEls[index].classList.add('active');
};

musicItems.forEach((el, index) => {
  el.addEventListener('click', () => {
    playerInit(index);
    isPLaying = false;
    resetActive(musicItems);
    el.classList.add('active');
    playPause();
  });
});

const playerInit = index => {
  song.src = `./musics/${musics[index].filename}`;
  thumb.src = musics[index].image;
  musicName.textContent = musics[index].name;
  authorName.textContent = musics[index].singer;

  updateActive(index);
};
playerInit(musicIndex);

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
    playerInit(musicIndex);
    isPLaying = false;
  }
  if (direction === -1) {
    musicIndex--;
    if (musicIndex < 0) {
      musicIndex = musics.length - 1;
    }
    playerInit(musicIndex);
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

const replay = () => {
  playerInit();
};

song.addEventListener('ended', () => {
  if (behavior === 'repeat') {
    changeMusic(1);
    return;
  }
  if (behavior === 'infinite') {
    rangeTimeEl.value = 0;
    isPLaying = false;
    playPause();
    return;
  }
  changeMusic(1);
});
