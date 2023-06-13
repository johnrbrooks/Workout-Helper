// USER LOGIN AND CREATE ACCOUNT PAGE

$('#createAccountButton').click(function goToCreateAccount() {
    $('.user-login-page').css('display', 'none')
    $('.create-account-page').css('display', 'flex')
    $('#createAccountForm')[0].reset()
})

$('#backArrow1').click(function goBackToLogin() {
    $('.create-account-page').css('display', 'none')
    $('.user-login-page').css('display', 'flex')
})

//LOG IN
let currentUser;
let user;
let userPassword;

const loginButton = document.querySelector('#loginButton')
const userUsernameInput = document.querySelector('#userUsernameInput')
const userPasswordInput = document.querySelector('#userPasswordInput')

loginButton.addEventListener('click', checkLoginForm)

function checkLoginForm() {
    user = userUsernameInput.value
    password = userPasswordInput.value
    if((user !== '' && user !== 'undefined') && (password !== '' && password !== 'undefined')) {
        validateUserLogin(user, password)
    } else {
        alert('Please input your user information')
    }
}

async function validateUserLogin(user, password) {
    const userLoginRequest = user
    const passwordLoginRequest = password
    try{
        const checkLoginInfo = await axios.get(`http://localhost:3001/users/login/${userLoginRequest}-${passwordLoginRequest}`)
        if(checkLoginInfo) {
            console.log('Login Sucessful!')
            currentUser = checkLoginInfo
            console.log(currentUser)
            $('.user-login-page').css('display', 'none')
            $('.calendar-page').css('display', 'flex')
            $('#hamburger').css('display', 'block')
        } else {
            alert('Wrong Username or Password')
        }
    } catch (error) {
        if(error.response && error.response.status === 500) {
            alert('Incorrect password, try again.')
        }
    } finally {
        $('#loginForm')[0].reset()
    }
}

//CREATE ACCOUNT

const createAccountButton = document.querySelector('#createAccount')
const newNameInput = document.querySelector('#newNameInput')
const newUsernameInput = document.querySelector('#newUsernameInput')
const newPasswordInput = document.querySelector('#newPasswordInput')

let newName;
let newUsername;
let newPassword;

createAccountButton.addEventListener('click', () => {
    newName = newNameInput.value
    newUsername = newUsernameInput.value.toLowerCase()
    newPassword = newPasswordInput.value
    if((newName !== '' && newName !== 'undefined') && (newUsername !== '' && newUsername !== 'undefined') && (newPassword !== '' && newPassword !== 'undefined')) {
        createNewUser(newName, newUsername, newPassword)
    } else {
        alert('Please fill out the form')
    }
})

function createNewUser(newName, newUsername, newPassword) {
    let newUser = {
        name: `${newName}`,
        username: `${newUsername}`,
        password: `${newPassword}`,
        pref_exercises: []
    }
    validateNewUser(newUser)
}

async function validateNewUser(newUser) {
    const usernameRequest = newUser.username
    const checkUsername = await axios.get(`http://localhost:3001/users/${usernameRequest}`)
    if(checkUsername.data.length === 0) {
        addNewUser(newUser)
    } else {
        alert('This username is already taken')
    }
}

async function addNewUser(newUser) {
    postNewUserToDB = await axios.post('http://localhost:3001/users/createuser', newUser)
    $('.create-account-page').css('display', 'none')
    $('.user-login-page').css('display', 'flex')
}

// SELECT DAY MODAL

$('.day-select-modal').hide()
$('.exercise-info-modal').hide()

