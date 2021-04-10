///place script in user-profile.pug
document.addEventListener("DOMContentLoaded", async () => {



document.querySelector('.comment-form').addEventListener('submit', async(event) => {
    event.preventDefault();


    const uri = event.target.baseURI;
    // console.log('uri', typeof uri)
    const splitId = uri.split("/")
    const stringId=splitId[splitId.length -1]
    const productId = parseInt(stringId, 10)
    // console.log('split', typeof productId)


    let content = document.querySelector('#content').value;
    // console.log('CONTENT', content)

    let commentData = await fetch(`http://localhost:8080/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })

    let comment = await commentData.json();
    // console.log('comment', comment)

    //create comment list item
    const commentDiv = document.createElement('div');
    //create commentor from user
    const commentor = document.createElement('div');
    commentor.classList.add('commentor');
    commentor.innerHTML = comment.user.userName;
    //create timestamp
    const commentTime = document.createElement('div');
    commentTime.classList.add('comment-time');
    commentTime.innerHTML = `on ${comment.date}`
    //create comment content
    const commentBody = document.createElement('div');
    commentBody.classList.add('comment-body');
    commentBody.innerHTML = comment.newComment.content;

    //append to li, then to existing ul
    commentDiv.appendChild(commentor);
    commentDiv.appendChild(commentTime);
    commentDiv.appendChild(commentBody);
    document.querySelector('.new-comments').appendChild(commentDiv);

    //reset placeholder text after submit
    document.querySelector('#content').innerHTML = '';

});



})
