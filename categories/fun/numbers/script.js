function toArabicDigits(num) {
  const map = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((digit) => map[Number(digit)] || digit).join('');
}

function formatScore(value) {
  return toArabicDigits(value);
}


function getBalloonLabel(value, fallbackValue = null) {
  if (typeof value === 'number') return toArabicDigits(value);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return fallbackValue != null ? getBalloonLabel(fallbackValue) : '٠';
    }
    if (/^\d+$/.test(trimmed)) {
      return toArabicDigits(Number(trimmed));
    }
    return trimmed;
  }
  if (fallbackValue != null) return getBalloonLabel(fallbackValue);
  return '٠';
}

function normalizeBalloonOptions(items) {
  return (Array.isArray(items) ? items : []).map((item) => ({
    val: getBalloonLabel(item?.val ?? item?.value),
    isCorrect: Boolean(item?.isCorrect),
  }));
}

const numbers = Array.from({ length: 20 }, (_, index) => {
  const value = index + 1;
  const arabic = toArabicDigits(value);
  const words = ['صفر', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر', 'عشرون'];
  return {
    id: `n${value}`,
    value,
    arabic,
    word: words[value],
    examples: [`${arabic} 🍎`, `${arabic} 🍌`, `${arabic} 🍇`],
  };
});

let currentNumberIndex = 0;
let stars = 0;
let badges = 0;
let score = 0;
let completedNumbers = [];
let currentRound = 0;
let pendingStageChallenge = false;
let currentStageActivity = null;
let stageProgress = 0;
let currentStageNumbers = [];
let stageChallengeRound = 0;
let stageChallengeMaxRounds = 0;
let stageChallengeMode = '';
let balloonRemaining = 4;
let currentScreen = 'home';
let currentChallengeSnapshot = null;
let currentStageSnapshot = null;
let currentStageIcon = '🍎';

const STORAGE_KEY = 'numbersProgress';
const IMAGE_ROUNDS = 3;
const NUMBER_ROUNDS = 3;
const MAX_SCORE = 10;

function getDefaultStageState() {
  return {
    active: false,
    score: 0,
    currentRound: 0,
    balloonRemaining: 4,
    currentStageActivity: null,
    stageProgress: 0,
    currentStageNumbers: [],
    stageChallengeRound: 0,
    stageChallengeMaxRounds: 0,
    stageChallengeMode: '',
    challengeSnapshot: null,
    stageSnapshot: null,
  };
}

function resetStageProgressState() {
  score = 0;
  currentRound = 0;
  balloonRemaining = 4;
  currentStageActivity = null;
  stageProgress = 0;
  currentStageNumbers = [];
  stageChallengeRound = 0;
  stageChallengeMaxRounds = 0;
  stageChallengeMode = '';
  currentChallengeSnapshot = null;
  currentStageSnapshot = null;
}

function buildPlayerPayload() {
  return {
    completedNumbers,
    stars,
    badges,
    currentNumberIndex,
    currentScreen,
  };
}

function getNextNumberIndex() {
  const currentNumberId = numbers[currentNumberIndex]?.id;
  const isCurrentNumberCompleted = Boolean(currentNumberId && completedNumbers.includes(currentNumberId));
  const firstUncompleted = numbers.findIndex((number) => !completedNumbers.includes(number.id));

  if (isCurrentNumberCompleted) {
    return firstUncompleted === -1 ? 0 : firstUncompleted;
  }

  return currentNumberIndex;
}

function buildStagePayload() {
  const hasActiveStageProgress = currentScreen === 'challenge' || currentScreen === 'stage' || currentStageActivity !== null || currentRound > 0 || stageChallengeRound > 0 || stageProgress > 0 || balloonRemaining < 4 || Boolean(currentChallengeSnapshot) || Boolean(currentStageSnapshot);
  return {
    active: hasActiveStageProgress,
    score,
    currentRound,
    balloonRemaining,
    currentStageActivity,
    stageProgress,
    currentStageNumbers: currentStageNumbers.map((item) => item.id),
    stageChallengeRound,
    stageChallengeMaxRounds,
    stageChallengeMode,
    challengeSnapshot: currentChallengeSnapshot,
    stageSnapshot: currentStageSnapshot,
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      resetStageProgressState();
      return;
    }

    const saved = JSON.parse(raw);
    const playerData = saved.playerState || {};
    const stageData = saved.stageState || {};

    completedNumbers = Array.isArray(playerData.completedNumbers) ? playerData.completedNumbers : Array.isArray(saved.completedNumbers) ? saved.completedNumbers : [];
    stars = typeof playerData.stars === 'number' ? playerData.stars : typeof saved.stars === 'number' ? saved.stars : 0;
    badges = typeof playerData.badges === 'number' ? playerData.badges : typeof saved.badges === 'number' ? saved.badges : 0;
    currentNumberIndex = typeof playerData.currentNumberIndex === 'number' ? playerData.currentNumberIndex : typeof saved.currentNumberIndex === 'number' ? saved.currentNumberIndex : 0;
    currentScreen = typeof playerData.currentScreen === 'string' ? playerData.currentScreen : typeof saved.currentScreen === 'string' ? saved.currentScreen : 'home';

    if (stageData && typeof stageData === 'object') {
      score = typeof stageData.score === 'number' ? stageData.score : 0;
      currentRound = typeof stageData.currentRound === 'number' ? stageData.currentRound : 0;
      balloonRemaining = typeof stageData.balloonRemaining === 'number' ? stageData.balloonRemaining : 4;
      currentStageActivity = typeof stageData.currentStageActivity === 'number' ? stageData.currentStageActivity : null;
      stageProgress = typeof stageData.stageProgress === 'number' ? stageData.stageProgress : 0;
      stageChallengeRound = typeof stageData.stageChallengeRound === 'number' ? stageData.stageChallengeRound : 0;
      stageChallengeMaxRounds = typeof stageData.stageChallengeMaxRounds === 'number' ? stageData.stageChallengeMaxRounds : 0;
      stageChallengeMode = typeof stageData.stageChallengeMode === 'string' ? stageData.stageChallengeMode : '';
      currentChallengeSnapshot = stageData.challengeSnapshot || null;
      currentStageSnapshot = stageData.stageSnapshot || null;
      if (Array.isArray(stageData.currentStageNumbers)) {
        currentStageNumbers = stageData.currentStageNumbers
          .map((id) => numbers.find((item) => item.id === id))
          .filter(Boolean);
      } else {
        currentStageNumbers = [];
      }
    } else {
      resetStageProgressState();
    }
  } catch (error) {
    console.warn('Failed to load saved progress:', error);
    resetStageProgressState();
  }
}