// HAMBURGER MENU
    const menuButton = document.querySelector('#hamburger')
    const menuContainer = document.querySelector('.menu-container')

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('is-active')
        menuContainer.classList.toggle('is-active')
    })

    const calendarButton = document.querySelector('#Calendar')
    const exercisesButton = document.querySelector('#Exercises')
    const logOutButton = document.querySelector('#Log-Out')
    const userLoginPage = document.querySelector('.user-login-page')
    const createAccountPage = document.querySelector('.create-account-page')
    const calendarPage = document.querySelector('.calendar-page')
    const exerciseGroupsPage = document.querySelector('.exercises-group-page')
    const exercisesDisplayPage = document.querySelector('.exercises-display-page')

    calendarButton.addEventListener('click', () => {
        menuButton.classList.remove('is-active')
        menuContainer.classList.remove('is-active')
        userLoginPage.style.display = 'none'
        createAccountPage.style.display = 'none'
        exerciseGroupsPage.style.display = 'none'
        exercisesDisplayPage.style.display = 'none'
        calendarPage.style.display = 'flex'
    })

    exercisesButton.addEventListener('click', () => {
        menuButton.classList.remove('is-active')
        menuContainer.classList.remove('is-active')
        userLoginPage.style.display = 'none'
        createAccountPage.style.display = 'none'
        exercisesDisplayPage.style.display = 'none'
        calendarPage.style.display = 'none'
        exerciseGroupsPage.style.display = 'flex'
    })

    logOutButton.addEventListener('click', () => {
        menuButton.classList.remove('is-active')
        menuContainer.classList.remove('is-active')
        createAccountPage.style.display = 'none'
        exercisesDisplayPage.style.display = 'none'
        calendarPage.style.display = 'none'
        exerciseGroupsPage.style.display = 'none'
        userLoginPage.style.display = 'flex'
        currentUser = null
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
const uncheckButtons = document.querySelectorAll('.fa-xmark')
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

const muscleGroupButtons = document.querySelectorAll('.muscle-group')

let selectedMuscle;

muscleGroupButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedMuscle = e.target.id
        console.log(selectedMuscle)
        switch(selectedMuscle) {
            case 'chest':
                clearMainPages()
                showChest()
                break
            case 'arms':
                clearMainPages()
                showArms()
                break
            case 'shoulders':
                clearMainPages()
                showShoulders()
                break
            case 'back':
                clearMainPages()
                showBack()
                break
            case 'legs':
                clearMainPages()
                showLegs()
                break
            case 'abs':
                clearMainPages()
                showAbs()
                break
            default:
                break
        }
    })
})

// EXERCISE DISPLAY PAGES

let url = 'https://localhost:3001'

function clearMainPages() {
    createAccountPage.style.display = 'none'
    exercisesDisplayPage.style.display = 'none'
    calendarPage.style.display = 'none'
    exerciseGroupsPage.style.display = 'none'
    userLoginPage.style.display = 'none'
    exercisesDisplayPage.style.display = 'flex'
}

const chestContainer = document.querySelector('.chest-container')
const armsContainer = document.querySelector('.arms-container')
const shouldersContainer = document.querySelector('.shoulders-container')
const backContainer = document.querySelector('.back-container')
const legsContainer = document.querySelector('.legs-container')
const absContainer = document.querySelector('.abs-container')

let clickedExercise;

