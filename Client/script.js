const baseURL = 'myfitnessplanner-production.up.railway.app'

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
const titlesContainer = document.querySelector('.page-titles-container')

loginButton.addEventListener('click', checkLoginForm)

document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        checkLoginForm()
    }
})

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
        const checkLoginInfo = await axios.get(`${baseURL}/api/users/login/${userLoginRequest}-${passwordLoginRequest}`)
        if(checkLoginInfo) {
            //console.log('Login Sucessful!')
            currentUser = checkLoginInfo.data
            //console.log(currentUser)
            $('.user-login-page').css('display', 'none')
            $('.calendar-page').css('display', 'flex')
            $('#hamburger').css('display', 'block')
            const calendarGreeting = document.createElement('h1')
            calendarGreeting.classList.add('page-greeting')
            calendarGreeting.classList.add('item-to-clear')
            titlesContainer.appendChild(calendarGreeting)
            calendarGreeting.innerText = `Hi ${currentUser.name}! Here's your week so far...`
            getCalendarData()
        } else {
            alert('Wrong Username or Password')
        }
    } catch (error) {
        if(error.response && error.response.status === 500) {
            alert('Incorrect Username or Password, please try again.')
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
    if(newUsername.includes('@') || newUsername.includes('-')) {
        alert('Your username cannot contain @ or - symbols.')
        return;
    }
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
    const checkUsername = await axios.get(`${baseURL}/api/users/${usernameRequest}`)
    if(checkUsername.data.length === 0) {
        addNewUser(newUser)
    } else {
        alert('This username is already taken')
    }
}

async function addNewUser(newUser) {
    postNewUserToDB = await axios.post(`${baseURL}/api/users/createuser`, newUser)
    let calendar_id = newUser.username
    let newCalendar = {
        user_username: `${calendar_id}`,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
    }
    createUserCalendar = await axios.post(`${baseURL}/api/calendars/createcalendar`, newCalendar)
    alert('Your user and calendar have been created!')
    $('.create-account-page').css('display', 'none')
    $('.user-login-page').css('display', 'flex')
}

//DELETE ACCOUNT

const deleteAccountButton = document.querySelector('#deleteAccountButton')

deleteAccountButton.addEventListener('click', checkUserInfo)

function checkUserInfo() {
    user = userUsernameInput.value.toLowerCase()
    password = userPasswordInput.value
    if((user !== '' && user !== 'undefined') && (password !== '' && password !== 'undefined')) {
        validateUserDeletion(user, password)
    } else {
        alert('Please input your user information')
    }
}

async function validateUserDeletion(user, password) {
    const userLoginRequest = user
    const passwordLoginRequest = password
    try {
        const checkLoginInfo = await axios.get(`${baseURL}/api/users/login/${userLoginRequest}-${passwordLoginRequest}`)
        if(checkLoginInfo) {
            //console.log('User Exists')
            deleteUser(userLoginRequest)
        } else {
            alert('Wrong Username or Password')
        }
    } catch (error) {
        if(error.response && error.response.status === 500) {
            alert('Incorrect Username or Password, please try again.')
        }
    } finally {
        $('#loginForm')[0].reset()
    }
}

async function deleteUser(userLoginRequest) {
    try {
        const deleteUserInfo = await axios.delete(`${baseURL}/api/users/deleteuser/${userLoginRequest}`)
        //console.log(`${userLoginRequest}'s account and data has been deleted`)
        alert(`${userLoginRequest}'s account and calendar has been deleted!`)
    } catch (error) {
        if(error.response && error.response.status === 500) {
            console.log(`It didn't work`)
        }
    }
}

// SELECT DAY MODAL

$('.day-select-modal').hide()
$('.exercise-info-modal').hide()
$('.options-modal').hide()

const daySelectorButtons = document.querySelectorAll('.day-button')

daySelectorButtons.forEach(button => {
    button.addEventListener('click', collectInfo)
})

function collectInfo(event) {
    let buttonClicked = event.target
    let day = buttonClicked.innerHTML.toLowerCase()
    let user = currentUser.username.toLowerCase()
    let exercise = clickedExercise.id
    //console.log(day, user, exercise)
    addToCalendar(user, day, exercise)
}

async function addToCalendar(user, day, exercise) {
    const addItemToCalendar = await axios.put(`${baseURL}/api/calendars/add/${user}@${day}@${exercise}`)
    if(addItemToCalendar) {
        //console.log(addItemToCalendar)
    }
    $('.day-select-modal').hide()
}

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

    calendarButton.addEventListener('click', async () => {
        menuButton.classList.remove('is-active')
        menuContainer.classList.remove('is-active')
        userLoginPage.style.display = 'none'
        createAccountPage.style.display = 'none'
        exerciseGroupsPage.style.display = 'none'
        exercisesDisplayPage.style.display = 'none'
        calendarPage.style.display = 'flex'
        getCalendarData()
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
        const existingItems = document.querySelectorAll('.item-to-clear')
        if(existingItems.length > 0) {
            existingItems.forEach(item => item.remove())
        }
    })


// CALENDAR PAGE

const markCompleteButton = document.querySelector('#markCompleteButton')
const markIncompleteButton = document.querySelector('#markIncompleteButton')
const deleteExerciseButton = document.querySelector('#deleteExerciseButton')
const closeWindowButton = document.querySelector('#closeWindowButton')

async function getCalendarData() {
    let user = currentUser.username
    //console.log(user)
    const getCalendarData = await axios.get(`${baseURL}/api/calendars/${user}`)
    //console.log(getCalendarData)
    const calendar = getCalendarData.data
    getExercises(calendar)
}

function getExercises(calendar) {
    let daysToPopulate = []
    for (let key in calendar) {
        if(Array.isArray(calendar[key]) && calendar[key].length === 0) {
            continue;
        } 
        if(!Array.isArray(calendar[key])) {
            continue;
        }
        daysToPopulate.push(key)
    }
    //console.log(daysToPopulate)
    populateDays(calendar, daysToPopulate)
}

function populateDays(calendar, daysToPopulate) {
    const calendarDays = document.querySelectorAll('.day-container')
    calendarDays.forEach(day => {
        if(daysToPopulate.includes(day.id)) {
            let dayId = day.id            
            populateExercises(calendar, dayId)
        } 
    })
}

function populateExercises(calendar, dayId) {
    let parentDiv = document.querySelector(`#${dayId}`)
    let exerciseArray = calendar[dayId]

    const existingItems = parentDiv.querySelectorAll('.item-to-clear')

    const existingExerciseNames = Array.from(existingItems).map(
        (item) => item.querySelector('.exercise-item-name').innerHTML
    )
        exerciseArray.forEach((exercise, index) => {
            if (!existingExerciseNames.includes(exercise.name)) {
            //create Div
            const exerciseContainer = document.createElement('div')
            exerciseContainer.classList.add('exercise-container')
            exerciseContainer.classList.add('item-to-clear')
            parentDiv.appendChild(exerciseContainer)
            //create Name
            const exerciseItemName = document.createElement('h3')
            exerciseItemName.classList.add('exercise-item-name')
            exerciseContainer.appendChild(exerciseItemName)
            exerciseItemName.innerHTML = `${exercise.name}`
            //create Button
            const optionsButton = document.createElement('h2')
            optionsButton.classList.add('more-options-button')
            exerciseContainer.appendChild(optionsButton)
            optionsButton.innerHTML = '...'
        }})
    activateOptionsButtons()
    activateExerciseInfoButtons()
}    

let exerciseToEdit;
let exerciseToRemove;
let dayOfExercise;

function activateOptionsButtons() {
    const moreOptionsButtons = document.querySelectorAll('.more-options-button')

    moreOptionsButtons.forEach(button => {
        button.addEventListener('click', showOptions)
    })
    closeWindowButton.addEventListener('click', hideOptions)
    markCompleteButton.addEventListener('click', markComplete)
    markIncompleteButton.addEventListener('click', markIncomplete)
    deleteExerciseButton.addEventListener('click', deleteFromCalendar)
}

function activateExerciseInfoButtons() {
    const exerciseInfoButtons = document.querySelectorAll('.exercise-item-name')

    exerciseInfoButtons.forEach(button => {
        button.addEventListener('click', showExerciseInfo)
    })
}

async function showExerciseInfo(event) {
    searchTarget = event.target.innerHTML
    const getExerciseInfo = await axios.get(`${baseURL}/api/exercises/${searchTarget}`)
    //console.log(getExerciseInfo)

        let exerciseData = getExerciseInfo.data

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
    }

function showOptions(e) {
    let exerciseOptions = e.target
    exerciseToEdit = exerciseOptions.parentNode
    dayOfExercise = exerciseToEdit.parentNode.id
    exerciseToRemove = exerciseOptions.previousElementSibling.innerHTML
    //console.log(exerciseToEdit)
    $('.options-modal').show()
}

function hideOptions() {
    $('.options-modal').hide()
}

function markComplete() {
    exerciseToEdit.style.backgroundColor = 'green'
    hideOptions()
}

function markIncomplete() {
    exerciseToEdit.style.backgroundColor = 'transparent'
    hideOptions()
}

async function deleteFromCalendar() {
    user = currentUser.username
    const removeItemFromCalendar = await axios.put(`${baseURL}/api/calendars/remove/${user}@${dayOfExercise}@${exerciseToRemove}`)
    if(removeItemFromCalendar) {
        //console.log(removeItemFromCalendar)
        hideOptions()
        deleteCalendarItem()
    }
}

function deleteCalendarItem() {
    exerciseToEdit.remove()
}


// EXERCISES GROUPS PAGE

const muscleGroupButtons = document.querySelectorAll('.muscle-group')

let selectedMuscle;

muscleGroupButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedMuscle = e.target.id
        //console.log(selectedMuscle)
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
let selectedExercise;

async function showChest() {
    [armsContainer, shouldersContainer, backContainer, legsContainer, absContainer].forEach(container => container.style.display = 'none');
    chestContainer.style.display = 'flex'
    const getChestExercises = await axios.get(`${baseURL}/api/exercises/chest`)

    $('.day-select-modal').hide()

    let dataArray = getChestExercises.data

    const exerciseDivs = document.querySelectorAll('.exerciseDiv')

    exerciseDivs.forEach(div => div.remove())

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
        addToCalendarButton.setAttribute('id', exerciseName.innerText)
        addToCalendarButton.innerText = 'Add To Calendar'
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            if(currentUser) {
                $('.day-select-modal').show()
                $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
            } else {
                alert('You must be logged in.')
            }
        })
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`${baseURL}/api/exercises/${identifier}`)

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

    const getArmExercises = await axios.get(`${baseURL}/api/exercises/arms`)

    $('.day-select-modal').hide()

    let dataArray = getArmExercises.data

    const exerciseDivs = document.querySelectorAll('.exerciseDiv')

    exerciseDivs.forEach(div => div.remove())

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
        addToCalendarButton.setAttribute('id', exerciseName.innerText)
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            if(currentUser) {
                $('.day-select-modal').show()
                $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
            } else {
                alert('You must be logged in.')
            }
        }) 
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`${baseURL}/api/exercises/${identifier}`)

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

    const getShoulderExercises = await axios.get(`${baseURL}/api/exercises/shoulders`)

    $('.day-select-modal').hide()

    let dataArray = getShoulderExercises.data