function saveProgress() {
  try {
    const payload = {
      playerState: buildPlayerPayload(),
      stageState: buildStagePayload(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to save progress:', error);
  }
}

function clearCurrentStageState() {
  score = 0;
  currentRound = 0;
  balloonRemaining = 4;
  currentStageActivity = null;
  stageProgress = 0;
  currentStageNumbers = [];
  stageChallengeRound = 0;
  stageChallengeMaxRounds = 0;
  stageChallengeMode = '';
  currentChallengeSnapshot = null;
  currentStageSnapshot = null;
  saveProgress();
}

const homeScreen = document.getElementById('homeScreen');
const guideScreen = document.getElementById('guideScreen');
const stageSelectScreen = document.getElementById('stageSelectScreen');
const learnScreen = document.getElementById('learnScreen');
const challengeScreen = document.getElementById('challengeScreen');
const stageChallengeScreen = document.getElementById('stageChallengeScreen');
const finishScreen = document.getElementById('finishScreen');

const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const starCount = document.getElementById('starCount');
const badgeCount = document.getElementById('badgeCount');
const completionText = document.getElementById('completionText');
const stageList = document.getElementById('stageList');

const learnTitle = document.getElementById('learnTitle');
const learnNumber = document.getElementById('learnNumber');
const shapeRow = document.getElementById('shapeRow');
const imageGrid = document.getElementById('imageGrid');
const challengeArena = document.getElementById('challengeArena');
const challengeTitle = document.getElementById('challengeTitle');
const challengeInstruction = document.getElementById('challengeInstruction');
const scoreRow = document.querySelector('.score-row');
const starValue = document.getElementById('starValue');
const finishTitle = document.getElementById('finishTitle');
const finishScore = document.getElementById('finishScore');
const finishCompletionText = document.getElementById('finishCompletionText');
const finishMedal = document.getElementById('finishMedal');
const stageActivityList = document.getElementById('stageActivityList');

const stageIcons = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉'];

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function playPraise() {
  const praises = ['أَحْسَنْتْ', 'ممتاز', 'رائع'];
  speak(praises[Math.floor(Math.random() * praises.length)]);
}

function updateScoreDisplay(value) {
  if (starValue) {
    starValue.textContent = formatScore(value);
  }
}

function renderHome() {
  if (starCount) starCount.textContent = formatScore(stars);
  if (badgeCount) badgeCount.textContent = formatScore(badges);
  const progress = Math.round((completedNumbers.length / numbers.length) * 100);
  if (progressFill) progressFill.style.width = `${progress}%`;
  if (progressText) progressText.textContent = `${toArabicDigits(progress)}%`;
  if (completionText) {
    completionText.textContent = completedNumbers.length === numbers.length
      ? 'لقد أكملت رحلتك التعليمية! شارك نتيجتك (الصفحة الرئيسية) مع معلمتك فقد تكون من أبطال اللعبة الفائزين بالجائزة.'
      : `تم إكمال ${toArabicDigits(completedNumbers.length)} من ${toArabicDigits(numbers.length)} رقمًا`;
  }

  if (!stageList) return;
  stageList.innerHTML = '';
  numbers.forEach((number, index) => {
    const isCompleted = completedNumbers.includes(number.id);
    const isUnlocked = index === 0 || completedNumbers.includes(numbers[index - 1].id);
    const chip = document.createElement('button');
    chip.type = 'button';

    if (isCompleted) {
      chip.className = 'stage-chip completed';
      chip.innerHTML = `<span>الرقم ${number.arabic}</span><span>✅</span>`;
      chip.style.opacity = '0.6';
      chip.style.backgroundColor = '#e0e0e0';
      chip.style.cursor = 'not-allowed';
    } else {
      chip.className = `stage-chip ${isUnlocked ? 'unlocked' : 'locked'}`;
      chip.innerHTML = `<span>الرقم ${number.arabic}</span><span>${isUnlocked ? '▶' : '🔒'}</span>`;
      chip.onclick = () => {
        if (!isUnlocked) return;
        const previousNumberId = numbers[currentNumberIndex]?.id;
        currentNumberIndex = index;
        const currentNumber = numbers[currentNumberIndex];
        const shouldRestoreScore = previousNumberId === currentNumber.id && (
          (currentChallengeSnapshot && currentChallengeSnapshot.numberId === currentNumber.id) ||
          currentStageActivity !== null ||
          currentRound > 0 ||
          stageChallengeRound > 0 ||
          stageProgress > 0 ||
          balloonRemaining < 4 ||
          score > 0
        );

        if (shouldRestoreScore) {
          const restoredScore = typeof currentChallengeSnapshot?.score === 'number' ? currentChallengeSnapshot.score : score;
          score = restoredScore;
          updateScoreDisplay(score);
        } else {
          score = 0;
          updateScoreDisplay(0);
        }

        saveProgress();
        renderLearn();
        showScreen('learn');
      };
    }

    stageList.appendChild(chip);

    if (index % 4 === 3) {
      const groupIndex = Math.floor(index / 4);
      const isChallengeUnlocked = completedNumbers.includes(number.id);
      const chalChip = document.createElement('button');
      chalChip.type = 'button';
      chalChip.className = `stage-chip ${isChallengeUnlocked ? 'unlocked' : 'locked'}`;
      chalChip.style.background = 'linear-gradient(90deg, #ffe0b2, #ffb74d)';
      chalChip.style.borderColor = '#fb8c00';
      chalChip.style.fontWeight = 'bold';
      chalChip.innerHTML = `<span>مرحلة التحدي: ${numbers[groupIndex * 4].arabic} - ${number.arabic}</span><span>${isChallengeUnlocked ? '🏆' : '🔒'}</span>`;
      chalChip.onclick = () => {
        if (!isChallengeUnlocked) return;
        const recentNumbers = numbers.slice(groupIndex * 4, groupIndex * 4 + 4);
        currentStageNumbers = recentNumbers.slice(0, 4);
        currentStageActivity = null;
        stageProgress = 0;
        stageChallengeRound = 0;
        stageChallengeMaxRounds = 0;
        stageChallengeMode = '';
        currentChallengeSnapshot = null;
        currentStageSnapshot = null;
        updateScoreDisplay(score);
        saveProgress();
        renderStageActivities(recentNumbers);
        showScreen('stage');
      };
      stageList.appendChild(chalChip);
    }
  });
}

function renderLearn() {
  const number = numbers[currentNumberIndex];
  if (learnTitle) learnTitle.textContent = `الرقم ${number.arabic}`;
  if (learnNumber) learnNumber.textContent = number.arabic;
  if (shapeRow) shapeRow.innerHTML = '';
  number.examples.forEach((example) => {
    if (shapeRow) {
      const pill = document.createElement('div');
      pill.className = 'shape-pill';
      pill.textContent = example;
      shapeRow.appendChild(pill);
    }
  });
  if (imageGrid) imageGrid.innerHTML = '';
  number.examples.forEach((example) => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '0.5rem';

    const label = document.createElement('span');
    label.textContent = `مثال ${example}`;
    label.style.fontSize = '0.9rem';
    label.style.color = 'var(--ink)';
    label.style.fontWeight = 'bold';

    const box = document.createElement('button');
    box.type = 'button';
    box.className = 'image-item';
    box.style.width = '100%';
    box.textContent = example;
    box.onclick = () => speak(number.word);

    wrapper.appendChild(label);
    wrapper.appendChild(box);
    if (imageGrid) imageGrid.appendChild(wrapper);
  });
}

function createCountDisplay(value, icon) {
  if (value <= 20) {
    return icon.repeat(value);
  }
  return `${toArabicDigits(value)} ${icon}`;
}

function resetMainChallengeState() {
  score = 0;
  currentRound = 0;
  balloonRemaining = 4;
  currentStageActivity = null;
  stageProgress = 0;
  currentStageNumbers = [];
  stageChallengeRound = 0;
  stageChallengeMaxRounds = 0;
  stageChallengeMode = '';
  currentChallengeSnapshot = null;
  currentStageSnapshot = null;
  updateScoreDisplay(0);
}

function startChallenge() {
  const hasSavedProgress = Boolean(currentChallengeSnapshot) || currentStageActivity !== null || currentRound > 0 || stageChallengeRound > 0 || stageProgress > 0 || balloonRemaining < 4;

  if (!hasSavedProgress) {
    resetMainChallengeState();
  }

  showScreen('challenge');
  showChallengeRound();
  saveProgress();
}

function showChallengeRound() {
  if (currentRound === 0) {
    if (challengeTitle) challengeTitle.textContent = 'اصطد الرقم';
    if (challengeInstruction) challengeInstruction.textContent = `اصطد الرقم ${numbers[currentNumberIndex].arabic}`;
    renderBalloonChallenge(currentChallengeSnapshot && currentChallengeSnapshot.type === 'balloon' ? currentChallengeSnapshot : null);
  } else if (currentRound >= 1 && currentRound <= IMAGE_ROUNDS) {
    if (challengeTitle) challengeTitle.textContent = 'اختر الصورة الصحيحة';
    const roundIndex = currentRound;
    if (challengeInstruction) challengeInstruction.textContent = `جولة ${roundIndex} من ${IMAGE_ROUNDS}: اختر الصورة التي تمثل ${numbers[currentNumberIndex].arabic}`;
    renderImageChallenge(currentChallengeSnapshot && currentChallengeSnapshot.type === 'image' ? currentChallengeSnapshot : null);
  } else if (currentRound >= IMAGE_ROUNDS + 1 && currentRound <= IMAGE_ROUNDS + NUMBER_ROUNDS) {
    if (challengeTitle) challengeTitle.textContent = 'اختر الرقم الصحيح';
    const roundIndex = currentRound - IMAGE_ROUNDS;
    if (challengeInstruction) challengeInstruction.textContent = `جولة ${roundIndex} من ${NUMBER_ROUNDS}: اختر الرقم ${numbers[currentNumberIndex].arabic}`;
    renderNumberChoiceChallenge(currentChallengeSnapshot && currentChallengeSnapshot.type === 'number' ? currentChallengeSnapshot : null);
  } else {
    finishStage();
  }
}

function generateBalloonOptions(number) {
  const correctCount = Math.max(1, balloonRemaining);
  const wrongCount = 10;
  const wrongValues = numbers.filter((item) => item.value !== number.value);
  const balloons = Array.from({ length: correctCount }, () => ({ val: getBalloonLabel(number.arabic, number.value), isCorrect: true })).concat(
    Array.from({ length: wrongCount }, () => {
      const fallbackNumber = wrongValues[Math.floor(Math.random() * wrongValues.length)] || numbers[Math.floor(Math.random() * numbers.length)];
      return { val: getBalloonLabel(fallbackNumber?.arabic, fallbackNumber?.value), isCorrect: false };
    })
  );
  return balloons.sort(() => Math.random() - 0.5);
}

function renderBalloonChallenge(snapshot = null) {
  const number = numbers[currentNumberIndex];
  const initialBalloonCount = 4;

  if (!Number.isFinite(balloonRemaining) || balloonRemaining <= 0) {
    balloonRemaining = initialBalloonCount;
  }

  let balloons = snapshot && Array.isArray(snapshot.options) ? normalizeBalloonOptions(snapshot.options) : generateBalloonOptions(number);
  let answeredIndices = Array.isArray(snapshot && snapshot.answeredIndices) ? snapshot.answeredIndices : [];
  if (snapshot && typeof snapshot.balloonRemaining === 'number') {
    balloonRemaining = snapshot.balloonRemaining;
  }

  currentChallengeSnapshot = {
    type: 'balloon',
    numberId: number.id,
    currentRound,
    score,
    balloonRemaining,
    answeredIndices,
    options: balloons.map((item) => ({ val: getBalloonLabel(item.val, item.isCorrect ? number.value : null), isCorrect: item.isCorrect })),
  };

  saveProgress();

  if (challengeArena) challengeArena.innerHTML = '<div class="balloons"></div>';
  const arena = challengeArena ? challengeArena.querySelector('.balloons') : null;
  if (!arena) return;

  if (challengeInstruction) challengeInstruction.textContent = `اختر الرقم ${number.arabic} (تبقى ${formatScore(balloonRemaining)})`;

  balloons.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'balloon';
    btn.style.left = `${5 + Math.random() * 75}%`;
    btn.style.animationDelay = `${Math.random() * 6}s`;
    btn.style.animationDuration = `${5 + Math.random() * 3}s`;
    btn.textContent = item.val;

    if (answeredIndices.includes(index)) {
      btn.dataset.answered = 'true';
      btn.style.display = 'none';
      arena.appendChild(btn);
      return;
    }

    btn.onclick = () => {
      if (btn.dataset.answered) return;
      if (item.isCorrect) {
        btn.dataset.answered = 'true';
        answeredIndices = [...new Set([...answeredIndices, index])];
        balloonRemaining -= 1;
        score = Math.min(10, score + 1);
        updateScoreDisplay(score);
        currentChallengeSnapshot = {
          ...currentChallengeSnapshot,
          score,
          balloonRemaining,
          answeredIndices,
          options: balloons.map((balloon) => ({ val: getBalloonLabel(balloon.val, balloon.isCorrect ? number.value : null), isCorrect: balloon.isCorrect })),
        };
        saveProgress();
        btn.style.display = 'none';
        burstCelebration(btn);
        playPraise();
        if (challengeInstruction) challengeInstruction.textContent = `اختر الرقم ${number.arabic} (تبقى ${formatScore(balloonRemaining)})`;

        if (balloonRemaining <= 0) {
          setTimeout(() => {
            currentRound += 1;
            balloonRemaining = 4;
            currentChallengeSnapshot = null;
            saveProgress();
            showChallengeRound();
          }, 800);
        }
      } else {
        score = Math.max(0, score - 1);
        updateScoreDisplay(score);
        saveProgress();
        btn.classList.add('wrong');
        speak('حاوِلْ مرة أخرى');
        setTimeout(() => btn.classList.remove('wrong'), 300);
      }
    };
    arena.appendChild(btn);
  });
}

