// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.
// Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.
//
// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
//
//     a. Контейнер для отображения текущего изображения.
//     b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
//     c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.
//
// 2. Используйте HTML для создания элементов интерфейса.
//
// 3. Используйте JavaScript для обработки событий:
//
//     a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
//     b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
//     c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.
//
// 4. Слайдер должен циклически переключаться между изображениями,
// то есть после последнего изображения должно отображаться первое, и наоборот.
//
// 5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const dots = document.querySelector(".navigation");

    let currentSlide = 0;

    function updateSlidePosition() {
        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlide ? 'block' : 'none';
        });
        updateDots();
    }

    function updateDots() {
        dots.innerHTML = "";
        slides.forEach((_, index) => {
            let dot = document.createElement("span");
            dot.classList.add("dot");

            if (index === currentSlide) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                currentSlide = index;
                updateSlidePosition();
            });

            dots.appendChild(dot);
        });
    }

    prevButton.addEventListener("click", () => {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        updateSlidePosition();
    });

    nextButton.addEventListener("click", () => {
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        updateSlidePosition();
    });

    updateSlidePosition();
});