async function showChest() {
    [armsContainer, shouldersContainer, backContainer, legsContainer, absContainer].forEach(container => container.style.display = 'none');
    chestContainer.style.display = 'flex'
    const getChestExercises = await axios.get('http://localhost:3001/exercises/chest')

    $('.day-select-modal').hide()

    let dataArray = getChestExercises.data

    dataArray.forEach((exercise, index) => {
        //create exercise div
        const chestExercise = document.createElement('div')
        chestContainer.appendChild(chestExercise)
        chestExercise.classList.add('exerciseDiv')
        //create content div
        const chestExerciseContent = document.createElement('div')
        chestExercise.appendChild(chestExerciseContent)
        chestExerciseContent.classList.add('exercise-content')
        //create image div
        const chestExerciseImages = document.createElement('div')
        chestExercise.appendChild(chestExerciseImages)
        chestExerciseImages.classList.add('exercise-images')
        //create name title
        const exerciseName = document.createElement('h2')
        chestExerciseContent.appendChild(exerciseName)
        exerciseName.classList.add('exercise-name')
        exerciseName.innerText = `${exercise.name}`
        //create instructions link
        const instructionLink = document.createElement('p')
        chestExerciseContent.appendChild(instructionLink)
        instructionLink.classList.add('instruction-link')
        instructionLink.innerText = 'Click for details'
        //create exercise image
        const exerciseImage = document.createElement('img')
        chestExerciseImages.appendChild(exerciseImage)
        exerciseImage.classList.add('exercise-image')
        exerciseImage.src = `${exercise.image}`
        //add to calendar button
        const addToCalendarButton = document.createElement('button')
        chestExercise.appendChild(addToCalendarButton)
        addToCalendarButton.classList.add('add-to-calendar-button')
        addToCalendarButton.innerText = 'Add To Calendar'
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            $('.day-select-modal').show()
            $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
        })
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`http://localhost:3001/exercises/${identifier}`)

            let exerciseData = getExerciseData.data

            const instructionsList = document.querySelector('.instructions')

            function removeListItems() {
                if(instructionsList) {
                    while(instructionsList.firstChild) {
                        instructionsList.removeChild(instructionsList.firstChild)
                    }
                }
            }

            removeListItems()

            $('.exercise-info-modal').show()

            let instructionsCount = exerciseData[0].instructions.length

            for(let i = 0; i < instructionsCount; i++) {
                const instructionItem = document.createElement('li')
                instructionsList.appendChild(instructionItem)
                instructionItem.classList.add('instruction-list-item')
            }

            const instructionItems = document.querySelectorAll('.instruction-list-item')

            instructionItems.forEach((item, index) => {
                item.innerText = `${exerciseData[0].instructions[index]}`
            })

            $('.modal-exercise-title').text(`${exerciseData[0].name}`)
            $('.demo-image').attr('src', `${exerciseData[0].image}`)
            $('.reps').text(`Suggested Reps: ${exerciseData[0].reps}`)
            $('.equipment-info').text(`Equipment required? ${exerciseData[0].equipment}`)
            $('.primary-muscle').text(`Primary Muscle Group: ${exerciseData[0].primary_muscle_id}`)
            $('.secondary-muscle').text(`Secondary Muscle Group: ${exerciseData[0].secondary_muscle_id}`)
            $('.muscle-group-image').attr('src', `${exerciseData[0].muscle_image}`)
            $('.modal-close-button').click(() => {
                $('.exercise-info-modal').hide()
            })
        })
    })
}

