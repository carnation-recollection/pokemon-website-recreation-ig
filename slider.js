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
    // alert("начал тянуть")
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
    const maxPosition = cardWidth*2;
    const minPosition = -(cards.length -3 ) * cardWidth;
    
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
    if(mouseActive === true ){
        slider.classList.remove("noTransition");
        mouseActive = false;
        
        // Границы, за которыми нужно выравнивать
        const leftBoundary = cardWidth*2; // Левая граница (стартовая позиция)
        const rightBoundary = -(cards.length - 3) * cardWidth; // Правая граница
        
        // Проверяем, вышли ли мы за границы
        if (sliderPosition > leftBoundary ) {
            // Если вышли за границы - выравниваем
           
            moveSliderTo(leftBoundary) 
        }
        if (sliderPosition < rightBoundary) {
            // Если вышли за границы - выравниваем
           
            moveSliderTo(rightBoundary ) 
        }
        // alert("Закончил тянуть")
        // Иначе оставляем слайдер в текущей позиции (не выравниваем)
    }
   
}
// Добавляем переменную для контроля анимации
let isAnimating = false;

// Модифицируем функции кнопок
function sliderScrollLeft() {
    if (isAnimating || currentCard <= 0){

    }
    else{
        isAnimating = true;
        activateCard(currentCard - 1);
        sliderPosition = -(currentCard - 2) * cardWidth;
        
        slider.classList.remove("noTransition");
        moveSliderTo(sliderPosition);
        
        // Разрешаем следующую анимацию после завершения
        setTimeout(() => {
            isAnimating = false;
        }, 550); // Время должно совпадать с CSS transition
    }
    
   
}

function sliderScrollRight() {
    if (isAnimating || currentCard >= cards.length - 1) {
       
    }
    else{
        isAnimating = true;
        activateCard(currentCard + 1);
        sliderPosition = -(currentCard - 2) * cardWidth;
        
        slider.classList.remove("noTransition");
        moveSliderTo(sliderPosition);
        
        setTimeout(() => {
            isAnimating = false;
        }, 550);
    }
   
}

// Обновляем moveSliderTo для отмены анимации при ручном перетаскивании
function moveSliderTo(pointX) {
    slider.style.transform = `translateX(${pointX}px)`;
    sliderPosition = pointX;
    
    // Если это не программная анимация, сбрасываем флаг
    if (!mouseActive && !isAnimating) {
        isAnimating = false;
    }
}

// Добавляем обработчики событий
if (slider) {
    slider.addEventListener('mousedown', swipeStart);
    document.addEventListener('mousemove', swipeAction);

    document.addEventListener('mouseup', swipeEnd);
    
    // Обработка выхода мыши за пределы окна
    document.addEventListener('mouseleave', swipeEnd);
}