function renderImageChallenge(snapshot = null) {
  if (scoreRow) scoreRow.style.display = 'flex';
  const number = numbers[currentNumberIndex];
  const icon = stageIcons[(currentRound + currentNumberIndex) % stageIcons.length];
  let options = snapshot && Array.isArray(snapshot.options) ? snapshot.options : [];

  if (!options.length) {
    const wrongValues = shuffleArray(numbers.filter((item) => item.value !== number.value)).slice(0, 3).map((item) => item.value);
    options = shuffleArray([
      { label: createCountDisplay(number.value, icon), value: true },
      { label: createCountDisplay(wrongValues[0], icon), value: false },
      { label: createCountDisplay(wrongValues[1], icon), value: false },
      { label: createCountDisplay(wrongValues[2], icon), value: false },
    ]);
  }

  currentChallengeSnapshot = {
    type: 'image',
    numberId: number.id,
    currentRound,
    score,
    options: options.map((item) => ({ label: item.label, value: item.value })),
  };
  saveProgress();

  if (challengeArena) challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena ? challengeArena.querySelector('.option-grid') : null;
  if (!grid) return;

  options.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = item.label;
    btn.onclick = () => handleAnswer(item.value, btn);
    grid.appendChild(btn);
  });
}

function renderNumberChoiceChallenge(snapshot = null) {
  if (scoreRow) scoreRow.style.display = 'flex';
  const number = numbers[currentNumberIndex];
  let options = snapshot && Array.isArray(snapshot.options) ? snapshot.options : [];

  if (!options.length) {
    const wrongNumbers = shuffleArray(numbers.filter((item) => item.value !== number.value)).slice(0, 3);
    options = shuffleArray([
      { label: number.arabic, value: true },
      { label: wrongNumbers[0].arabic, value: false },
      { label: wrongNumbers[1].arabic, value: false },
      { label: wrongNumbers[2].arabic, value: false },
    ]);
  }

  currentChallengeSnapshot = {
    type: 'number',
    numberId: number.id,
    currentRound,
    score,
    options: options.map((item) => ({ label: item.label, value: item.value })),
  };
  saveProgress();

  if (challengeArena) challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena ? challengeArena.querySelector('.option-grid') : null;
  if (!grid) return;

  options.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = item.label;
    btn.onclick = () => handleAnswer(item.value, btn);
    grid.appendChild(btn);
  });
}