async function showArms() {
    [chestContainer, shouldersContainer, backContainer, legsContainer, absContainer].forEach(container => container.style.display = 'none');
    armsContainer.style.display = 'flex'

    const getArmExercises = await axios.get('http://localhost:3001/exercises/arms')

    $('.day-select-modal').hide()

    let dataArray = getArmExercises.data

    dataArray.forEach((exercise, index) => {
        //create exercise div
        const armExercise = document.createElement('div')
        armsContainer.appendChild(armExercise)
        armExercise.classList.add('exerciseDiv')
        //create content div
        const armExerciseContent = document.createElement('div')
        armExercise.appendChild(armExerciseContent)
        armExerciseContent.classList.add('exercise-content')
        //create image div
        const armExerciseImages = document.createElement('div')
        armExercise.appendChild(armExerciseImages)
        armExerciseImages.classList.add('exercise-images')
        //create name title
        const exerciseName = document.createElement('h2')
        armExerciseContent.appendChild(exerciseName)
        exerciseName.classList.add('exercise-name')
        exerciseName.innerText = `${exercise.name}`
        //create instructions link
        const instructionLink = document.createElement('p')
        armExerciseContent.appendChild(instructionLink)
        instructionLink.classList.add('instruction-link')
        instructionLink.innerText = 'Click for details'
        //create exercise image
        const exerciseImage = document.createElement('img')
        armExerciseImages.appendChild(exerciseImage)
        exerciseImage.classList.add('exercise-image')
        exerciseImage.src = `${exercise.image}`
        //add to calendar button
        const addToCalendarButton = document.createElement('button')
        armExercise.appendChild(addToCalendarButton)
        addToCalendarButton.classList.add('add-to-calendar-button')
        addToCalendarButton.innerText = 'Add To Calendar'
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            $('.day-select-modal').show()
            $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
        }) 
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`http://localhost:3001/exercises/${identifier}`)

            let exerciseData = getExerciseData.data

            const instructionsList = document.querySelector('.instructions')

            function removeListItems() {
                if(instructionsList) {
                    while(instructionsList.firstChild) {
                        instructionsList.removeChild(instructionsList.firstChild)
                    }
                }
            }

            removeListItems()

            $('.exercise-info-modal').show()

            let instructionsCount = exerciseData[0].instructions.length

            for(let i = 0; i < instructionsCount; i++) {
                const instructionItem = document.createElement('li')
                instructionsList.appendChild(instructionItem)
                instructionItem.classList.add('instruction-list-item')
            }

            const instructionItems = document.querySelectorAll('.instruction-list-item')

            instructionItems.forEach((item, index) => {
                item.innerText = `${exerciseData[0].instructions[index]}`
            })

            $('.modal-exercise-title').text(`${exerciseData[0].name}`)
            $('.demo-image').attr('src', `${exerciseData[0].image}`)
            $('.reps').text(`Suggested Reps: ${exerciseData[0].reps}`)
            $('.equipment-info').text(`Equipment required? ${exerciseData[0].equipment}`)
            $('.primary-muscle').text(`Primary Muscle Group: ${exerciseData[0].primary_muscle_id}`)
            $('.secondary-muscle').text(`Secondary Muscle Group: ${exerciseData[0].secondary_muscle_id}`)
            $('.muscle-group-image').attr('src', `${exerciseData[0].muscle_image}`)
            $('.modal-close-button').click(() => {
                $('.exercise-info-modal').hide()
            })
        })   
    })
}

async function showShoulders() {
    [armsContainer, chestContainer, backContainer, legsContainer, absContainer].forEach(container => container.style.display = 'none');
    shouldersContainer.style.display = 'flex'

    const getShoulderExercises = await axios.get('http://localhost:3001/exercises/shoulders')

    $('.day-select-modal').hide()

    let dataArray = getShoulderExercises.data

    dataArray.forEach((exercise, index) => {
        //create exercise div
        const shoulderExercise = document.createElement('div')
        shouldersContainer.appendChild(shoulderExercise)
        shoulderExercise.classList.add('exerciseDiv')
        //create content div
        const shoulderExerciseContent = document.createElement('div')
        shoulderExercise.appendChild(shoulderExerciseContent)
        shoulderExerciseContent.classList.add('exercise-content')
        //create image div
        const shoulderExerciseImages = document.createElement('div')
        shoulderExercise.appendChild(shoulderExerciseImages)
        shoulderExerciseImages.classList.add('exercise-images')
        //create name title
        const exerciseName = document.createElement('h2')
        shoulderExerciseContent.appendChild(exerciseName)
        exerciseName.classList.add('exercise-name')
        exerciseName.innerText = `${exercise.name}`
        //create instructions link
        const instructionLink = document.createElement('p')
        shoulderExerciseContent.appendChild(instructionLink)
        instructionLink.classList.add('instruction-link')
        instructionLink.innerText = 'Click for details'
        //create exercise image
        const exerciseImage = document.createElement('img')
        shoulderExerciseImages.appendChild(exerciseImage)
        exerciseImage.classList.add('exercise-image')
        exerciseImage.src = `${exercise.image}`
        //add to calendar button
        const addToCalendarButton = document.createElement('button')
        shoulderExercise.appendChild(addToCalendarButton)
        addToCalendarButton.classList.add('add-to-calendar-button')
        addToCalendarButton.innerText = 'Add To Calendar'
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            $('.day-select-modal').show()
            $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
        }) 
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`http://localhost:3001/exercises/${identifier}`)

            let exerciseData = getExerciseData.data

            const instructionsList = document.querySelector('.instructions')

            function removeListItems() {
                if(instructionsList) {
                    while(instructionsList.firstChild) {
                        instructionsList.removeChild(instructionsList.firstChild)
                    }
                }
            }

            removeListItems()

            $('.exercise-info-modal').show()

            let instructionsCount = exerciseData[0].instructions.length

            for(let i = 0; i < instructionsCount; i++) {
                const instructionItem = document.createElement('li')
                instructionsList.appendChild(instructionItem)
                instructionItem.classList.add('instruction-list-item')
            }

            const instructionItems = document.querySelectorAll('.instruction-list-item')

            instructionItems.forEach((item, index) => {
                item.innerText = `${exerciseData[0].instructions[index]}`
            })

            $('.modal-exercise-title').text(`${exerciseData[0].name}`)
            $('.demo-image').attr('src', `${exerciseData[0].image}`)
            $('.reps').text(`Suggested Reps: ${exerciseData[0].reps}`)
            $('.equipment-info').text(`Equipment required? ${exerciseData[0].equipment}`)
            $('.primary-muscle').text(`Primary Muscle Group: ${exerciseData[0].primary_muscle_id}`)
            $('.secondary-muscle').text(`Secondary Muscle Group: ${exerciseData[0].secondary_muscle_id}`)
            $('.muscle-group-image').attr('src', `${exerciseData[0].muscle_image}`)
            $('.modal-close-button').click(() => {
                $('.exercise-info-modal').hide()
            })
        })   
    })
}

