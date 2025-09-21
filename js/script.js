document.addEventListener('DOMContentLoaded', function() {

    // -----------------------------------------------------------------
    // LOGIC FOR SLIDER (index.html)
    // -----------------------------------------------------------------
    const swiperElement = document.querySelector('.mySwiper');
    if (swiperElement) {
        const swiper = new Swiper('.mySwiper', {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // -----------------------------------------------------------------
    // LOGIC FOR SERVICES PAGE (services.html)
    // -----------------------------------------------------------------
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const partName = document.getElementById('partName').value;
            const customerName = document.getElementById('customerName').value;
            if (partName.trim() === '' || customerName.trim() === '') {
                alert('الرجاء ملء جميع الحقول المطلوبة.');
                return;
            }
            Toastify({
                text: "تم إرسال طلبك بنجاح!",
                duration: 3000,
                gravity: "top",
                position: "left",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
            const partImageInput = document.getElementById('partImage').files[0];
            const trackingNumber = 'TRK' + Math.floor(Math.random() * 100000);
            document.getElementById('modalPartName').textContent = partName;
            document.getElementById('modalTrackingNumber').textContent = trackingNumber;
            const modalImage = document.getElementById('modalPartImage');
            if (partImageInput) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    modalImage.src = e.target.result;
                }
                reader.readAsDataURL(partImageInput);
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }
            const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
            resultModal.show();
            requestForm.reset();
        });
    }

    const ajaxModalBtn = document.getElementById('ajaxModalBtn');
    if (ajaxModalBtn) {
        ajaxModalBtn.addEventListener('click', function() {
            const ajaxModal = new bootstrap.Modal(document.getElementById('ajaxModal'));
            const modalBody = document.getElementById('ajaxModalBody');
            modalBody.innerHTML = '<p>جاري تحميل البيانات...</p>';
            ajaxModal.show();
            fetch('ajax-content.html')
                .then(response => response.ok ? response.text() : Promise.reject('Failed to load'))
                .then(html => {
                    modalBody.innerHTML = html;
                })
                .catch(error => {
                    modalBody.innerHTML = '<p class="text-danger">عذرًا، حدث خطأ أثناء تحميل البيانات.</p>';
                    console.error('Error fetching Ajax content:', error);
                });
        });
    }

    // -----------------------------------------------------------------
    // LOGIC FOR REGISTER PAGE (register.html)
    // -----------------------------------------------------------------
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password.length < 8) {
                alert('كلمة المرور يجب أن تتكون من 8 أحرف على الأقل.');
                return;
            }
            if (password !== confirmPassword) {
                alert('كلمتا المرور غير متطابقتين.');
                return;
            }
            Toastify({ text: "تم إنشاء حسابك بنجاح!", backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)" }).showToast();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // -----------------------------------------------------------------
    // LOGIC FOR LOGIN PAGE (login.html)
    // -----------------------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const fakeUser = {
            email: '25164193@su.edu.ye',
            password: 'amrkhaled'
        };
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const enteredEmail = document.getElementById('loginEmail').value.trim();
            const enteredPassword = document.getElementById('loginPassword').value.trim();
            if (enteredEmail === fakeUser.email && enteredPassword === fakeUser.password) {
                Toastify({
                    text: "تم تسجيل الدخول بنجاح!",
                    duration: 2000,
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                alert('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
            }
        });
    }
    
    // -----------------------------------------------------------------
    // LOGIC FOR CONTACT PAGE (contact.html)
    // -----------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload
            
            // Show success notification
            Toastify({
                text: "تم إرسال رسالتك بنجاح!",
                duration: 3000,
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
            }).showToast();

            // Reset the form fields
            contactForm.reset();
        });
    }

});