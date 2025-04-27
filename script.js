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
     меню = "открыто"
}

function closeMobileMenu() {
    mobileMenu.style.opacity = 0
    mobileMenu.style.visibility = "hidden"
    меню = "закрыто"
}

let меню = "закрыто"
function переключитьМеню(){
    if(меню == "открыто" ){
        closeMobileMenu()
     
    }    
    else {
        showMobileMenu()
       
    }
}

//при клике по грей боксу окно будет закрываться 
sandwich.addEventListener("click", function (e) {
    переключитьМеню()
});

//если мы нажимаем там, где кнопок меню и сэндвича нет - меню закрывается
 
let sandwichImage = document.querySelector(".sandwich")
let sandwichButton = document.querySelector(".sandwich-box")


//при клике по грей боксу окно будет закрываться 
grayBox.addEventListener("click", function (e) {
    e = window.event || e;
    if (this === e.target) {
        closesearch()
    }
});

 let body = document.querySelector("body")

 body.addEventListener("click", function (e) {
    e = window.event || e;
     if (e.target === sandwichButton ||e.target === sandwichImage) {
       // то ничего
    }
    else {
        closeMobileMenu()
      
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