async function showBack() {
    [armsContainer, chestContainer, shouldersContainer, legsContainer, absContainer].forEach(container => container.style.display = 'none');
    backContainer.style.display = 'flex'

    const getBackExercises = await axios.get('http://localhost:3001/exercises/back')

    $('.day-select-modal').hide()

    let dataArray = getBackExercises.data

    dataArray.forEach((exercise, index) => {
        //create exercise div
        const backExercise = document.createElement('div')
        backContainer.appendChild(backExercise)
        backExercise.classList.add('exerciseDiv')
        //create content div
        const backExerciseContent = document.createElement('div')
        backExercise.appendChild(backExerciseContent)
        backExerciseContent.classList.add('exercise-content')
        //create image div
        const backExerciseImages = document.createElement('div')
        backExercise.appendChild(backExerciseImages)
        backExerciseImages.classList.add('exercise-images')
        //create name title
        const exerciseName = document.createElement('h2')
        backExerciseContent.appendChild(exerciseName)
        exerciseName.classList.add('exercise-name')
        exerciseName.innerText = `${exercise.name}`
        //create instructions link
        const instructionLink = document.createElement('p')
        backExerciseContent.appendChild(instructionLink)
        instructionLink.classList.add('instruction-link')
        instructionLink.innerText = 'Click for details'
        //create exercise image
        const exerciseImage = document.createElement('img')
        backExerciseImages.appendChild(exerciseImage)
        exerciseImage.classList.add('exercise-image')
        exerciseImage.src = `${exercise.image}`
        //add to calendar button
        const addToCalendarButton = document.createElement('button')
        backExercise.appendChild(addToCalendarButton)
        addToCalendarButton.classList.add('add-to-calendar-button')
        addToCalendarButton.innerText = 'Add To Calendar'
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            $('.day-select-modal').show()
            $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
        }) 
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`http://localhost:3001/exercises/${identifier}`)

            let exerciseData = getExerciseData.data

            const instructionsList = document.querySelector('.instructions')

            function removeListItems() {
                if(instructionsList) {
                    while(instructionsList.firstChild) {
                        instructionsList.removeChild(instructionsList.firstChild)
                    }
                }
            }

            removeListItems()

            $('.exercise-info-modal').show()

            let instructionsCount = exerciseData[0].instructions.length

            for(let i = 0; i < instructionsCount; i++) {
                const instructionItem = document.createElement('li')
                instructionsList.appendChild(instructionItem)
                instructionItem.classList.add('instruction-list-item')
            }

            const instructionItems = document.querySelectorAll('.instruction-list-item')

            instructionItems.forEach((item, index) => {
                item.innerText = `${exerciseData[0].instructions[index]}`
            })

            $('.modal-exercise-title').text(`${exerciseData[0].name}`)
            $('.demo-image').attr('src', `${exerciseData[0].image}`)
            $('.reps').text(`Suggested Reps: ${exerciseData[0].reps}`)
            $('.equipment-info').text(`Equipment required? ${exerciseData[0].equipment}`)
            $('.primary-muscle').text(`Primary Muscle Group: ${exerciseData[0].primary_muscle_id}`)
            $('.secondary-muscle').text(`Secondary Muscle Group: ${exerciseData[0].secondary_muscle_id}`)
            $('.muscle-group-image').attr('src', `${exerciseData[0].muscle_image}`)
            $('.modal-close-button').click(() => {
                $('.exercise-info-modal').hide()
            })
        })   
    })
}

