// const fetch = require('node-fetch');


document.addEventListener("DOMContentLoaded", async () => {

    const editProfileBtn = document.querySelector('.edit-profile-btn')
    const editProfileBtnCancel = document.querySelector('.edit-btn-cancel')

    const modal = document.querySelector('.modal')
    editProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "block";
    })
    editProfileBtnCancel.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "none";
    })

    const editBtn = document.querySelector('.edit-btn');
    // const userIdnum = parseInt(userId, 10);
    editBtn.addEventListener("click", async (e) => {
            e.preventDefault();

        let userId = document.querySelector('#user-id').value;
        let firstName = document.querySelector('#firstName').value;
        let lastName = document.querySelector('#lastName').value;
        let userName = document.querySelector('#userName').value;
        let emailAddress = document.querySelector('#emailAddress').value;
        let profilePicURL = document.querySelector('#profilePicURL').value;
        let password = document.querySelector('#password').value;

        const body = {
            firstName,
            lastName,
            userName,
            emailAddress,
            profilePicURL,
            password
        };
        const updatedUser = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const jsonUser = await updatedUser.json();
        const {
            firstName: firstNameU,
            lastName : lastNameU,
            userName: userNameU,
            emailAddress: emailAddressU,
            profilePicURL: profilePicURLU
        } = jsonUser.user
        console.log(jsonUser)

        const fullname = document.querySelector('#full-name');
        const contact = document.querySelector('#contact');
        const image = document.querySelector('#image');
        const username = document.querySelector('#username');


        modal.style.display = "none";
        fullname.innerHTML = `${firstNameU} ${lastNameU}`
        contact.innerHTML = `Contact Creator: ${emailAddressU}`
        image.src = profilePicURLU
        username.innerHTML = `Username: ${userNameU}`
    })
})
