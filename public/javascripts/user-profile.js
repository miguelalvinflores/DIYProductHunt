// const fetch = require('node-fetch');


document.addEventListener("DOMContentLoaded", async () => {

    const editProfileBtn = document.querySelector('.edit-profile-btn')
    const editProfileBtnCancel = document.querySelector('.edit-btn-cancel')

    const modal = document.querySelector('.modal')
    editProfileBtn.addEventListener('click', (e) => {
        console.log('this better work')
        e.preventDefault();
        modal.style.display = "block";
    })
    editProfileBtnCancel.addEventListener('click', (e) => {
        console.log('this better work')
        e.preventDefault();
        modal.style.display = "none";
    })

    const editBtn = document.querySelector('.edit-btn');
    // const userIdnum = parseInt(userId, 10);
    editBtn.addEventListener("click", async (e) => {
            e.preventDefault();
        
        const userId = document.querySelector('#user-id').value;
        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const userName = document.querySelector('#userName').value;
        const emailAddress = document.querySelector('#emailAddress').value;
        const profilePicURL = document.querySelector('#profilePicURL').value;
        const password = document.querySelector('#password').value;

        const body = {
            firstName,
            lastName,
            userName,
            emailAddress,
            profilePicURL,
            password
        };

        const result = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

    })
})
