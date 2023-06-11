// USER LOGIN AND CREATE ACCOUNT PAGE

$('#loginButton').click(function userLogin() {
    $('.user-login-page').css('display', 'none')
    $('.calendar-page').css('display', 'flex')
    $('#hamburger').css('display', 'block')
})

$('#createAccountButton').click(function goToCreateAccount() {
    $('.user-login-page').css('display', 'none')
    $('.create-account-page').css('display', 'flex')
})

$('#backArrow1').click(function goBackToLogin() {
    $('.create-account-page').css('display', 'none')
    $('.user-login-page').css('display', 'flex')
})

// HAMBURGER MENU
    const menuButton = document.querySelector('#hamburger')
    const menuContainer = document.querySelector('.menu-container')

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('is-active')
        menuContainer.classList.toggle('is-active')
    })

// CALENDAR PAGE

const dayContainers = document.querySelectorAll('.day-label')

dayContainers.forEach(day => {
    day.addEventListener('click', (e) => showExercises(e))
})

function showExercises(e) {
    let selectedDay = $(e.currentTarget)
    let dayName = selectedDay.text()

    switch(dayName) {
        case 'Monday':
            if($('.exercises-monday').css('display') === 'block') {
                $('.exercises-monday').css('display', 'none')
            } else {
                $('.exercises-monday').css('display', 'block')
            }
            break
        case 'Tuesday':
            if($('.exercises-tuesday').css('display') === 'block') {
                $('.exercises-tuesday').css('display', 'none')
            } else {
                $('.exercises-tuesday').css('display', 'block')
            }            break
        case 'Wednesday':
            if($('.exercises-wednesday').css('display') === 'block') {
                $('.exercises-wednesday').css('display', 'none')
            } else {
                $('.exercises-wednesday').css('display', 'block')
            }            break
        case 'Thursday':
            if($('.exercises-thursday').css('display') === 'block') {
                $('.exercises-thursday').css('display', 'none')
            } else {
                $('.exercises-thursday').css('display', 'block')
            }            break
        case 'Friday':
            if($('.exercises-friday').css('display') === 'block') {
                $('.exercises-friday').css('display', 'none')
            } else {
                $('.exercises-friday').css('display', 'block')
            }            break
        case 'Saturday':
            if($('.exercises-saturday').css('display') === 'block') {
                $('.exercises-saturday').css('display', 'none')
            } else {
                $('.exercises-saturday').css('display', 'block')
            }            break
        case 'Sunday':
            if($('.exercises-sunday').css('display') === 'block') {
                $('.exercises-sunday').css('display', 'none')
            } else {
                $('.exercises-sunday').css('display', 'block')
            }            break
        default:
            break
    } 
}

const completedButtons = document.querySelectorAll('.fa-square-check')
const exerciseItems = document.querySelectorAll('.exercise')
const uncheckButtons = document.querySelectorAll('.fa-square-xmark')
const checkButton = document.querySelector('.fa-square-check')

$(uncheckButtons).hide()

let selectedExerciseCheck;
let selectedExerciseUncheck
let selectedExercise;

completedButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        selectedExerciseCheck = e.target
        selectedExercise = e.target.closest('div')
        selectedExerciseUncheck = uncheckButtons[index]
        $(selectedExercise).data('check-button', selectedExerciseCheck)
        completeExercise()
    })
})

function completeExercise() {
    $(selectedExercise).css('background-color', 'rgb(76, 168, 43)')
    $(selectedExerciseCheck).hide()
    $(selectedExerciseUncheck).show().on('click', (e) => {
        selectedExercise = $(e.target).closest('div')
        selectedExerciseCheck = $(selectedExercise).data('check-button')
        selectedExerciseUncheck = $(e.target)
        $(selectedExercise).css('background-color', 'rgb(116, 156, 255)')
        $(selectedExerciseUncheck).hide()
        $(selectedExerciseCheck).show()
    })
}

// EXERCISES GROUPS PAGE

