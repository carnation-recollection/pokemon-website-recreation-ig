const половинаЭкрана = document.querySelector(".mainbox").clientWidth * 0.5
const карточка = document.querySelector(".pokemoncard").clientWidth + window.getComputedStyle(document.querySelector(".pokesliderwrap"), null).getPropertyValue("gap").slice(0, -2)/2

// номер активной карточки 
let currentСard = 1

if (половинаЭкрана * 2 > 500) {

    let точка = 0
    let шаг = 0

    for (i = 0; i < 7; i++) {
        точка = точка + карточка
        if (половинаЭкрана - точка >= 0) {
            шаг = i
        }
        else {
            break;
        }

    }

    console.log("номер активной карты = ", шаг + 2)
    document.querySelectorAll(".pokemoncard")[шаг + 1].classList.add("shown")
    currentСard= шаг + 2
}
else {
    document.querySelectorAll(".pokemoncard")[0].classList.add("shown")
}