function handleAnswer(isCorrect, target) {
  if (!target || target.dataset.answered) return;
  target.dataset.answered = 'true';
  if (isCorrect) {
    score = Math.min(MAX_SCORE, score + 1);
    updateScoreDisplay(score);
    saveProgress();
    target.classList.add('success');
    burstCelebration(target);
    playPraise();
    setTimeout(() => {
      currentRound += 1;
      currentChallengeSnapshot = null;
      saveProgress();
      if (currentRound >= IMAGE_ROUNDS + NUMBER_ROUNDS + 1) {
        finishStage();
      } else {
        showChallengeRound();
      }
    }, 800);
  } else {
    score = Math.max(0, score - 1);
    updateScoreDisplay(score);
    saveProgress();
    target.classList.add('wrong');
    speak('حاوِلْ مرة أخرى');
    setTimeout(() => target.classList.remove('wrong'), 300);
  }
}

function finishStage() {
  const number = numbers[currentNumberIndex];
  const finalScore = Math.min(score, MAX_SCORE);
  completedNumbers = [...new Set([...completedNumbers, number.id])];
  if (finalScore === MAX_SCORE) {
    badges += 1;
  }
  stars += finalScore;
  const nextNumberIndex = getNextNumberIndex();
  currentNumberIndex = nextNumberIndex;
  if (starCount) starCount.textContent = formatScore(stars);
  if (badgeCount) badgeCount.textContent = formatScore(badges);
  clearCurrentStageState();
  const medal = finalScore === MAX_SCORE ? '🥇 وسام ذهبي' : '';
  if (finishTitle) finishTitle.textContent = `أحسنت يا بطل لقد أنهيت رقم ${number.arabic}`;
  if (finishScore) finishScore.textContent = `${formatScore(finalScore)} / ${formatScore(MAX_SCORE)} ⭐`;
  if (finishCompletionText) {
    finishCompletionText.textContent = completedNumbers.length === numbers.length
      ? 'لقد أكملت رحلتك التعليمية! شارك نتيجتك (الصفحة الرئيسية) مع معلمتك فقد تكون من أبطال اللعبة الفائزين بالجائزة.'
      : `تم إكمال ${toArabicDigits(completedNumbers.length)} من ${toArabicDigits(numbers.length)} رقمًا`;
  }
  if (finishMedal) finishMedal.textContent = medal;
  renderHome();
  showScreen('finish');
}