async function showLegs() {
    [chestContainer, shouldersContainer, backContainer, armsContainer, absContainer].forEach(container => container.style.display = 'none');
    legsContainer.style.display = 'flex'

    const getLegExercises = await axios.get('http://localhost:3001/exercises/legs')

    $('.day-select-modal').hide()

    let dataArray = getLegExercises.data

    dataArray.forEach((exercise, index) => {
        //create exercise div
        const legExercise = document.createElement('div')
        legsContainer.appendChild(legExercise)
        legExercise.classList.add('exerciseDiv')
        //create content div
        const legExerciseContent = document.createElement('div')
        legExercise.appendChild(legExerciseContent)
        legExerciseContent.classList.add('exercise-content')
        //create image div
        const legExerciseImages = document.createElement('div')
        legExercise.appendChild(legExerciseImages)
        legExerciseImages.classList.add('exercise-images')
        //create name title
        const exerciseName = document.createElement('h2')
        legExerciseContent.appendChild(exerciseName)
        exerciseName.classList.add('exercise-name')
        exerciseName.innerText = `${exercise.name}`
        //create instructions link
        const instructionLink = document.createElement('p')
        legExerciseContent.appendChild(instructionLink)
        instructionLink.classList.add('instruction-link')
        instructionLink.innerText = 'Click for details'
        //create exercise image
        const exerciseImage = document.createElement('img')
        legExerciseImages.appendChild(exerciseImage)
        exerciseImage.classList.add('exercise-image')
        exerciseImage.src = `${exercise.image}`
        //add to calendar button
        const addToCalendarButton = document.createElement('button')
        legExercise.appendChild(addToCalendarButton)
        addToCalendarButton.classList.add('add-to-calendar-button')
        addToCalendarButton.innerText = 'Add To Calendar'
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            $('.day-select-modal').show()
            $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
        })  
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`http://localhost:3001/exercises/${identifier}`)

            let exerciseData = getExerciseData.data

            const instructionsList = document.querySelector('.instructions')

            function removeListItems() {
                if(instructionsList) {
                    while(instructionsList.firstChild) {
                        instructionsList.removeChild(instructionsList.firstChild)
                    }
                }
            }

            removeListItems()

            $('.exercise-info-modal').show()

            let instructionsCount = exerciseData[0].instructions.length

            for(let i = 0; i < instructionsCount; i++) {
                const instructionItem = document.createElement('li')
                instructionsList.appendChild(instructionItem)
                instructionItem.classList.add('instruction-list-item')
            }

            const instructionItems = document.querySelectorAll('.instruction-list-item')

            instructionItems.forEach((item, index) => {
                item.innerText = `${exerciseData[0].instructions[index]}`
            })

            $('.modal-exercise-title').text(`${exerciseData[0].name}`)
            $('.demo-image').attr('src', `${exerciseData[0].image}`)
            $('.reps').text(`Suggested Reps: ${exerciseData[0].reps}`)
            $('.equipment-info').text(`Equipment required? ${exerciseData[0].equipment}`)
            $('.primary-muscle').text(`Primary Muscle Group: ${exerciseData[0].primary_muscle_id}`)
            $('.secondary-muscle').text(`Secondary Muscle Group: ${exerciseData[0].secondary_muscle_id}`)
            $('.muscle-group-image').attr('src', `${exerciseData[0].muscle_image}`)
            $('.modal-close-button').click(() => {
                $('.exercise-info-modal').hide()
            })
        })  
    })
}