const exerciseDivs = document.querySelectorAll('.exerciseDiv')

    exerciseDivs.forEach(div => div.remove())

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
        addToCalendarButton.setAttribute('id', exerciseName.innerText)
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            if(currentUser) {
                $('.day-select-modal').show()
                $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
            } else {
                alert('You must be logged in.')
            }
        }) 
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`${baseURL}/api/exercises/${identifier}`)

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

    const getBackExercises = await axios.get(`${baseURL}/api/exercises/back`)

    $('.day-select-modal').hide()

    let dataArray = getBackExercises.data

const exerciseDivs = document.querySelectorAll('.exerciseDiv')

    exerciseDivs.forEach(div => div.remove())

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
        addToCalendarButton.setAttribute('id', exerciseName.innerText)
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            if(currentUser) {
                $('.day-select-modal').show()
                $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
            } else {
                alert('You must be logged in.')
            }
        }) 
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`${baseURL}/api/exercises/${identifier}`)

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

    const getLegExercises = await axios.get(`${baseURL}/api/exercises/legs`)

    $('.day-select-modal').hide()

    let dataArray = getLegExercises.data

const exerciseDivs = document.querySelectorAll('.exerciseDiv')

    exerciseDivs.forEach(div => div.remove())

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
        addToCalendarButton.setAttribute('id', exerciseName.innerText)
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            if(currentUser) {
                $('.day-select-modal').show()
                $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
            } else {
                alert('You must be logged in.')
            }
        })  
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`${baseURL}/api/exercises/${identifier}`)

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

    const getAbExercises = await axios.get(`${baseURL}/api/exercises/abs`)

    $('.day-select-modal').hide()

    let dataArray = getAbExercises.data

const exerciseDivs = document.querySelectorAll('.exerciseDiv')

    exerciseDivs.forEach(div => div.remove())
    
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
        addToCalendarButton.setAttribute('id', exerciseName.innerText)
        addToCalendarButton.addEventListener('click', (e) => {
            clickedExercise = e.target
            if(currentUser) {
                $('.day-select-modal').show()
                $('.modal-close-button').click(() => {
                $('.day-select-modal').hide()
            })
            } else {
                alert('You must be logged in.')
            }
        })  
        instructionLink.addEventListener('click', async (e) => {
            selectedExercise = e.target
            identifier = selectedExercise.previousElementSibling.innerText
            const getExerciseData = await axios.get(`${baseURL}/api/exercises/${identifier}`)

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