function burstCelebration(target) {
  const rect = target.getBoundingClientRect();
  for (let i = 0; i < 10; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'sparkle';
    spark.style.left = `${rect.left + rect.width / 2}px`;
    spark.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  }
}

function renderStageActivities(recentNumbers) {
  if (!stageActivityList) return;
  stageActivityList.innerHTML = '';
  const activities = [
    { title: 'المرحلة الأولى: اصطد الأرقام', text: 'اصطد الأرقام الصحيحة من المجموعة' },
    { title: 'المرحلة الثانية: اختر الصورة', text: 'اختر الصورة التي تمثل العدد الصحيح' },
    { title: 'المرحلة الثالثة: اختر الرقم', text: 'اختر الرقم الصحيح من بين الخيارات' },
  ];
  activities.forEach((activity, index) => {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.innerHTML = `<strong>${activity.title}</strong><p>${activity.text}</p>`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'activity-btn';
    button.textContent = 'ابدأ';
    button.onclick = () => startStageActivity(index, recentNumbers);
    card.appendChild(button);
    stageActivityList.appendChild(card);
  });
}

function renderStageNumberBalloonChallenge(stageNumbers, snapshot = null) {
  if (scoreRow) scoreRow.style.display = 'none';
  currentStageNumbers = stageNumbers.slice(0, 4);
  const numbersText = currentStageNumbers.map((item) => item.arabic).join(' ');
  if (challengeTitle) challengeTitle.textContent = 'اصطد الأرقام';
  if (challengeInstruction) challengeInstruction.textContent = `اصطد الأرقام ${numbersText}`;

  const wrongValues = numbers.filter((item) => !currentStageNumbers.some((number) => number.value === item.value)).map((item) => item.arabic);

  let balloons = snapshot && Array.isArray(snapshot.options) ? normalizeBalloonOptions(snapshot.options) : [
    ...currentStageNumbers.map((item) => ({ val: getBalloonLabel(item.arabic, item.value), isCorrect: true })),
    ...Array.from({ length: 10 }, () => ({ val: getBalloonLabel(wrongValues[Math.floor(Math.random() * wrongValues.length)]), isCorrect: false })),
  ];

  currentStageSnapshot = {
    type: 'stage-balloon',
    currentStageActivity,
    stageProgress,
    options: balloons.map((item) => ({ val: getBalloonLabel(item.val, item.isCorrect ? currentStageNumbers[0]?.value ?? null : null), isCorrect: item.isCorrect })),
    numbers: currentStageNumbers.map((item) => item.id),
  };
  saveProgress();

  if (challengeArena) challengeArena.innerHTML = '<div class="balloons"></div>';
  const arena = challengeArena ? challengeArena.querySelector('.balloons') : null;
  if (!arena) return;

  balloons = shuffleArray(balloons);
  balloons.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'balloon';
    btn.style.left = `${5 + Math.random() * 75}%`;
    btn.style.animationDelay = `${Math.random() * 6}s`;
    btn.style.animationDuration = `${5 + Math.random() * 3}s`;
    btn.textContent = item.val;
    btn.onclick = () => {
      if (btn.dataset.answered) return;
      btn.dataset.answered = 'true';
      if (item.isCorrect) {
        stageProgress += 1;
        btn.style.display = 'none';
        burstCelebration(btn);
        playPraise();
        saveProgress();
        if (stageProgress >= currentStageNumbers.length) {
          setTimeout(() => {
            speak('مَرْحباً بالمرحلة التالية');
            clearCurrentStageState();
            showScreen('stage');
          }, 800);
        }
      } else {
        btn.classList.add('wrong');
        speak('حاوِلْ مرة أخرى');
        setTimeout(() => btn.classList.remove('wrong'), 300);
      }
    };
    arena.appendChild(btn);
  });
  showScreen('challenge');
}

