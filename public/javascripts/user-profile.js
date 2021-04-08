const fetch = require('node-fetch');


document.addEventListener("DOMContentLaoded", async () => {

    const editBtn = document.querySelector('.edit-btn');
    const userId = document.querySelector('.user-id').innerHTML;
    const userIdnum = parseInt(userId, 10);
    editBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const firstName = document.querySelector('#firstName');
        const lastName = document.querySelector('#lastName');
        const userName = document.querySelector('#userName');
        const emailAddress = document.querySelector('#emailAddress');
        const profilePicURL = document.querySelector('#profilePicURL');
        const password = document.querySelector('#password');

        const body = {
            firstName,
            lastName,
            userName,
            emailAddress,
            profilePicURL,
            password
        };

        const result = await fetch(`/api/users/${userIdnum}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
})
