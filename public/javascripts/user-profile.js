// const fetch = require('node-fetch');


document.addEventListener("DOMContentLoaded", async () => {
// EDIT PROFILE FUNCITONALITY
    const editProfileBtn = document.querySelector('.edit-profile-btn')
    const editProfileBtnCancel = document.querySelector('.edit-btn-cancel')

    const modalEditProfile = document.querySelector('#modal-edit-profile')
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalEditProfile.style.display = "block";
        })
    }
    if (editProfileBtnCancel) {
        editProfileBtnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            modalEditProfile.style.display = "none";
        })
    }

    const editBtn = document.querySelector('.edit-btn');
    if (editBtn) {
        editBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            let editProfileErrors = document.querySelector('#edit-profile-errors')
            editProfileErrors.innerHTML = '';
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
            const updatedUser = await fetch(`http://diy-product-hunt.herokuapp.com/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const jsonUser = await updatedUser.json();
            if (jsonUser.user) {
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
    
    
                modalEditProfile.style.display = "none";
                fullname.innerHTML = `${firstNameU} ${lastNameU}`
                contact.innerHTML = `Contact Creator: ${emailAddressU}`
                image.src = profilePicURLU
                username.innerHTML = `Username: ${userNameU}`
    
            } else if (jsonUser.userNotFound) {
                alert('This account does not exist. You are now being redirected to the home page');
                console.log('redirected')
                window.location.href = 'http://diy-product-hunt.herokuapp.com/'
            } else {
                console.log(jsonUser.errors)
                const errorDiv = document.createElement('div');
                const errorP = document.createElement('p');
                errorP.innerHTML = 'Please correct the following:'
                const errorList = document.createElement('ul')
                errorDiv.appendChild(errorP);
                errorDiv.appendChild(errorList)
                jsonUser.errors[0].forEach(error => {
                    let errorItem = document.createElement('li')
                    errorItem.innerHTML = error;
                    errorList.appendChild(errorItem)
                    console.log(errorItem)
                });
                editProfileErrors.appendChild(errorDiv)
            }
        })
    }
    const userIdData = document.querySelector('#user-id-delete') 
    const deleteProductBtns = document.querySelectorAll('.delete-product')
    const userId = parseInt(userIdData.value)
    const deleteAndRepopulate = () => {
        if (deleteProductBtns) {
            deleteProductBtns.forEach((button, i) => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const productId = parseInt(button.value)
                    let updatedProductsData = await fetch(`http://diy-product-hunt.herokuapp.com/products/delete`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userId, id: productId })
                    })
                    const updatedProducts = await updatedProductsData.json()
                    const productTable = document.querySelector('#product-table')
                    productTable.innerHTML = '';
                    updatedProducts.updatedProducts.forEach((product, i) => {
                        let timestamp = Date.parse(product.createdAt)
                        let date = new Date(timestamp)
                        const data = `<tr class="profile-products__table__row-data">
                                    <td><a href="/products/${product.id}">${product.name}</a></td>
                                    <td class="table__date">${date.toLocaleDateString(undefined)}
                                    <td>
                                    <button class="delete-product" id="delete-product-${i}" value="${product.id}">Delete</button>
                                    </td>
                                    </td>
                                    </tr>`
                        productTable.insertAdjacentHTML('beforeend', data)
                    });

                    deleteAndRepopulate()
                })
            });
        }
    }
    deleteAndRepopulate()


    const deleteProfileBtn = document.querySelector('.delete-profile-btn')
    const deleteProfileBtnCancel = document.querySelector('.delete-btn-cancel')

    const modalDeleteProfile = document.querySelector('#modal-delete-profile')
    if (deleteProfileBtn) {
        deleteProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalDeleteProfile.style.display = "block";
        })
    }
    if (deleteProfileBtnCancel) {       
        deleteProfileBtnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            modalDeleteProfile.style.display = "none";
        })
    }
})
