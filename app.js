
let winningNumber;
let minNumber;
let maxNumber;

const selectMin = document.getElementById('select-min');
const selectMax = document.getElementById('select-max');
const guessBtn = document.getElementById('guess-btn');
const submitSelect = document.querySelector('.submit-selection');
const instruction = document.querySelector('.instruction');
const message = document.querySelector('.message');
const guessNumber = document.getElementById('guess-number');
const restartBtn = document.getElementById('restart');

//initialise the guess btn to disabled until min and max have been selected
document.getElementById('guess-btn').disabled = true; 


submitSelect.addEventListener('click', function() {
     //set min and max value to Int
     minNumber =parseInt(selectMin.value);
     maxNumber = parseInt(selectMax.value);
    console.log(minNumber);
    console.log(maxNumber);
    //set the message
    if(selectMin.value == '' || selectMax.value == '' || minNumber > maxNumber) {
        // document.getElementById('submit').disabled = false;  
       alert('Enter a valid min and max number')

    }else if(confirm('are you sure?') == true) {
        console.log('hello??')
        instruction.style.color = 'purple';
        instruction.innerText = `Guess a number between ${selectMin.value} and ${selectMax.value}`;
       //unblock the disabled on the guess btn
        document.getElementById('guess-btn').disabled = false;
        //disable submit btn
        submitSelect.disabled = true;
        selectMin.disabled = true;
        selectMax.disabled = true;

        //set the value of winning number
    winningNumber = initialiseWinningNumber(minNumber, maxNumber);
    console.log(selectMin.value);
    console.log(selectMax.value);
    console.log('----------------')
    console.log(winningNumber);

    }else{
        
        console.log('pressed cancel');
    }

    

    //disable submitSelect btn, otherwise min, max and winning number could be changed
    // submitSelect.disabled = true;
      
})

// function to call confirm - proceed with the game
// function begin() {
//     if(confirm('Are you sure?') == true) {
//         console.log('hello');
//         const created = document.createElement('h5');
//         created.className = 'created';
//         created.innerText = 'confirmed';
//         document.body.appendChild(created);

//     }
// }

function initialiseWinningNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

guessBtn.addEventListener('click', function() {
    
    console.log(parseInt(guessNumber.value));
    if(parseInt(guessNumber.value) === winningNumber) {
        message.style.color = 'green';
        message.innerText = `congratulations!! winning number is ${winningNumber}`;
        guessNumber.style.borderColor = 'green';
    }
    else{
        guessNumber.value = '';
        guessNumber.style.borderColor = 'red';
    }


    
})

restartBtn.addEventListener('click', function restart() {
    location.reload();
});

// if(selectMin.value == '' || selectMax.value == ''){
//     document.getElementById('guess-btn').disabled = true;
//     document.getElementById('number').disabled = true;
// }else {
//     document.getElementById('guess-btn').disabled = false;
//     document.getElementById('number').disabled = false;
// }






