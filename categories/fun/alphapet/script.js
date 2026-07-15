const letters = [
  { id: 'alif', letter: 'أ', pronunciation: 'هذا هو حرف الألف', shapes: ['أ', 'ـأ', 'أـ', 'ـأـ'], images: ['🛋️', '🪓', '⚓'], words: ['أَرِيكَة', 'فَأْس', 'مَرْفَأ'] },

{ id: 'ba', letter: 'ب', pronunciation: 'هذا هو حرف الباء', shapes: ['ب', 'ـب', 'بـ', 'ـبـ'], images: ['🚪', '⛰️', '🥤'], words: ['بَاب', 'جَبَل', 'كُوب'] },

{ id: 'ta', letter: 'ت', pronunciation: 'هذا هو حرف التاء', shapes: ['ت', 'ـت', 'تـ', 'ـتـ'], images: ['👑', '📚', '🏠'], words: ['تَاج', 'كِتَاب', 'بَيْت'] },

{ id: 'tha', letter: 'ث', pronunciation: 'هذا هو حرف الثاء', shapes: ['ث', 'ـث', 'ثـ', 'ـثـ'], images: ['🧊', '📐', '🔎'], words: ['ثَلْج', 'مُثَلَّث', 'بحث'] },

{ id: 'jeem', letter: 'ج', pronunciation: 'هذا هو حرف الجيم', shapes: ['ج', 'ـج', 'جـ', 'ـجـ'], images: ['🔔', '🚲', '🗼'], words: ['جَرَسٌ', 'دَرَّاجَة', 'بُرْج'] },

{ id: 'ha', letter: 'ح', pronunciation: 'هذا هو حرف الحاء', shapes: ['ح', 'ـح', 'حـ', 'ـحـ'], images: ['🎒', '🌊', '🔑'], words: ['حَقِيبَة', 'بحر', 'مِفْتَاح'] },

{ id: 'kha', letter: 'خ', pronunciation: 'هذا هو حرف الخاء', shapes: ['خ', 'ـخ', 'خـ', 'ـخـ'], images: ['🍞', '🌴', '🍉'], words: ['خُبْز', 'نَخْلَة', 'بَطِّيخ'] },

{ id: 'dal', letter: 'د', pronunciation: 'هذا هو حرف الدال', shapes: ['د', 'ـد', 'دـ', 'ـدـ'], images: ['🚲', '🎁', '❄️'], words: ['دراجة', 'هَدِيَّة', 'برد'] },

{ id: 'thal', letter: 'ذ', pronunciation: 'هذا هو حرف الذال', shapes: ['ذ', 'ـذ', 'ذـ', 'ـذـ'], images: ['🌽', '👞', '💦'], words: ['ذرة', 'حِذَاء', 'رَذَاذ'] },

{ id: 'ra', letter: 'ر', pronunciation: 'هذا هو حرف الراء', shapes: ['ر', 'ـر', 'رـ', 'ـرـ'], images: ['📻', '⚽', '🌙'], words: ['رَادْيُو', 'كُرَة', 'قَمَر'] },

{ id: 'zay', letter: 'ز', pronunciation: 'هذا هو حرف الزاي', shapes: ['ز', 'ـز', 'زـ', 'ـزـ'], images: ['🌸', '⚖️', '📺'], words: ['زهرة', 'مِيزَان', 'تِلْفَاز'] },

{ id: 'seen', letter: 'س', pronunciation: 'هذا هو حرف السين', shapes: ['س', 'ـس', 'سـ', 'ـسـ'], images: ['🚗', '🕌', '☀️'], words: ['سَيَّارَة', 'مسجد', 'شَمْس'] },

{ id: 'sheen', letter: 'ش', pronunciation: 'هذا هو حرف الشين', shapes: ['ش', 'ـش', 'شـ', 'ـشـ'], images: ['🕯️', '🖌️', '🚿'], words: ['شَمْعَة', 'فُرْشاة', 'دُش'] },

{ id: 'sad', letter: 'ص', pronunciation: 'هذا هو حرف الصاد', shapes: ['ص', 'ـص', 'صـ', 'ـصـ'], images: ['🚀', '🏰', '✂️'], words: ['صَارُوخ', 'قَصْر', 'مِقَصّ'] },

{ id: 'dad', letter: 'ض', pronunciation: 'هذا هو حرف الضاد', shapes: ['ض', 'ـض', 'ضـ', 'ـضـ'], images: ['💡', '🏓', '🌍'], words: ['ضَوْء', 'مِضْرَب', 'أَرْض'] },

{ id: 'taa', letter: 'ط', pronunciation: 'هذا هو حرف الطاء', shapes: ['ط', 'ـط', 'طـ', 'ـطـ'], images: ['✈️', '🚂', '🧵'], words: ['طَائِرَة', 'قِطَار', 'خَيْط'] },

{ id: 'zaa', letter: 'ظ', pronunciation: 'هذا هو حرف الظاء', shapes: ['ظ', 'ـظ', 'ظـ', 'ـظـ'], images: ['✉️', '☂️', '📖'], words: ['ظَرْف', 'مِظَلَّة', 'حَفِظ'] },

{ id: 'ain', letter: 'ع', pronunciation: 'هذا هو حرف العين', shapes: ['ع', 'ـع', 'عـ', 'ـعـ'], images: ['🍇', '🥄', '🛡️'], words: ['عنب', 'مِلْعَقَة', 'درع'] },

{ id: 'ghain', letter: 'غ', pronunciation: 'هذا هو حرف الغين', shapes: ['غ', 'ـغ', 'غـ', 'ـغـ'], images: ['☁️', '🧲', '🧠'], words: ['غُيُوم', 'مِغْنَاطِيس', 'دِماغ'] },

{ id: 'fa', letter: 'ف', pronunciation: 'هذا هو حرف الفاء', shapes: ['ف', 'ـف', 'فـ', 'ـفـ'], images: ['👗', '🚢', '🗡️'], words: ['فُسْتَان', 'سَفِينَة', 'سَيْف'] },

{ id: 'qaf', letter: 'ق', pronunciation: 'هذا هو حرف القاف', shapes: ['ق', 'ـق', 'قـ', 'ـقـ'], images: ['🖊️', '🔒', '🍽️'], words: ['قَلَم', 'قُفْل', 'طَبَق'] },

{ id: 'kaf', letter: 'ك', pronunciation: 'هذا هو حرف الكاف', shapes: ['ك', 'ـك', 'كـ', 'ـكـ'], images: ['📚', '🧹', '🕸️'], words: ['كِتَاب', 'مِكْنَسَة', 'شَبَك'] },

{ id: 'lam', letter: 'ل', pronunciation: 'هذا هو حرف اللام', shapes: ['ل', 'ـل', 'لـ', 'ـلـ'], images: ['🖼️', '📺', '⛰️'], words: ['لَوْحَة', 'تِلْفَاز', 'جَبَل'] },

{ id: 'meem', letter: 'م', pronunciation: 'هذا هو حرف الميم', shapes: ['م', 'ـم', 'مـ', 'ـمـ'], images: ['🍌', '🌙', '💍'], words: ['مَوْز', 'قَمَر', 'خَاتَم'] },

{ id: 'noon', letter: 'ن', pronunciation: 'هذا هو حرف النون', shapes: ['ن', 'ـن', 'نـ', 'ـنـ'], images: ['⭐', '🍆', '⚖️'], words: ['نَجْمَة', 'باذنجان', 'مِيزَان'] },

{ id: 'ha2', letter: 'هـ', pronunciation: 'هذا هو حرف الهاء', shapes: ['هـ', 'ـهـ', 'هـ', 'ـهـ'], images: ['🎁', '🏹', '⏰'], words: ['هدية', 'سَهْم', 'مُنَبِّه'] },

{ id: 'wow', letter: 'و', pronunciation: 'هذا هو حرف الواو', shapes: ['و', 'ـو', 'وـ', 'ـوـ'], images: ['🌹', '🧦', '🍫'], words: ['وَرْدَة', 'جَوْرَب', 'كاكاو'] },

{ id: 'ya', letter: 'ي', pronunciation: 'هذا هو حرف الياء', shapes: ['ي', 'ـي', 'يـ', 'ـيـ'], images: ['💎', '🚗', '🪑'], words: ['يَاقُوت', 'سَيَّارَة', 'كُرْسِيّ'] }
];

