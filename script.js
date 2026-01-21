// 메인 슬라이더 기능
let currentSlide = 0;
const slides = document.querySelectorAll('.Picture img');
const dots = document.querySelectorAll('.slider-dots .Button');
const prevButton = document.querySelector('.ButtonSVG.prev');
const nextButton = document.querySelector('.ButtonSVG.next');

function showSlide(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    currentSlide = index;
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + dots.length) % dots.length;
        showSlide(currentSlide);
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % dots.length;
        showSlide(currentSlide);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// 자동 슬라이드 (5초마다)
setInterval(() => {
    currentSlide = (currentSlide + 1) % dots.length;
    showSlide(currentSlide);
}, 5000);

// 제품 슬라이더 기능
const scrollContainer = document.querySelector('.scroll-container');
const navPrev = document.querySelector('.swipercarousel.products .nav-button.prev');
const navNext = document.querySelector('.swipercarousel.products .nav-button.next');

if (navPrev && scrollContainer) {
    navPrev.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });
}

if (navNext && scrollContainer) {
    navNext.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });
}

// 위시리스트 버튼 기능
const wishlistButtons = document.querySelectorAll('.wishlistbuttoncollection');

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        button.classList.toggle('active');
        // 실제 위시리스트 추가/제거 로직은 여기에 구현
        console.log('위시리스트 토글');
    });
});

// 빠른보기 버튼 기능
const quickViewButtons = document.querySelectorAll('.ButtonDialog.quick-view');

quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // 빠른보기 모달 열기 로직
        console.log('빠른보기 모달 열기');
    });
});

// 검색 기능
const searchInput = document.querySelector('.Search .Input');
const removeButton = document.querySelector('.RemoveButton');

if (removeButton && searchInput) {
    removeButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // 검색 실행 로직
            console.log('검색:', searchInput.value);
        }
    });
}

// 카테고리 슬라이더 클릭 이벤트
const categoryItems = document.querySelectorAll('.Group-Link');

categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        categoryItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        // 카테고리 필터링 로직
        console.log('카테고리 선택:', item.querySelector('p').textContent);
    });
});

// 스크롤 이벤트 - 헤더 고정
let lastScroll = 0;
const header = document.querySelector('.StickyHeader');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // 아래로 스크롤
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // 위로 스크롤
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// 반응형 네비게이션 (모바일 메뉴)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.Nav');
        if (nav && !document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.classList.add('mobile-menu-toggle');
            toggle.innerHTML = '☰';
            nav.parentElement.insertBefore(toggle, nav);

            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// 이미지 지연 로딩
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

console.log('Dr.Martens 웹사이트 로드 완료');
