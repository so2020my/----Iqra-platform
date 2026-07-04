
    /* Mobile Menu Logic*/
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navlinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navlinks) {
        mobileMenuBtn.onclick= function(){
            navlinks.classList.toggle('active');
        };
    }

    /*Hero Navigation Logic */
    const heroStartBtn = document.getElementById('hero-start-btn');
    const heroLearnBtn = document.getElementById('hero-learn-btn');

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', function() {
            window.location.href = 'categories.html';
        });
    }

    if (heroLearnBtn) {
        heroLearnBtn.addEventListener('click', function() {
            window.location.href = 'about.html';
        });
    }


    
      /* =========================================================================
       Modal Logic
       ========================================================================= */
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const loginForm = document.getElementById('login-form');
    
    const loginTriggers = [
        document.getElementById('nav-login-btn'),
        document.getElementById('toast-login-btn')
    ];

    const sounds = window.sounds || {
        whoosh: () => {},
        chime: () => {}
    };

    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('hidden');
        }
        sounds.whoosh();
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    }

    loginTriggers.forEach(btn => {
        if (btn) btn.addEventListener('click', openModal);
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Form Submit
    if (loginForm) {

        const nameCheck = loginForm.querySelector('input[type="text"]');
        const passwordCheck = loginForm.querySelector('input[type="password"]');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sounds.chime();
            
            // Change button text to show success temporarily
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            if(nameCheck.value != 'بن حيدرة' || passwordCheck.value != 'mskr2000'){
            submitBtn.innerHTML = 'الرجاء إدخال اسم المستخدم وكلمة المرور الصحيحة!';
            submitBtn.style.backgroundColor = 'var(--color-primary)';      
                return;
            }

            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'تم بنجاح! <i class="fa-solid fa-check"></i>';
            submitBtn.style.backgroundColor = 'var(--color-secondary)';
            
            setTimeout(() => {
                closeModal();
                // Reset form and button
                loginForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                
                // Save login state and update UI
                localStorage.setItem('isLoggedIn', 'true');
                updateLoginState();
            }, 1500);
        });
    }

    /* =========================================================================
       Lightbox Gallery Logic
       ========================================================================= */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Select all images inside .categories-flex
    const galleryImages = document.querySelectorAll('.categories-flex img');
    let currentImageIndex = 0;

    if (lightboxModal && galleryImages.length > 0) {
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentImageIndex = index;
                showLightboxImage(currentImageIndex);
                lightboxModal.classList.add('active');
            });
        });

        function showLightboxImage(index) {
            if (index < 0) {
                currentImageIndex = galleryImages.length - 1;
            } else if (index >= galleryImages.length) {
                currentImageIndex = 0;
            } else {
                currentImageIndex = index;
            }
            lightboxImg.src = galleryImages[currentImageIndex].src;
        }

        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        // Close when clicking outside the image
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });

        lightboxPrev.addEventListener('click', () => {
            showLightboxImage(currentImageIndex - 1);
        });

        lightboxNext.addEventListener('click', () => {
            showLightboxImage(currentImageIndex + 1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightboxModal.classList.remove('active');
            } else if (e.key === 'ArrowRight') {
                showLightboxImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowLeft') {
                showLightboxImage(currentImageIndex + 1);
            }
        });
    }

    /* =========================================================================
       Login System State Logic
       ========================================================================= */
    function updateLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const cards = document.querySelectorAll('.lock');

        // Create alert modal if it doesn't exist
        if (!document.getElementById('lock-alert-modal')) {
            const lockModalHtml = `
                <div id="lock-alert-modal" class="modal-overlay hidden">
                    <div class="modal">
                        <button id="close-lock-alert-btn" class="close-btn play-sound-click"><i class="fa-solid fa-xmark"></i></button>
                        <div class="modal-header">
                            <h2>تنبيه <i class="fa-solid fa-lock"></i></h2>
                            <p>أنت غير مسجل، سجل دخولك أولاً.</p>
                        </div>
                        <button id="lock-alert-login-btn" class="btn btn-primary btn-large btn-block play-sound-click">تسجيل الدخول</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lockModalHtml);
            
            document.getElementById('close-lock-alert-btn').addEventListener('click', () => {
                document.getElementById('lock-alert-modal').classList.add('hidden');
            });
            
            document.getElementById('lock-alert-login-btn').addEventListener('click', () => {
                document.getElementById('lock-alert-modal').classList.add('hidden');
                openModal();
            });
            
            // Close on overlay click
            const lockAlertModal = document.getElementById('lock-alert-modal');
            lockAlertModal.addEventListener('click', (e) => {
                if (e.target === lockAlertModal) lockAlertModal.classList.add('hidden');
            });
        }

        const handleLockedClick = function(e) {
            e.preventDefault();
            document.getElementById('lock-alert-modal').classList.remove('hidden');
        };

        cards.forEach(card => {
            const parentCard = card.closest('.category-card');
            if (parentCard) {
                // Remove previous event listener if any to avoid duplicates
                if (card._lockedClickHandler) {
                    card.removeEventListener('click', card._lockedClickHandler);
                }
                
                if (!isLoggedIn) {
                    parentCard.classList.add('locked-card');
                    card._lockedClickHandler = handleLockedClick;
                    card.addEventListener('click', card._lockedClickHandler);
                } else {
                    parentCard.classList.remove('locked-card');
                }
            }
        });

        // Update login button text and behaviour
        const navLoginBtn = document.getElementById('nav-login-btn');
        if (navLoginBtn) {
            if (isLoggedIn) {
                navLoginBtn.textContent = 'تسجيل الخروج';
                navLoginBtn.removeEventListener('click', openModal);
                navLoginBtn.addEventListener('click', handleLogout);
            } else {
                navLoginBtn.textContent = 'تسجيل الدخول';
                navLoginBtn.removeEventListener('click', handleLogout);
                navLoginBtn.addEventListener('click', openModal);
            }
        }

        const loginToast = document.getElementById('login-toast');
        if (loginToast) {
            loginToast.style.display = isLoggedIn ? 'none' : 'flex';
        }
    }

    function handleLogout() {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    }

    // Initialize state on load
    updateLoginState();