function renderStageImageChallengeRound(snapshot = null) {
  if (scoreRow) scoreRow.style.display = 'none';
  if (stageChallengeRound >= stageChallengeMaxRounds) {
    speak('انتهت المرحلة الثانية');
    clearCurrentStageState();
    showScreen('stage');
    return;
  }
  const targetNumber = currentStageNumbers[stageChallengeRound % currentStageNumbers.length];
  const icon = stageIcons[stageChallengeRound % stageIcons.length];
  if (challengeTitle) challengeTitle.textContent = 'اختر الصورة المناسبة';
  if (challengeInstruction) challengeInstruction.textContent = `جولة ${formatScore(stageChallengeRound + 1)} من ${formatScore(stageChallengeMaxRounds)}: اختر الصورة التي تمثل ${targetNumber.arabic}`;

  const wrongNumbers = shuffleArray(numbers.filter((item) => item.id !== targetNumber.id)).slice(0, 3);
  let options = snapshot && Array.isArray(snapshot.options) ? snapshot.options : shuffleArray([
    { label: createCountDisplay(targetNumber.value, icon), value: true },
    { label: createCountDisplay(wrongNumbers[0].value, icon), value: false },
    { label: createCountDisplay(wrongNumbers[1].value, icon), value: false },
    { label: createCountDisplay(wrongNumbers[2].value, icon), value: false },
  ]);

  currentStageSnapshot = {
    type: 'stage-image',
    currentStageActivity,
    stageChallengeRound,
    stageChallengeMaxRounds,
    options: options.map((item) => ({ label: item.label, value: item.value })),
    numbers: currentStageNumbers.map((item) => item.id),
  };
  saveProgress();

  if (challengeArena) challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena ? challengeArena.querySelector('.option-grid') : null;
  if (!grid) return;

  options.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = item.label;
    btn.onclick = () => {
      if (btn.dataset.answered) return;
      btn.dataset.answered = 'true';
      if (item.value) {
        btn.classList.add('success');
        burstCelebration(btn);
        playPraise();
        stageChallengeRound += 1;
        currentStageSnapshot = null;
        saveProgress();
        setTimeout(renderStageImageChallengeRound, 800);
      } else {
        btn.classList.add('wrong');
        speak('حاوِلْ مرة أخرى');
        setTimeout(() => btn.classList.remove('wrong'), 300);
      }
    };
    grid.appendChild(btn);
  });
  showScreen('challenge');
}