let currentLetterIndex = 0;
let stars = 0;
let badges = 0;
let score = 0;
let completedLetters = [];
let currentRound = 0;
let pendingStageChallenge = false;
let currentStageActivity = 0;
let stageProgress = 0;
let currentStageLetters = [];
let stageChallengeRound = 0;
let stageChallengeMaxRounds = 0;
let stageChallengeMode = '';

const homeScreen = document.getElementById('homeScreen');
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
const guideScreen = document.getElementById('guideScreen');

const learnTitle = document.getElementById('learnTitle');
const learnLetter = document.getElementById('learnLetter');
const shapeRow = document.getElementById('shapeRow');
const imageGrid = document.getElementById('imageGrid');
const challengeArena = document.getElementById('challengeArena');
const challengeTitle = document.getElementById('challengeTitle');
const challengeInstruction = document.getElementById('challengeInstruction');
const scoreRow = document.querySelector('.score-row');
const starValue = document.getElementById('starValue');
const finishTitle = document.getElementById('finishTitle');
const finishScore = document.getElementById('finishScore');
const finishMedal = document.getElementById('finishMedal');
const stageActivityList = document.getElementById('stageActivityList');

function renderHome() {
  starCount.textContent = stars;
  badgeCount.textContent = badges;
  const progress = Math.round((completedLetters.length / letters.length) * 100);
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}%`;
  if (completedLetters.length === letters.length) {
    completionText.textContent = 'لقد أكملت رحلتك التعليمية! شارك نتيجتك (الصفحة الرئيسية) مع معلمتك فقد تكون من أبطال اللعبة الفائزين بالجائزة.';
  } else {
    completionText.textContent = `تم إكمال ${completedLetters.length} من ${letters.length} حرفًا`;
  }

  stageList.innerHTML = '';
  letters.forEach((letter, index) => {
    const isCompleted = completedLetters.includes(letter.id);
    const isUnlocked = index === 0 || completedLetters.includes(letters[index - 1].id);
    const chip = document.createElement('button');
    chip.type = 'button';

    if (isCompleted) {
      chip.className = 'stage-chip completed';
      chip.innerHTML = `<span>مرحلة ${index + 1}: ${letter.letter}</span><span>✅</span>`;
      chip.style.opacity = '0.6';
      chip.style.backgroundColor = '#e0e0e0';
      chip.style.cursor = 'not-allowed';
    } else {
      chip.className = `stage-chip ${isUnlocked ? 'unlocked' : 'locked'}`;
      chip.innerHTML = `<span>مرحلة ${index + 1}: ${letter.letter}</span><span>${isUnlocked ? '▶' : '🔒'}</span>`;
      chip.onclick = () => {
        if (!isUnlocked) return;
        currentLetterIndex = index;
        score = 0;
        starValue.textContent = '0';
        renderLearn();
        showScreen('learn');
      };
    }
    stageList.appendChild(chip);

    if (index % 4 === 3) {
      const groupIndex = Math.floor(index / 4);
      const isChallengeUnlocked = completedLetters.includes(letter.id);

      const chalChip = document.createElement('button');
      chalChip.type = 'button';
      chalChip.className = `stage-chip ${isChallengeUnlocked ? 'unlocked' : 'locked'}`;
      chalChip.style.background = 'linear-gradient(90deg, #ffe0b2, #ffb74d)';
      chalChip.style.borderColor = '#fb8c00';
      chalChip.style.fontWeight = 'bold';
      chalChip.innerHTML = `<span>مرحلة التحدي: ${letters[groupIndex * 4].letter} - ${letter.letter}</span><span>${isChallengeUnlocked ? '🏆' : '🔒'}</span>`;

      chalChip.onclick = () => {
        if (!isChallengeUnlocked) return;
        const recentLetters = letters.slice(groupIndex * 4, groupIndex * 4 + 4);
        renderStageActivities(recentLetters);
        showScreen('stage');
      };
      stageList.appendChild(chalChip);
    }
  });
}

function renderLearn() {
  const letter = letters[currentLetterIndex];
  learnTitle.textContent = `حرف ${letter.letter}`;
  learnLetter.textContent = letter.letter;
  shapeRow.innerHTML = '';
  letter.shapes.forEach((shape) => {
    const pill = document.createElement('div');
    pill.className = 'shape-pill';
    pill.textContent = shape;
    shapeRow.appendChild(pill);
  });
  imageGrid.innerHTML = '';
  const positions = ['أول الكلمة', 'وسط الكلمة', 'آخر الكلمة'];
  letter.images.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '0.5rem';

    const label = document.createElement('span');
    label.textContent = positions[index];
    label.style.fontSize = '0.9rem';
    label.style.color = 'var(--ink)';
    label.style.fontWeight = 'bold';

    const box = document.createElement('button');
    box.type = 'button';
    box.className = 'image-item';
    box.style.width = '100%';
    box.textContent = item;
    box.onclick = () => speak(letter.words[index]);

    wrapper.appendChild(label);
    wrapper.appendChild(box);
    imageGrid.appendChild(wrapper);
  });
}

function startChallenge() {
  score = 0;
  currentRound = 0;
  starValue.textContent = '0';
  showScreen('challenge');
  showChallengeRound();
}

function showChallengeRound() {
  const letter = letters[currentLetterIndex];
  if (currentRound === 0) {
    challengeTitle.textContent = 'اصطد الحرف';
    challengeInstruction.textContent = `اختر الحرف ${letter.letter} (اصطد 4 بالونات)`;
    renderBalloonChallenge();
  } else if (currentRound >= 1 && currentRound <= 3) {
    challengeTitle.textContent = 'اختر الصورة';
    const positions = ['في أول الكلمة', 'في وسط الكلمة', 'في آخر الكلمة'];
    challengeInstruction.textContent = `اختر الصورة التي تحتوي الحرف ${positions[currentRound - 1]}`;
    renderImageChallenge(currentRound - 1);
  } else if (currentRound >= 4 && currentRound <= 6) {
    challengeTitle.textContent = 'اختر الكلمة';
    const positions = ['في أول الكلمة', 'في وسط الكلمة', 'في آخر الكلمة'];
    challengeInstruction.textContent = `اختر الكلمة التي تحتوي الحرف ${positions[currentRound - 4]}`;
    renderWordChallenge(currentRound - 4);
  }
}

let poppedBalloons = 0;

function renderBalloonChallenge() {
 
  poppedBalloons = 0;
  const letter = letters[currentLetterIndex];
  const correctCount = 4;
  const wrongCount = 10;
  const wrongLetters = letters.filter((item) => item.letter !== letter.letter).map((item) => item.letter);

  const balloons = Array.from({ length: correctCount }, () => ({ val: letter.letter, isCorrect: true })).concat(
    Array.from({ length: wrongCount }, () => ({ val: wrongLetters[Math.floor(Math.random() * wrongLetters.length)], isCorrect: false }))
  );

  const shuffled = balloons.sort(() => Math.random() - 0.5);
  challengeArena.innerHTML = '<div class="balloons"></div>';
  const arena = challengeArena.querySelector('.balloons');

  shuffled.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'balloon';
    btn.style.left = `${5 + Math.random() * 75}%`;
    btn.style.animationDelay = `${Math.random() * 6}s`;
    btn.style.animationDuration = `${5 + Math.random() * 3}s`;
    btn.textContent = item.val;

    btn.onclick = () => {
      if (btn.dataset.answered) return;
      if (item.isCorrect) {
        btn.dataset.answered = 'true';
        poppedBalloons += 1;
        score = Math.min(10, score + 1);
        starValue.textContent = score.toString();
        btn.style.display = 'none';
        burstCelebration(btn);
        speak(['أَحْسَنْتْ', 'رائع', 'ممتاز'][Math.floor(Math.random() * 3)]);

        challengeInstruction.textContent = `اختر الحرف ${letter.letter} (تبقى ${correctCount - poppedBalloons})`;

        if (poppedBalloons >= correctCount) {
          setTimeout(() => {
            currentRound += 1;
            showChallengeRound();
          }, 800);
        }
      } else {
        score = Math.max(0, score - 1);
        starValue.textContent = score.toString();
        btn.classList.add('wrong');
        speak('حاوِلْ مرة أخرى');
        setTimeout(() => btn.classList.remove('wrong'), 300);
      }
    };
    arena.appendChild(btn);
  });
}

function renderImageChallenge(positionIndex = 0) {
  if (scoreRow) scoreRow.style.display = 'flex';
  const letter = letters[currentLetterIndex];
  const options = [
    { label: letter.images[positionIndex], value: true },
    { label: letters[(currentLetterIndex + 1) % letters.length].images[positionIndex], value: false },
    { label: letters[(currentLetterIndex + 2) % letters.length].images[positionIndex], value: false },
    { label: letters[(currentLetterIndex + 3) % letters.length].images[positionIndex], value: false },
  ].sort(() => Math.random() - 0.5);
  challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena.querySelector('.option-grid');
  options.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = item.label;
    btn.onclick = () => handleAnswer(item.value, btn);
    grid.appendChild(btn);
  });
}

function renderWordChallenge(positionIndex = 0) {
  if (scoreRow) scoreRow.style.display = 'flex';
  const letter = letters[currentLetterIndex];
  const options = [
    { label: letter.words[positionIndex], value: true },
    { label: letters[(currentLetterIndex + 1) % letters.length].words[positionIndex], value: false },
    { label: letters[(currentLetterIndex + 2) % letters.length].words[positionIndex], value: false },
    { label: letters[(currentLetterIndex + 3) % letters.length].words[positionIndex], value: false },
  ].sort(() => Math.random() - 0.5);
  challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena.querySelector('.option-grid');
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
    score = Math.min(10, score + 1);
    starValue.textContent = score.toString();
    target.classList.add('success');
    burstCelebration(target);
    speak(['أَحْسَنْتْ', 'رائع', 'ممتاز'][Math.floor(Math.random() * 3)]);
    setTimeout(() => {
      currentRound += 1;
      if (currentRound >= 7) {
        finishStage();
      } else {
        showChallengeRound();
      }
    }, 800);
  } else {
    score = Math.max(0, score - 1);
    starValue.textContent = score.toString();
    target.classList.add('wrong');
    speak('حاوِلْ مرة أخرى');
    setTimeout(() => target.classList.remove('wrong'), 300);
  }
}

function finishStage() {
  const letter = letters[currentLetterIndex];
  completedLetters = [...new Set([...completedLetters, letter.id])];
  if (score === 10) {
    badges += 1;
  }
  stars += score;
  const medal = score === 10 ? '🥇 وسام ذهبي' : '';
  finishTitle.textContent = `أحسنت يا بطل لقد أنهيت حرف ${letter.letter}`;
  finishScore.textContent = `${Math.min(score, 10)} / 10 ⭐`;
  finishMedal.textContent = medal;
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

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function renderStageActivities(recentLetters) {
  if (!recentLetters) {
    recentLetters = letters.slice(Math.max(0, completedLetters.length - 4), completedLetters.length);
  }
  stageActivityList.innerHTML = '';
  const activities = [
    { title: 'المرحلة الأولى: اصطد الحروف', text: 'اصطد الحروف الصحيحة من المجموعة' },
    { title: 'المرحلة الثانية: اختر الصورة', text: 'اختر الصورة التي تبدأ بحرف مختلف في كل جولة' },
    { title: 'المرحلة الثالثة: اختر الكلمة', text: 'اختر الكلمة التي تبدأ بالحرف الصحيح' },
  ];
  activities.forEach((activity, index) => {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.innerHTML = `<strong>${activity.title}</strong><p>${activity.text}</p>`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'activity-btn';
    button.textContent = 'ابدأ';
    button.onclick = () => startStageActivity(index, recentLetters);
    card.appendChild(button);
    stageActivityList.appendChild(card);
  });
}

function renderStageLetterBalloonChallenge(stageLetters) {
  if (scoreRow) scoreRow.style.display = 'none';
  currentStageLetters = stageLetters.slice(0, 4);
  const letterNames = currentStageLetters.map((item) => item.letter).join(' ');
  challengeTitle.textContent = 'اصطد الحروف';
  challengeInstruction.textContent = `اصطد الحروف ${letterNames}`;
  const wrongLetters = letters
    .filter((item) => !currentStageLetters.some((letter) => letter.letter === item.letter))
    .map((item) => item.letter);
  const balloons = [
    ...currentStageLetters.map((item) => ({ val: item.letter, isCorrect: true })),
    ...Array.from({ length: 10 }, () => ({ val: wrongLetters[Math.floor(Math.random() * wrongLetters.length)], isCorrect: false })),
  ];
  const shuffled = shuffleArray(balloons);
  stageProgress = 0;
  challengeArena.innerHTML = '<div class="balloons"></div>';
  const arena = challengeArena.querySelector('.balloons');
  shuffled.forEach((item) => {
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
        speak(['أَحْسَنْتْ', 'رائع', 'ممتاز'][Math.floor(Math.random() * 3)]);
        if (stageProgress >= currentStageLetters.length) {
          setTimeout(() => {
            speak('مَرْحباً بالمرحلة التالية');
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

function renderStageImageChallengeRound() {
  if (scoreRow) scoreRow.style.display = 'none';
  if (stageChallengeRound >= stageChallengeMaxRounds) {
    speak('انتهت المرحلة الثانية');
    showScreen('stage');
    return;
  }
  const targetLetter = currentStageLetters[stageChallengeRound % currentStageLetters.length];
  const positionIndex = Math.floor(Math.random() * 3);
  const positionLabels = ['تبدأ', 'في وسطها', 'في آخرها'];
  challengeTitle.textContent = 'اختر الصورة المناسبة';
  challengeInstruction.textContent = `جولة ${stageChallengeRound + 1} من ${stageChallengeMaxRounds}: اختر الصورة التي ${positionLabels[positionIndex]} بحرف ${targetLetter.letter}`;
  const wrongLetters = shuffleArray(letters.filter((item) => item.id !== targetLetter.id));
  const options = shuffleArray([
    { label: targetLetter.images[positionIndex], value: true },
    { label: wrongLetters[0].images[positionIndex], value: false },
    { label: wrongLetters[1].images[positionIndex], value: false },
    { label: wrongLetters[2].images[positionIndex], value: false },
  ]);
  challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena.querySelector('.option-grid');
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
        speak(['أَحْسَنْتْ', 'رائع', 'ممتاز'][Math.floor(Math.random() * 3)]);
        stageChallengeRound += 1;
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

function renderStageWordChallengeRound() {
  if (scoreRow) scoreRow.style.display = 'none';
  if (stageChallengeRound >= stageChallengeMaxRounds) {
    speak('انتهت المرحلة الثالثة');
    showScreen('stage');
    return;
  }
  const targetLetter = currentStageLetters[stageChallengeRound % currentStageLetters.length];
  const positionIndex = Math.floor(Math.random() * 3);
  const positionLabels = ['تبدأ', 'في وسطها', 'في آخرها'];
  challengeTitle.textContent = 'اختر الكلمة المناسبة';
  challengeInstruction.textContent = `جولة ${stageChallengeRound + 1} من ${stageChallengeMaxRounds}: اختر الكلمة التي ${positionLabels[positionIndex]} بحرف ${targetLetter.letter}`;
  const wrongLetters = shuffleArray(letters.filter((item) => item.id !== targetLetter.id));
  const options = shuffleArray([
    { label: targetLetter.words[positionIndex], value: true },
    { label: wrongLetters[0].words[positionIndex], value: false },
    { label: wrongLetters[1].words[positionIndex], value: false },
    { label: wrongLetters[2].words[positionIndex], value: false },
  ]);
  challengeArena.innerHTML = '<div class="option-grid"></div>';
  const grid = challengeArena.querySelector('.option-grid');
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
        speak(['أَحْسَنْتْ', 'رائع', 'ممتاز'][Math.floor(Math.random() * 3)]);
        stageChallengeRound += 1;
        setTimeout(renderStageWordChallengeRound, 800);
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

function startStageActivity(index, recentLetters) {
  currentStageActivity = index;
  currentStageLetters = recentLetters.slice(0, 4);
  if (currentStageLetters.length === 0) {
    currentStageLetters = letters.slice(0, 4);
  }
  stageProgress = 0;
  if (index === 0) {
    renderStageLetterBalloonChallenge(currentStageLetters);
    return;
  }
  if (index === 1) {
    stageChallengeMode = 'image';
    stageChallengeRound = 0;
    stageChallengeMaxRounds = 10;
    currentStageLetters = shuffleArray(currentStageLetters);
    renderStageImageChallengeRound();
    return;
  }
  stageChallengeMode = 'word';
  stageChallengeRound = 0;
  stageChallengeMaxRounds = 10;
  currentStageLetters = shuffleArray(currentStageLetters);
  renderStageWordChallengeRound();
}

function showScreen(screenName) {
  [homeScreen, stageSelectScreen, learnScreen, guideScreen, challengeScreen, stageChallengeScreen, finishScreen].forEach((screen) => {
    if (screen) screen.classList.remove('active');
  });
  if (screenName === 'home') homeScreen.classList.add('active');
  if (screenName === 'stageSelect') stageSelectScreen.classList.add('active');
  if (screenName === 'learn') learnScreen.classList.add('active');
  if (screenName === 'guide') guideScreen.classList.add('active');
  if (screenName === 'challenge') challengeScreen.classList.add('active');
  if (screenName === 'stage') stageChallengeScreen.classList.add('active');
  if (screenName === 'finish') finishScreen.classList.add('active');
}

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}

function bindEvents() {
  document.getElementById('startBtn').onclick = () => {
    const firstUncompleted = letters.findIndex(l => !completedLetters.includes(l.id));
    currentLetterIndex = firstUncompleted === -1 ? 0 : firstUncompleted;
    score = 0;
    starValue.textContent = '0';
    renderLearn();
    showScreen('learn');
  };
  document.getElementById('stageBtn').onclick = () => {
    renderHome();
    showScreen('stageSelect');
  };
  const backStageSelectBtn = document.getElementById('backStageSelectBtn');
  if (backStageSelectBtn) {
    backStageSelectBtn.onclick = () => showScreen('home');
  }
  const backStageChallengeBtn = document.getElementById('backStageChallengeBtn');
  if (backStageChallengeBtn) {
    backStageChallengeBtn.onclick = () => showScreen('stageSelect');
  }
  document.getElementById('settingsBtn').onclick = () => showScreen('guide');
  const backGuideBtn = document.getElementById('backGuideBtn');
  if (backGuideBtn) {
    backGuideBtn.onclick = () => showScreen('home');
  }
  document.getElementById('backHomeBtn').onclick = () => showScreen('stageSelect');
  document.getElementById('speakBtn').onclick = () => {
    const letter = letters[currentLetterIndex];
    speak(letter.pronunciation);
  };
  document.getElementById('challengeBtn').onclick = startChallenge;
  document.getElementById('finishBtn').onclick = () => {
    showScreen('stageSelect');
  };
}

bindEvents();
renderHome();
showScreen('home');
