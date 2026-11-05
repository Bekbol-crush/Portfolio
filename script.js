// 1. Мобильное меню
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", function () {
    const menuIsOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", menuIsOpen);
    menuButton.textContent = menuIsOpen ? "×" : "☰";
});

// Закрываем меню после выбора раздела
navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    });
});

// 2. Переключение светлой и тёмной темы
const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    const darkThemeIsOn =
        document.body.classList.contains("dark-theme");

    themeButton.textContent = darkThemeIsOn ? "☀" : "☾";
});

// 3. Фильтр учебных работ
const filterButtons = document.querySelectorAll(".filter-button");
const workCards = document.querySelectorAll(".work-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        workCards.forEach(function (card) {
            const cardCategory = card.dataset.category;

            const shouldShow =
                selectedCategory === "all" ||
                selectedCategory === cardCategory;

            card.classList.toggle("hidden", !shouldShow);
        });
    });
});

// 4. Проверка контактной формы
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Пожалуйста, заполните все поля.";
        formMessage.style.color = "#b3261e";
        return;
    }

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Введите корректный email.";
        formMessage.style.color = "#b3261e";
        return;
    }

    formMessage.textContent = "Форма заполнена правильно!";
    formMessage.style.color = "green";

    contactForm.reset();
});

// 5. Модальное окно с описанием учебной работы
const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".project-image").forEach(function (button) {
    button.addEventListener("click", function () {
        modalTitle.textContent = button.dataset.title;
        modalDescription.textContent = button.dataset.description;

        projectModal.showModal();
    });
});

modalClose.addEventListener("click", function () {
    projectModal.close();
});

// Закрытие окна при нажатии на затемнённый фон
projectModal.addEventListener("click", function (event) {
    if (event.target === projectModal) {
        projectModal.close();
    }
});