function renderStageNumberChallengeRound(snapshot = null) {
  if (scoreRow) scoreRow.style.display = 'none';
  if (stageChallengeRound >= stageChallengeMaxRounds) {
    speak('انتهت المرحلة الثالثة');
    clearCurrentStageState();
    showScreen('stage');
    return;
  }
  const targetNumber = currentStageNumbers[stageChallengeRound % currentStageNumbers.length];
  if (challengeTitle) challengeTitle.textContent = 'اختر الرقم المناسب';
  if (challengeInstruction) challengeInstruction.textContent = `جولة ${formatScore(stageChallengeRound + 1)} من ${formatScore(stageChallengeMaxRounds)}: اختر الرقم ${targetNumber.arabic}`;

  const wrongNumbers = shuffleArray(numbers.filter((item) => item.id !== targetNumber.id)).slice(0, 3);
  let options = snapshot && Array.isArray(snapshot.options) ? snapshot.options : shuffleArray([
    { label: targetNumber.arabic, value: true },
    { label: wrongNumbers[0].arabic, value: false },
    { label: wrongNumbers[1].arabic, value: false },
    { label: wrongNumbers[2].arabic, value: false },
  ]);

  currentStageSnapshot = {
    type: 'stage-number',
    currentStageActivity,
    stageChallengeRound,
    stageChallengeMaxRounds,
    options: options.map((item) => ({ label: item.label, value: item.value })),
    numbers: currentStageNumbers.map((item) => item.id),
  };
  saveProgress();

  if (challengeArena) challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena ? challengeArena.querySelector('.option-grid') : null;
  if (!grid) return;

  options.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = item.label;
    btn.onclick = () => {
      if (btn.dataset.answered) return;
      btn.dataset.answered = 'true';
      if (item.value) {
        btn.classList.add('success');
        burstCelebration(btn);
        playPraise();
        stageChallengeRound += 1;
        currentStageSnapshot = null;
        saveProgress();
        setTimeout(renderStageNumberChallengeRound, 800);
      } else {
        btn.classList.add('wrong');
        speak('حاوِلْ مرة أخرى');
        setTimeout(() => btn.classList.remove('wrong'), 300);
      }
    };
    grid.appendChild(btn);
  });
  showScreen('challenge');
}

function startStageActivity(index, recentNumbers) {
  currentStageActivity = index;
  currentStageNumbers = recentNumbers.slice(0, 4);
  if (currentStageNumbers.length === 0) {
    currentStageNumbers = numbers.slice(0, 4);
  }
  stageProgress = 0;
  saveProgress();
  if (index === 0) {
    stageChallengeMode = 'balloon';
    renderStageNumberBalloonChallenge(currentStageNumbers);
    return;
  }
  if (index === 1) {
    stageChallengeMode = 'image';
    stageChallengeRound = 0;
    stageChallengeMaxRounds = 10;
    currentStageNumbers = shuffleArray(currentStageNumbers);
    saveProgress();
    renderStageImageChallengeRound();
    return;
  }
  stageChallengeMode = 'number';
  stageChallengeRound = 0;
  stageChallengeMaxRounds = 10;
  currentStageNumbers = shuffleArray(currentStageNumbers);
  saveProgress();
  renderStageNumberChallengeRound();
}

function showScreen(screenName) {
  [homeScreen, stageSelectScreen, learnScreen, guideScreen, challengeScreen, stageChallengeScreen, finishScreen].forEach((screen) => {
    if (screen) screen.classList.remove('active');
  });
  if (screenName === 'home' && homeScreen) homeScreen.classList.add('active');
  if (screenName === 'stageSelect' && stageSelectScreen) stageSelectScreen.classList.add('active');
  if (screenName === 'learn' && learnScreen) learnScreen.classList.add('active');
  if (screenName === 'guide' && guideScreen) guideScreen.classList.add('active');
  if (screenName === 'challenge' && challengeScreen) challengeScreen.classList.add('active');
  if (screenName === 'stage' && stageChallengeScreen) stageChallengeScreen.classList.add('active');
  if (screenName === 'finish' && finishScreen) finishScreen.classList.add('active');
  currentScreen = screenName;
  saveProgress();
}

function speak(text) {
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech) {
    window.Capacitor.Plugins.TextToSpeech.speak({ value: text, lang: 'ar-SA' }).catch(() => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    });
    return;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}

