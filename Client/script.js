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

const exerciseItems = document.querySelectorAll('.exercise')

exerciseItems.forEach(item => {
    item.addEventListener('click', (e) => {
        let selectedExercise = e.target
        if(selectedExercise.style.backgroundColor === 'rgb(76, 168, 43)') {
            selectedExercise.style.backgroundColor = 'rgb(116, 156, 255)'
        } else {
            selectedExercise.style.backgroundColor = 'rgb(76, 168, 43)'
        }
    });
});

