///place script in user-profile.pug
document.addEventListener("DOMContentLoaded", async () => {



document.querySelector('.comment-form').addEventListener('submit', async(event) => {
    event.preventDefault();


    const uri = event.target.baseURI
    console.log('uri', uri)


    let content = document.querySelector('#content').value;
    let productId = document.querySelector('.productId').value;

    let commentData = await fetch(`http://localhost:8080/products/${productId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })

    let comment = await commentData.json();
    console.log('comment', comment)

    //create comment list item
    const commentLi = document.createElement('li');
    //create commentor from user
    const commentor = document.createElement('div');
    commentor.classList.add('commentor');
    commentor.innerHTML = user.userName;
    //create timestamp
    const commentTime = document.createElement('div');
    commentTime.classList.add('comment-time');
    comment.innerHTML = `on ${comment.createdAt}`
    //create comment content
    const commentBody = document.createElement('div');
    commentBody.classList.add('comment-body');
    commentBody.innerHTML = comment.content;

    //append to li, then to existing ul
    commentLi.appendChild(commentor, commentTime, commentBody);
    document.querySelector('.comment-list').appendChild(commentLi);

});



})