function resumeSession() {
  renderHome();
  if (currentScreen === 'learn') {
    renderLearn();
    showScreen('learn');
    return;
  }
  if (currentScreen === 'stageSelect') {
    showScreen('stageSelect');
    return;
  }
  if (currentScreen === 'challenge') {
    updateScoreDisplay(score);
    if (currentStageActivity !== null) {
      if (currentStageActivity === 0) {
        renderStageNumberBalloonChallenge(currentStageNumbers.length ? currentStageNumbers : numbers.slice(0, 4), currentStageSnapshot);
      } else if (currentStageActivity === 1) {
        renderStageImageChallengeRound(currentStageSnapshot);
      } else if (currentStageActivity === 2) {
        renderStageNumberChallengeRound(currentStageSnapshot);
      } else {
        showChallengeRound();
      }
    } else if (currentChallengeSnapshot) {
      showChallengeRound();
    } else {
      showChallengeRound();
    }
    return;
  }
  if (currentScreen === 'stage') {
    if (currentStageActivity === null) {
      renderStageActivities(currentStageNumbers.length ? currentStageNumbers : undefined);
      showScreen('stage');
      return;
    }
    if (currentStageActivity === 0) {
      renderStageNumberBalloonChallenge(currentStageNumbers.length ? currentStageNumbers : numbers.slice(0, 4), currentStageSnapshot);
    } else if (currentStageActivity === 1) {
      renderStageImageChallengeRound(currentStageSnapshot);
    } else if (currentStageActivity === 2) {
      renderStageNumberChallengeRound(currentStageSnapshot);
    } else {
      renderStageActivities(currentStageNumbers.length ? currentStageNumbers : undefined);
      showScreen('stage');
    }
    return;
  }
  if (currentScreen === 'finish') {
    showScreen('finish');
    return;
  }
  showScreen('home');
}

function bindEvents() {
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.onclick = () => {
      currentNumberIndex = getNextNumberIndex();

      if (currentScreen !== 'challenge' && !currentChallengeSnapshot && currentStageActivity === null && currentRound === 0 && stageChallengeRound === 0 && stageProgress === 0 && balloonRemaining === 4) {
        score = 0;
        updateScoreDisplay(0);
      } else {
        updateScoreDisplay(score);
      }

      saveProgress();
      renderLearn();
      showScreen('learn');
    };
  }

  const stageBtn = document.getElementById('stageBtn');
  if (stageBtn) {
    stageBtn.onclick = () => {
      renderHome();
      updateScoreDisplay(score);
      showScreen('stageSelect');
    };
  }

  const backStageSelectBtn = document.getElementById('backStageSelectBtn');
  if (backStageSelectBtn) backStageSelectBtn.onclick = () => showScreen('home');

  const backStageChallengeBtn = document.getElementById('backStageChallengeBtn');
  if (backStageChallengeBtn) backStageChallengeBtn.onclick = () => showScreen('stageSelect');

  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) settingsBtn.onclick = () => showScreen('guide');

  const backGuideBtn = document.getElementById('backGuideBtn');
  if (backGuideBtn) backGuideBtn.onclick = () => showScreen('home');

  const backHomeBtn = document.getElementById('backHomeBtn');
  if (backHomeBtn) backHomeBtn.onclick = () => showScreen('stageSelect');

  const speakBtn = document.getElementById('speakBtn');
  if (speakBtn) speakBtn.onclick = () => {
    const number = numbers[currentNumberIndex];
    speak(number.word);
  };

  const challengeBtn = document.getElementById('challengeBtn');
  if (challengeBtn) {
    challengeBtn.onclick = () => {
      const hasOngoingStageActivity = currentStageActivity !== null && currentStageActivity >= 0 && currentStageActivity <= 2;
      const hasOngoingMainChallenge = currentScreen === 'challenge' || (currentRound > 0 && currentRound < 3) || (currentRound === 0 && balloonRemaining < 4 && currentScreen !== 'home' && currentScreen !== 'learn' && currentScreen !== 'finish');

      if (hasOngoingStageActivity) {
        updateScoreDisplay(score);
        if (currentStageNumbers && currentStageNumbers.length) renderStageActivities(currentStageNumbers);
        if (currentStageActivity === 0) renderStageNumberBalloonChallenge(currentStageNumbers.length ? currentStageNumbers : numbers.slice(0, 4));
        else if (currentStageActivity === 1) renderStageImageChallengeRound();
        else if (currentStageActivity === 2) renderStageNumberChallengeRound();
        else showScreen('stage');
        return;
      }

      if (hasOngoingMainChallenge) {
        updateScoreDisplay(score);
        showChallengeRound();
        showScreen('challenge');
        return;
      }

      startChallenge();
    };
  }

  const finishBtn = document.getElementById('finishBtn');
  if (finishBtn) finishBtn.onclick = () => showScreen('stageSelect');

  window.addEventListener('beforeunload', saveProgress);
  window.addEventListener('pagehide', saveProgress);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      saveProgress();
    }
  });
}

loadProgress();

if (starCount) starCount.textContent = formatScore(stars);
if (badgeCount) badgeCount.textContent = formatScore(badges);
if (starValue) starValue.textContent = formatScore(score);

bindEvents();
renderHome();
resumeSession();
