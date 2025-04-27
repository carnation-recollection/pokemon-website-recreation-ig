const container = document.querySelector(".mainbox");
const cards = document.querySelectorAll(".pokemoncard");
const sliderWrap = document.querySelector(".pokesliderwrap");
const gap = parseInt(getComputedStyle(sliderWrap).gap) || 0;

const inactiveWidth = 250;  // Ширина неактивной карточки
const activeWidth = 360;   // Ширина активной карточки
const screenWidth = container.clientWidth;

// Проверяем, поместится ли вторая карточка (активная) при активации
const secondCardFits = (inactiveWidth + gap + activeWidth) <= screenWidth;

let currentCard = -1


if (!secondCardFits) {
    // Если не помещается - активируем первую карточку
    cards[0].classList.add("shown");
    currentCard = 1;
} else {
    // Иначе активируем центральную карточку
    const cardsInHalfScreen = Math.floor(screenWidth / 2 / (inactiveWidth + gap));
    currentCard = Math.min(cardsInHalfScreen + 1, cards.length);
    cards[currentCard - 1].classList.add("shown");
}

console.log("Активная карточка:", currentCard);



// проматывает слайдер влево
function sliderScrollLeft() {

    if (currentCard == 1) {
        //sliderScrollLeft() doesn't work 
    }
    else {
        //sliderScrollLeft works
        currentCard = currentCard - 1

        setCardActive(currentCard)
        var slider = document.querySelector(".pokesliderwrap")
        console.log(slider)

        sliderPosition = sliderPosition + 253
        let scrolledPx = sliderPosition
        slider.style.transform = `translatex(${scrolledPx}px)`
    }
}

// проматывает слайдер вправо
function sliderScrollRight() {

    if (currentCard == 7) {
    }
    else {
        currentCard = currentCard + 1
        var slider = document.querySelector(".pokesliderwrap")
        console.log(slider)
        setCardActive(currentCard)
        sliderPosition = sliderPosition - 253
        let scrolledPx = sliderPosition
        slider.style.transform = `translatex(${scrolledPx}px)`
    }

}

//clearShown убирает класс shown с карточек
function clearShown() {
    var cards = document.querySelectorAll(".pokemoncard")
    console.log(cards)
    // цикл перебирает карточки
    cards.forEach((card) => {
        card.classList.remove("shown")
    })
}

//setCardActive(0) // долив
function setCardActive(cardnumber) {
    clearShown()
    //let cardnumber = 3
    var cards = document.querySelectorAll(".pokemoncard")
    console.log(cards[cardnumber - 1])

    let конкретнаяКарточка = cards[cardnumber - 1]
    конкретнаяКарточка.classList.add("shown")
}



/* Механика движения слайдера с помощью мышки НАЧАЛО */
/* Механика движения слайдера с помощью мышки НАЧАЛО */


// позиция слайдера
let sliderPosition = 0

// точка в которой кликнули мышкой на слайдер
let clickStartPoint = 0

// mouseactive - состояние мыши, зажата/не зажата
// mouseactive = false - мышь не зажата (начальное состояние)
let mouseActive = false

// наш слайдер
const slider = document.querySelector(".pokesliderwrap")

// какая была позиция слайдера когда я ткнул мышкой
let savedPosition = 0

function swipeStart(событие) {
    // запоминаем где начали тянуть слайдер (его сдвиг)
    savedPosition = sliderPosition
    // убираем transition когда начали дергать слайдер
    slider.classList.add("noTransition")
    // получить координаты где мы зажали мышку
    clickStartPoint = событие.clientX
    console.log("start point = ", clickStartPoint);
    // состояние мыши - зажата
    mouseActive = true
}

// фывфыв

let растояниеКонца = 0
let растояниеСтарта = 0

function swipeAction(событие) {
    // тут мы вычисляем куда двигать слайдер, в зависимости от всего другого
    let currentPoint = событие.clientX

    // обработка движений мышки
    if (mouseActive == true) {

        let кудаМотаем = "хз"
        if (currentPoint - clickStartPoint > 0) {
            кудаМотаем = "в лево"
        }
        else {
            кудаМотаем = "в право"
        }

        console.log(кудаМотаем)



        if (sliderPosition >= 430 && кудаМотаем == "в лево") {

            let shift = (currentPoint - clickStartPoint) + savedPosition
            console.log("Сдвиг = ", currentPoint - clickStartPoint)
            console.log("Текущая точка = ", currentPoint)
            //if()
            let test = 430 + (currentPoint - clickStartPoint) / 4
            console.log("Ставлю на позицию", test)
            moveSliderTo(test)

            // РАЗОБРАТЬСЯ ЧТО ТУТ ДЕЛИТЬ НА 10 ЧТОБ МЕДЛЕННО ДВИГАЛОСЬ 

            // let shift = (currentPoint - clickStartPoint) + savedPosition
            // console.log("Сдвиг = ", currentPoint - clickStartPoint)
            // // двигаем слайдер
            // moveSliderTo(shift)

            // let changePoint = карточка * (currentCard - 3)

            // // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // // то переключаем карточку на следующую
            // if (-карточка * (currentCard - 2) < sliderPosition) {
            // }
            // else {
            //     currentCard = currentCard + 1
            //     setCardActive(currentCard)
            // }

            // // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // // то переключаем карточку на предыдущую
            // if (-карточка * (currentCard - 3) < sliderPosition) {
            //     currentCard = currentCard - 1
            //     setCardActive(currentCard)
            // }
            // else {
            // }



        }

        else {

            //растояниеСтарта

            let shift = currentPoint - clickStartPoint + savedPosition
            //console.log("Сдвиг (норма) = ", currentPoint - clickStartPoint)
            console.log("Слайдер-позиция = ", shift)
            // двигаем слайдер
            moveSliderTo(shift)

            let changePoint = карточка * (currentCard - 3)

            // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // то переключаем карточку на следующую
            if (-карточка * (currentCard - 2) < sliderPosition) {
            }
            else {
                currentCard = currentCard + 1
                setCardActive(currentCard)
            }

            // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // то переключаем карточку на предыдущую
            if (-карточка * (currentCard - 3) < sliderPosition) {
                currentCard = currentCard - 1
                setCardActive(currentCard)
            }
            else {
            }

        }




    }
    else {

    }
}

function swipeEnd() {
    if (sliderPosition > 430) {
        moveSliderTo(430)
    }
    // при отпускании мыши
    console.log("Конец")
    // добавляем обратно transition 
    slider.classList.remove("noTransition")
    // состояние мыши - не зажата
    mouseActive = false
}

function moveSliderTo(pointX) {
    // передвигаем слайдер
    slider.style.transform = `translatex(${pointX}px)`
    // запомнили позицию слайдера
    sliderPosition = pointX
}



/* Механика движения слайдера с помощью мышки КОНЕЦ */
/* Механика движения слайдера с помощью мышки КОНЕЦ */
let sliderBlock = document.querySelector(".pokesliderwrap")

//slider ne pokazan na stranice 
if (sliderBlock == null) {
    // nichego
}
else {

    // прекращаем прокрутку слайдера когда мышка покидает страницу
    addEvent(document, "mouseout", function (e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            // stop your drag event here
            // for now we can just use an alert
            swipeEnd()
        }
    });

}

function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}