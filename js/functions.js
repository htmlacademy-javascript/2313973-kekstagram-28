/* Вопросы:
1. В задании не указано, должна ли я выводить результат в консоль
просто вернуть булевое значение. Поэтому я пока решила
вывести в консоль для наглядности.


*/

// Функция для проверки длины строки
const testingStringOne = 'проверяемая строка';

function checkLength(string, length) {
  if (string.length <= length) {
    console.log('Cтрока проходит по длине');
  } else {
    console.log('Строка не подходит');
  }
}
checkLength(testingStringOne, 10);

// Функция для проверки, является ли строка палиндромом
const testingStringTwo = 'Лёша на полке клопа нашёл';

function checkPalindrome(string) {
  let stringTwo = string.split('').reverse().join('');
  if (string.replaceAll(' ', '').toLowerCase() === stringTwo.replaceAll(' ', '').toLowerCase()) {
    console.log('Это палиндром!');
  } else {
    console.log('Это не палиндром');
  }
}
checkPalindrome(testingStringTwo);


/* Функция, которая превращает все цифры из строки в целые положительные числа
В этом задании я смогла найти способ только с использованием регулярного выражения replace. Как я поняла,
в квардратных скобках после знака ^ идут символы, которые не нужно заменять, потом их еняют на пропуск.
*/

const testingStringThree = '1.34';


function toNumber(string) {
  if (typeof string === 'string') {
    let newNumber = string.replace(/[^1-9]/g,"");
    console.log(parseInt(newNumber, 10));
  } else {
    let newNumber = String(string).replace(/[^1-9]/g,"");
    console.log(parseInt(newNumber, 10));
  }
  }

toNumber(testingStringThree);

//Функция, которая добавляет символы до нужной длины строки

function addLetters (string, minlength, letter) {
  while (string.length < minlength) {
    string = letter.substring(0, minlength - string.length) + string;
  }
  console.log(string)
}

addLetters('1', 4, '0');
