const login_form = document.querySelector('#login-form')
const signup_form = document.querySelector('#signup-form')

login_form.addEventListener('submit', async e => {
    e.preventDefault()
    let errSpan = document.querySelector('span');
    errSpan.innerHTML = ''
    errSpan.classList.remove('error')
    try {
        let email = login_form.email.value
        let password = login_form.password.value

        const res = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email, password})
        })

        const data = await res.json()
        console.log(data);
        if (data.message != 'user logged in') {
            errSpan.innerText = data.message
            errSpan.classList.add('error')
        } else {
            location.assign('/dashboard')
        }
    } catch (err) {
        console.log(err.message);
    }
})


signup_form.addEventListener('submit', async e => {

    let errSpan = document.querySelector('span');
    errSpan.innerHTML = ''
    errSpan.classList.remove('error')
    e.preventDefault();
    try {
        let email = signup_form.email.value
        let password = signup_form.password.value
        let username = signup_form.username.value

        const res = await fetch('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email,username, password })
        })

        const data = await res.json()
        console.log(data);
        if (data.message != 'new user saved successfully') {
            errSpan.innerText = data.message
            errSpan.classList.add('error')
        } else {
            location.assign('/dashboard')
        }
    } catch (err) {
        console.log('error occurred');
    }
})