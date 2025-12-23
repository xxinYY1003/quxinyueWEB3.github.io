// ===================== 通用变量 =====================
const loginRegisterPage = document.getElementById('loginRegisterPage');
const shopPage = document.getElementById('shopPage');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
// 商品详情相关变量
const goodsCards = document.querySelectorAll('.goods-card');
const goodsDetailModal = document.getElementById('goodsDetailModal');
const closeDetailModal = document.getElementById('closeDetailModal');
const detailImg = document.getElementById('detailImg');
const detailTitle = document.getElementById('detailTitle');
const detailPrice = document.getElementById('detailPrice');
const detailOriginPrice = document.getElementById('detailOriginPrice');
const detailSales = document.getElementById('detailSales');
const detailDesc = document.getElementById('detailDesc');
// 加入购物车相关变量
const addCartBtn = document.getElementById('addCartBtn');
const cartTipsModal = document.getElementById('cartTipsModal');
const closeTipsModal = document.getElementById('closeTipsModal');

// ===================== 登录/注册标签切换 =====================
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// 切换到登录标签
loginTab.addEventListener('click', () => {
    // 更新标签样式
    loginTab.classList.add('tab-btn-active');
    registerTab.classList.remove('tab-btn-active');
    // 显示登录表单，隐藏注册表单
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    // 重置表单提示
    resetLoginTips();
    resetRegisterTips();
});

// 切换到注册标签
registerTab.addEventListener('click', () => {
    // 更新标签样式
    registerTab.classList.add('tab-btn-active');
    loginTab.classList.remove('tab-btn-active');
    // 显示注册表单，隐藏登录表单
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    // 重置表单提示
    resetLoginTips();
    resetRegisterTips();
});

// ===================== 表单验证相关 =====================
const loginAccount = document.getElementById('loginAccount');
const loginPwd = document.getElementById('loginPwd');
const loginAccountTip = document.getElementById('loginAccountTip');
const loginPwdTip = document.getElementById('loginPwdTip');
const regAccount = document.getElementById('regAccount');
const regPwd = document.getElementById('regPwd');
const regPwdConfirm = document.getElementById('regPwdConfirm');
const regAccountTip = document.getElementById('regAccountTip');
const regPwdTip = document.getElementById('regPwdTip');
const regPwdConfirmTip = document.getElementById('regPwdConfirmTip');

// 重置登录表单提示
function resetLoginTips() {
    loginAccountTip.classList.add('hidden');
    loginPwdTip.classList.add('hidden');
    loginForm.reset();
}

// 重置注册表单提示
function resetRegisterTips() {
    regAccountTip.classList.add('hidden');
    regPwdTip.classList.add('hidden');
    regPwdConfirmTip.classList.add('hidden');
    registerForm.reset();
}

// ===================== 登录/注册提交逻辑 =====================
// 登录表单提交
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const accountVal = loginAccount.value.trim();
    const pwdVal = loginPwd.value.trim();

    // 验证账号
    if (!accountVal) {
        loginAccountTip.classList.remove('hidden');
        isValid = false;
    } else {
        loginAccountTip.classList.add('hidden');
    }

    // 验证密码
    if (!pwdVal || pwdVal.length < 6) {
        loginPwdTip.classList.remove('hidden');
        isValid = false;
    } else {
        loginPwdTip.classList.add('hidden');
    }

    // 验证通过，进入购物页
    if (isValid) {
        localStorage.setItem('jdUser', accountVal);
        enterShopPage(accountVal);
        alert('登录成功，即将进入购物页面！');
    }
});

// 注册表单提交
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const accountVal = regAccount.value.trim();
    const pwdVal = regPwd.value.trim();
    const pwdConfirmVal = regPwdConfirm.value.trim();

    // 验证账号
    if (!accountVal) {
        regAccountTip.classList.remove('hidden');
        isValid = false;
    } else {
        regAccountTip.classList.add('hidden');
    }

    // 验证密码
    if (!pwdVal || pwdVal.length < 6) {
        regPwdTip.classList.remove('hidden');
        isValid = false;
    } else {
        regPwdTip.classList.add('hidden');
    }

    // 验证确认密码
    if (pwdConfirmVal !== pwdVal) {
        regPwdConfirmTip.classList.remove('hidden');
        isValid = false;
    } else {
        regPwdConfirmTip.classList.add('hidden');
    }

    // 验证通过，进入购物页
    if (isValid) {
        localStorage.setItem('jdUser', accountVal);
        enterShopPage(accountVal);
        alert('注册成功，即将进入购物页面！');
    }
});

// ===================== 页面切换逻辑 =====================
// 进入购物页面
function enterShopPage(user) {
    // 隐藏登录注册页，显示购物页
    loginRegisterPage.classList.add('hidden');
    shopPage.classList.remove('hidden');
    // 填充用户名
    userName.textContent = user;
    // 初始化轮播图
    initCarousel();
    // 初始化商品卡片点击事件
    initGoodsCards();
}

