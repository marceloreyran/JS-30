const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playNote(e) {
    const keyCode = e.keyCode || (e.currentTarget ? e.currentTarget.getAttribute('data-key') : null);
    const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
    
    if (!keyElement) return;

    const freq = keyElement.getAttribute('data-freq');
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle'; 
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Envolvente de sonido (ataque suave y desvanecimiento)
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1.2);

    keyElement.classList.add('playing');
  }

  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  }

  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('mousedown', playNote);
  });

  window.addEventListener('keydown', (e) => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    playNote(e);
  });