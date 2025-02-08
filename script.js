// console.log("hello world")
// // alert("123123")
// // prompt("Как тебя зовут?")
// let myName = "dima"
// console.log("Меня зовут " + myName)
// myName = "Vasya"
// console.log("Меня зовут " + myName)
// let myAge = 134
// console.log("My age " + myAge)
// console.log((myAge - 5) / 3)
// myAge = myAge - 100
// console.log(myAge)


// console.log("весь экран ",половинаЭкрана*2)
// console.log("половина ",половинаЭкрана)
// console.log(числа)
// let миниум = Math.min(...числа)
// console.log("минимум ",миниум)



// переменная с большим невидимым окном с поиском
let grayBox = document.querySelector(".graybackground")

// функция открывает окно с поиском
function showsearch() {
    grayBox.style.opacity = 1
    grayBox.style.visibility = "visible"
}

// фукнция закрывает окно с поиском
function closesearch() {
    grayBox.style.opacity = 0
    grayBox.style.visibility = "hidden"
}


let mobileMenu = document.querySelector(".mobileMenu")
let sandwich = document.querySelector(".sandwich-box")

function showMobileMenu() {
    mobileMenu.style.opacity = 1
    mobileMenu.style.visibility = "visible"
}

function closeMobileMenu() {
    mobileMenu.style.opacity = 0
    mobileMenu.style.visibility = "hidden"
}

let меню = "закрыто"
function переключитьМеню(){
    if(меню == "открыто" ){
        closeMobileMenu()
        меню = "закрыто"
    }    
    else {
        showMobileMenu()
        меню = "открыто"
    }
}

//при клике по грей боксу окно будет закрываться 
sandwich.addEventListener("click", function (e) {
    переключитьМеню()
});


//при клике по грей боксу окно будет закрываться 
grayBox.addEventListener("click", function (e) {
    e = window.event || e;
    if (this === e.target) {
        closesearch()
    }
});

function showpokemon() {

    // собираем информацию необходимую в расчетах 
    const firstInvisiblePokemon = document.querySelector(".pokehidden")
    const отступПоследнегоВидимогоПокемона = offset(firstInvisiblePokemon).top
    const текущийСкролПозиция = window.scrollY;
    const screenHeight = window.screen.height
    const pokemonHeight = firstInvisiblePokemon.previousElementSibling.clientHeight
    const видимПиселейПоследнегоПокемонаНаЭкране = screenHeight - отступПоследнегоВидимогоПокемона + текущийСкролПозиция - 134
    const сколькоНадоМотать = pokemonHeight - видимПиселейПоследнегоПокемонаНаЭкране + 70

    // Вывожу всякую информацию
    console.log("последний видимый покемон: ", отступПоследнегоВидимогоПокемона)
    console.log("Мы сейчас на ", текущийСкролПозиция, "пикселе от верха");
    console.log("Высота всего окна", screenHeight);
    console.log("Высона покемона", pokemonHeight);
    console.log("Видим пикселей последнего покемона", видимПиселейПоследнегоПокемонаНаЭкране);
    console.log("Промотай на", сколькоНадоМотать);

    // если нужно промотать на отрицательное число (вверх) -- то не мотаем
    if (сколькоНадоМотать < 0) {
        //ничего
    }
    else {
        //прокручиваем страницу
        scrollPage(сколькоНадоМотать)
    }

    // проявляет покемона
    firstInvisiblePokemon.classList.remove("pokehidden")

}

// скроллит вниз страницу на scroll пикселей
function scrollPage(scroll) {
    window.scrollBy({
        top: scroll,
        behavior: 'smooth'
    });
}

// вычисляет отступ элемента от верха страницы
function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}




// проматывает слайдер влево
function sliderScrollLeft() {

    if (currentСard == 1) {
        //sliderScrollLeft() doesn't work 
    }
    else {
        //sliderScrollLeft works
        currentСard = currentСard - 1

        setCardActive(currentСard)
        var slider = document.querySelector(".pokesliderwrap")
        console.log(slider)

        sliderPosition = sliderPosition + 253
        let scrolledPx = sliderPosition
        slider.style.transform = `translatex(${scrolledPx}px)`
    }
}

// проматывает слайдер вправо
function sliderScrollRight() {

    if (currentСard == 7) {
    }
    else {
        currentСard = currentСard + 1
        var slider = document.querySelector(".pokesliderwrap")
        console.log(slider)
        setCardActive(currentСard)
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

            // let changePoint = карточка * (currentСard - 3)

            // // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // // то переключаем карточку на следующую
            // if (-карточка * (currentСard - 2) < sliderPosition) {
            // }
            // else {
            //     currentСard = currentСard + 1
            //     setCardActive(currentСard)
            // }

            // // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // // то переключаем карточку на предыдущую
            // if (-карточка * (currentСard - 3) < sliderPosition) {
            //     currentСard = currentСard - 1
            //     setCardActive(currentСard)
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

            let changePoint = карточка * (currentСard - 3)

            // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // то переключаем карточку на следующую
            if (-карточка * (currentСard - 2) < sliderPosition) {
            }
            else {
                currentСard = currentСard + 1
                setCardActive(currentСard)
            }

            // если мы мотали и дошли до точек -250, -500, -750 ..... и тд
            // то переключаем карточку на предыдущую
            if (-карточка * (currentСard - 3) < sliderPosition) {
                currentСard = currentСard - 1
                setCardActive(currentСard)
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


function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}

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