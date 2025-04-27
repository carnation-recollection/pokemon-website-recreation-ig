const container = document.querySelector(".mainbox");
const cards = document.querySelectorAll(".pokemoncard");
const sliderWrap = document.querySelector(".pokesliderwrap");
const gap = parseInt(getComputedStyle(sliderWrap).gap) || 0;

const inactiveWidth = 250;  // Ширина неактивной карточки
const activeWidth = 360;   // Ширина активной карточки
const screenWidth = container.clientWidth;

// Проверяем, поместится ли вторая карточка (активная) при активации
const secondCardFits = (inactiveWidth + gap + activeWidth) <= screenWidth;

let currentCard = -1;
let sliderPosition = 0;
const cardWidth = inactiveWidth + gap; // Ширина карточки с учетом отступа

if (!secondCardFits) {
    // Если не помещается - активируем первую карточку
    activateCard(0);
} else {
    // Иначе активируем центральную карточку
    const cardsInHalfScreen = Math.floor(screenWidth / 2 / cardWidth);
    activateCard(Math.min(cardsInHalfScreen, cards.length - 1));
}

// Функции для кнопок тоже нужно адаптировать:
function sliderScrollLeft() {
    if (currentCard > 0) {
        activateCard(currentCard - 1);
        // Смещаем слайдер с учетом -2
        sliderPosition = -(currentCard - 2) * cardWidth;
        moveSliderTo(sliderPosition);
    }
}

function sliderScrollRight() {
    if (currentCard < cards.length - 1) {
        activateCard(currentCard + 1);
        // Смещаем слайдер с учетом -2
        sliderPosition = -(currentCard - 2) * cardWidth;
        moveSliderTo(sliderPosition);
    }
}

// Убирает класс shown со всех карточек
function clearShown() {
    cards.forEach((card) => {
        card.classList.remove("shown");
    });
}

// Активирует указанную карточку
function activateCard(cardIndex) {
    clearShown();
    cards[cardIndex].classList.add("shown");
    currentCard = cardIndex;
}

// Обновляет позицию слайдера в соответствии с активной карточкой
function updateSliderPosition() {
    const targetPosition = -(currentCard -2) * cardWidth;
    sliderPosition = Math.max(Math.min(targetPosition, 0), -(cards.length - 1) * cardWidth);
    moveSliderTo(sliderPosition);
}

/* Механика движения слайдера с помощью мышки */
let clickStartPoint = 0;
let mouseActive = false;
let savedPosition = 0;
const slider = document.querySelector(".pokesliderwrap");

function swipeStart(event) {
    savedPosition = sliderPosition;
    slider.classList.add("noTransition");
    clickStartPoint = event.clientX;
    mouseActive = true;
}

function swipeAction(event) {
    if (!mouseActive) return;
    
    const currentPoint = event.clientX;
    const shift = currentPoint - clickStartPoint + savedPosition;
    
    // Ограничиваем движение за пределы слайдера
    const maxPosition = 0;
    const minPosition = -(cards.length - 1) * cardWidth;
    
    if (shift > maxPosition) {
        // Эффект "оттягивания" при достижении левого края
        moveSliderTo(maxPosition + (shift - maxPosition) / 4);
    } else if (shift < minPosition) {
        // Эффект "оттягивания" при достижении правого края
        moveSliderTo(minPosition + (shift - minPosition) / 4);
    } else {
        moveSliderTo(shift);
        
        // Автоматическое переключение карточек при перетаскивании
        const newCard = Math.round(-sliderPosition / cardWidth) +2;
        if (newCard !== currentCard && newCard >= 0 && newCard < cards.length) {
            activateCard(newCard);
        }
    }
}

function swipeEnd() {
    slider.classList.remove("noTransition");
    mouseActive = false;
    
    // Выравниваем положение после отпускания мыши
    const targetCard = Math.round(-sliderPosition / cardWidth) + 2;
    activateCard( Math.max(0, Math.min(targetCard, cards.length - 1)) );
    updateSliderPosition();
}

function moveSliderTo(pointX) {
    slider.style.transform = `translateX(${pointX}px)`;
    sliderPosition = pointX;
}

// Добавляем обработчики событий
if (slider) {
    slider.addEventListener('mousedown', swipeStart);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('mouseup', swipeEnd);
    
    // Обработка выхода мыши за пределы окна
    document.addEventListener('mouseleave', swipeEnd);
}