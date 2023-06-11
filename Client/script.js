// USER LOGIN PAGE

$('#loginButton').click(function userLogin() {
    $('.user-login-page').css('display', 'none')
    $('.calendar-page').css('display', 'flex')
    $('#hamburger').css('display', 'block')
})

$('#createAccountButton').click(function goToCreateAccount() {
    $('.user-login-page').css('display', 'none')
    $('.create-account-page').css('display', 'flex')
})