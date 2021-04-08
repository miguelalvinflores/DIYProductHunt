///place script in user-profile.pug

document.querySelector('.comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const commentdata = await fetch('localhost:8080/products/:id/comments')
    const comment = await commentdata.json();

    const userdata = await fetch(`localhost:8080/users/comment.userId`);
    const user = await userdata.json();

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