// 退出登录，返回登录注册页
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('jdUser');
    // 隐藏购物页，显示登录注册页
    shopPage.classList.add('hidden');
    loginRegisterPage.classList.remove('hidden');
    // 重置登录注册标签为登录状态
    loginTab.click();
    alert('已退出登录！');
});

// 页面加载时判断登录状态
window.addEventListener('load', () => {
    const user = localStorage.getItem('jdUser');
    if (user) {
        // 已有登录态，直接进入购物页
        enterShopPage(user);
    } else {
        // 无登录态，显示登录注册页
        loginRegisterPage.classList.remove('hidden');
        shopPage.classList.add('hidden');
        loginTab.click(); // 默认选中登录标签
    }
});

// ===================== 轮播图功能（仅购物页加载时初始化） =====================
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let carouselTimer = null;

    // 更新轮播图显示
    function updateCarousel(index) {
        // 隐藏所有轮播项，移除所有指示器激活状态
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        // 显示当前轮播项，激活当前指示器
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        // 更新当前索引
        currentIndex = index;
    }

    // 上一张
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel(currentIndex);
        // 重置定时器
        resetCarouselTimer();
    });

    // 下一张
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(currentIndex);
        // 重置定时器
        resetCarouselTimer();
    });

    // 指示器点击
    indicators.forEach((ind, index) => {
        ind.addEventListener('click', () => {
            updateCarousel(index);
            // 重置定时器
            resetCarouselTimer();
        });
    });

    // 自动轮播定时器
    function startCarouselTimer() {
        carouselTimer = setInterval(() => {
            nextBtn.click(); // 自动触发下一张
        }, 3000);
    }

    // 重置定时器
    function resetCarouselTimer() {
        clearInterval(carouselTimer);
        startCarouselTimer();
    }

    // 初始化自动轮播
    startCarouselTimer();

    // 鼠标移入轮播图暂停，移出继续
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselTimer);
    });
    carousel.addEventListener('mouseleave', () => {
        startCarouselTimer();
    });
}

// ===================== 商品详情弹窗功能 =====================
function initGoodsCards() {
    // 为每个商品卡片绑定点击事件
    goodsCards.forEach(card => {
        card.addEventListener('click', () => {
            // 获取商品数据（解析data-goods属性的JSON字符串）
            const goodsData = JSON.parse(card.getAttribute('data-goods'));
            // 填充商品详情
            detailImg.src = goodsData.img;
            detailImg.alt = goodsData.title;
            detailTitle.textContent = goodsData.title;
            detailPrice.textContent = `¥${goodsData.price}`;
            detailOriginPrice.textContent = `¥${goodsData.originPrice}`;
            detailSales.textContent = `已售${goodsData.sales}`;
            detailDesc.textContent = goodsData.desc;
            // 存储当前商品ID（供加入购物车使用，可选）
            addCartBtn.setAttribute('data-goods-id', goodsData.id);
            // 显示详情弹窗
            goodsDetailModal.classList.remove('hidden');
        });
    });

    // 关闭详情弹窗
    closeDetailModal.addEventListener('click', () => {
        goodsDetailModal.classList.add('hidden');
    });

    // 点击弹窗外部关闭（可选优化）
    goodsDetailModal.addEventListener('click', (e) => {
        if (e.target === goodsDetailModal) {
            goodsDetailModal.classList.add('hidden');
        }
    });
}

// ===================== 加入购物车提示功能 =====================
addCartBtn.addEventListener('click', () => {
    // 隐藏商品详情弹窗
    goodsDetailModal.classList.add('hidden');
    // 显示加入购物车成功提示
    cartTipsModal.classList.remove('hidden');
});

// 关闭购物车提示弹窗
closeTipsModal.addEventListener('click', () => {
    cartTipsModal.classList.add('hidden');
});

// 点击提示弹窗外部关闭
cartTipsModal.addEventListener('click', (e) => {
    if (e.target === cartTipsModal) {
        cartTipsModal.classList.add('hidden');
    }
});

// ===================== 秒杀倒计时功能（可选优化，增强体验） =====================
function initSeckillCountdown() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    if (countdownItems.length === 0) return;

    // 模拟倒计时（实际项目可对接后端时间，这里仅前端模拟）
    function updateCountdown() {
        let hours = parseInt(countdownItems[0].textContent);
        let minutes = parseInt(countdownItems[1].textContent);
        let seconds = parseInt(countdownItems[2].textContent);

        // 秒数减1
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                }
            }
        }

        // 补零并更新显示
        countdownItems[0].textContent = hours.toString().padStart(2, '0');
        countdownItems[1].textContent = minutes.toString().padStart(2, '0');
        countdownItems[2].textContent = seconds.toString().padStart(2, '0');
    }

    // 每秒更新一次
    setInterval(updateCountdown, 1000);
}

// 页面加载时初始化秒杀倒计时
window.addEventListener('load', initSeckillCountdown);