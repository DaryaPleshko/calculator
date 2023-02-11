const container = document.querySelector('.container-calc'),
    night = document.querySelector('.night-mode'),
    color = document.querySelector('.container'),
    example = document.querySelector('.example'),
    mainPanel = document.querySelector('.control-panel'),
    arrow = document.querySelector('.arrow'),
    returnInp = document.querySelector('.last-input'),
    dropLastInp = document.querySelector('.clearing-last-input'),
    replace = document.querySelector('.replace'),
    result = document.querySelector('.result'),
    dropInp = document.querySelector('.drop');

let index = false;
night.addEventListener('click', () => {
    if (index) {
        color.style = ` background: linear-gradient(180deg, #319CFF 0%, #6ADBFF 41.46%, rgba(93, 226, 255, 0.47) 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);`;
        mainPanel.style = `background-image: url(../img/mode.svg);`;
        index = false;
    } else {
        color.style = `background: rgba(43, 64, 83, 0.85);
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);`
        mainPanel.style = `background-image: url(C:/Users/Hanna/Desktop/dasha/курсы/repository/calculator/img/night.svg);`;
        index = true;
    }
});

let input = ``,
    lastInp = ``;

container.addEventListener('click', event => {
    const value = event.target.textContent;

    if (/^[\d\(]+$/g.test(value) || /^[\.\%\+\-]+$/g.test(value) && input != '' && !isNaN(input[input.length - 1]) || value === ')' && input.includes('(')) {
        example.innerHTML = `${input += value}`;
    }  //----- числа . % + - ( )

    if (value === '=' && input != '' && input.length > 2) {
        result.innerHTML = eval(input);
        example.innerHTML = `${input += value}`;
    }   //----- =

    if (input != '' && !isNaN(input[input.length - 1]) && (value === "x" || value === "÷")) {
        switch (value) {
            case "x":
                example.innerHTML = `${input += '*'}`;
                break;
            case "÷":
                example.innerHTML = `${input += '/'}`;
                break;
        }
    }   //----- * /

    if (value === "x^2" && input.length >= 1) {
        example.innerHTML = `${input}^2=`;
        result.innerHTML = eval(input ** 2).toFixed(1);
    }   //----- x^2

    if (input != '' && (value === "sin" || value === "cos" || value === "tan" || value === "ln" || value === "log" || value === "e")) {
        switch (value) {
            case "sin":
                example.innerHTML = `sin(${input})=`;
                result.innerHTML = eval((Math.sin(input)).toFixed(4));
                break;
            case "cos":
                example.innerHTML = `cos(${input})=`;
                result.innerHTML = eval((Math.cos(input)).toFixed(4));
                break;
            case "tan":
                example.innerHTML = `tan(${input})=`;
                result.innerHTML = eval((Math.tan(input)).toFixed(4));
                break;
            case "ln":
                example.innerHTML = `ln(${input})=`;
                result.innerHTML = eval((Math.log10(input)).toFixed(4));
                break;
            case "log":
                example.innerHTML = `log(${input})=`;
                result.innerHTML = eval((Math.log2(input)).toFixed(4));
                break;
            case "e":
                example.innerHTML = `e(${input})=`;
                result.innerHTML = eval((Math.exp(input)).toFixed(4));
                break;
        }
    }    //-----sin cos tan ln log e

    if (value === "√" || input.includes("√")) {                             
        if (value === "√") {
            example.innerHTML = `${input += "√"}`;
        } else {
            example.innerHTML = `${input}=`
            result.innerHTML = eval((Math.sqrt(input.split("").slice(1).join("")).toFixed(3)));
        }
    }    //----- √ 

    if (value === "π") {
        example.innerHTML = `π=`;
        result.innerHTML = `3,141592`;
    }    //----- pi

    if (value === "==" || input.includes('==')) {
        if (value === "==") {
            example.innerHTML = `${input += value}`;
        } else {
            let splitValue = input.split('==');
            result.innerHTML = splitValue[0] === splitValue[1] ? "true" : "false"
        }
    }    //----- ==

    if (value === 'x^y' && input.length >= 1 || input.includes("^")) {
        if (value === 'x^y') {
            example.innerHTML = `${input += `^`}`;
        } else {
            let splitValue = input.split('^');
            example.innerHTML = `${input}=`
            result.innerHTML = eval(splitValue[0] ** splitValue[1]).toFixed(2);
        }
    }    //----- x^y
});

//-----панель управления 
arrow.addEventListener('click', () => {      
    let dropLastValue = input.split('');
    dropLastValue.pop();
    let hostValue = eval(dropLastValue.join(''));
    input = '';
    input += hostValue;
    example.innerHTML = input;
    result.innerHTML = '';
});     //-----поднятие результата в пример

dropLastInp.addEventListener(`click`, () => { 
    let splitInput = input.split('');
    splitInput.pop();
    let joinInp = splitInput.join('');
    input = '';
    input += joinInp;
    example.innerHTML = input;
});    //-----удаляет последний элемент

dropInp.addEventListener('click', () => {         
    lastInp = input;
    input = '';
    example.innerHTML = '';
    result.innerHTML = '';
});    //-----удаление всего

returnInp.addEventListener('click', () => {      
    input = lastInp; 
    example.innerHTML = `${lastInp}`;
    let resultEx = input.split('');
    resultEx.pop();
    let joinInp = eval(resultEx.join(''));
    input = '';
    result.innerHTML = `${input += joinInp}`;
});     //----- возвращает предыдущий пример






