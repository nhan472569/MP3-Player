const song = document.querySelector('#song');
const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-back');

const musics = [
  'BadHabits-EdSheeran.mp3',
  'Happier-EdSheeran.mp3',
  'Perfect-EdSheeran.mp3',
  'ShapeOfYou-EdSheeran.mp3',
];

let musicIndex = 0;

let isPLaying = false;

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
  } else {
    song.play();
    playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
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