async function showAbs() {
    [chestContainer, shouldersContainer, backContainer, legsContainer, armsContainer].forEach(container => container.style.display = 'none');
    absContainer.style.display = 'flex'

    const getAbExercises = await axios.get('http://localhost:3001/exercises/abs')

    $('.day-select-modal').hide()

    let dataArray = getAbExercises.data

    dataArray.forEach((exercise, index) => {
        //create exercise div
        const abExercise = document.createElement('div')
        absContainer.appendChild(abExercise)
        abExercise.classList.add('exerciseDiv')
        //create content div
        const abExerciseContent = document.createElement('div')
        abExercise.appendChild(abExerciseContent)
        abExerciseContent.classList.add('exercise-content')
        //create image div
        const abExerciseImages = document.createElement('div')
        abExercise.appendChild(abExerciseImages)
        abExerciseImages.classList.add('exercise-images')
        //create name title
        const exerciseName = document.createElement('h2')
        abExerciseContent.appendChild(exerciseName)
        exerciseName.classList.add('exercise-name')
        exerciseName.innerText = `${exercise.name}`
        //create instructions link
        const instructionLink = document.createElement('p')
        abExerciseContent.appendChild(instructionLink)
        instructionLink.classList.add('instruction-link')
        instructionLink.innerText = 'Click for details'
        //create exercise image
        const exerciseImage = document.createElement('img')
        abExerciseImages.appendChild(exerciseImage)
        exerciseImage.classList.add('exercise-image')
        exerciseImage.src = `${exercise.image}`
        //add to calendar button
        const addToCalendarButton = document.createElement('button')
        abExercise.appendChild(addToCalendarButton)
        addToCalendarButton.classList.add('add-to-calendar-button')
        addToCalendarButton.innerText = 'Add To Calendar'
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            $('.day-select-modal').show()
            $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
        })  
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`http://localhost:3001/exercises/${identifier}`)

            let exerciseData = getExerciseData.data

            const instructionsList = document.querySelector('.instructions')

            function removeListItems() {
                if(instructionsList) {
                    while(instructionsList.firstChild) {
                        instructionsList.removeChild(instructionsList.firstChild)
                    }
                }
            }

            removeListItems()

            $('.exercise-info-modal').show()

            let instructionsCount = exerciseData[0].instructions.length

            for(let i = 0; i < instructionsCount; i++) {
                const instructionItem = document.createElement('li')
                instructionsList.appendChild(instructionItem)
                instructionItem.classList.add('instruction-list-item')
            }

            const instructionItems = document.querySelectorAll('.instruction-list-item')

            instructionItems.forEach((item, index) => {
                item.innerText = `${exerciseData[0].instructions[index]}`
            })

            $('.modal-exercise-title').text(`${exerciseData[0].name}`)
            $('.demo-image').attr('src', `${exerciseData[0].image}`)
            $('.reps').text(`Suggested Reps: ${exerciseData[0].reps}`)
            $('.equipment-info').text(`Equipment required? ${exerciseData[0].equipment}`)
            $('.primary-muscle').text(`Primary Muscle Group: ${exerciseData[0].primary_muscle_id}`)
            $('.secondary-muscle').text(`Secondary Muscle Group: ${exerciseData[0].secondary_muscle_id}`)
            $('.muscle-group-image').attr('src', `${exerciseData[0].muscle_image}`)
            $('.modal-close-button').click(() => {
                $('.exercise-info-modal').hide()
            })
        })  
    })
}

