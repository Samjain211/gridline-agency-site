const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('.video-card video').forEach((video, index) => {
  const player = document.createElement('div');
  player.className = 'video-player';
  player.style.cssText = 'position:relative;isolation:isolate;background:#080909;';
  video.parentNode.insertBefore(player, video);
  player.append(video);

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'video-play';
  playButton.setAttribute('aria-label', 'Play video ' + (index + 1));
  playButton.innerHTML = '<span aria-hidden="true">▶</span>';
  playButton.style.cssText = 'position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);width:72px;height:72px;border:1px solid #f5f5f2;border-radius:50%;background:#f5f5f2;color:#070808;display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 30px #0009;transition:opacity .18s ease;';
  playButton.querySelector('span').style.cssText = 'font-size:22px;margin-left:4px;';
  player.append(playButton);

  const showPlay = () => {
    playButton.style.opacity = '1';
    playButton.style.pointerEvents = 'auto';
  };
  const hidePlay = () => {
    playButton.style.opacity = '0';
    playButton.style.pointerEvents = 'none';
  };

  playButton.addEventListener('click', () => {
    video.play().catch(() => {
      playButton.setAttribute('aria-label', 'Unable to play video. Use the video controls to try again.');
    });
  });
  video.addEventListener('play', hidePlay);
  video.addEventListener('pause', showPlay);
  video.addEventListener('ended', showPlay);
});
