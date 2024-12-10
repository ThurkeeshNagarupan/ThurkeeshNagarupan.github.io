// Toggle Comments Section
const showHideButton = document.querySelector('.show-hide');
const commentsSection = document.querySelector('.comments');

showHideButton.addEventListener('click', () => {
  commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
  showHideButton.textContent = commentsSection.style.display === 'none' ? 'Show Comments' : 'Hide Comments';
});

// Handle Comment Form Submission
const commentForm = document.querySelector('.comment-form');
const commentList = document.querySelector('.comment-container');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = commentForm.querySelector('input[name="name"]');
  const commentInput = commentForm.querySelector('input[name="comment"]');

  if (nameInput.value.trim() && commentInput.value.trim()) {
    const newComment = document.createElement('li');
    const nameParagraph = document.createElement('p');
    const commentParagraph = document.createElement('p');

    nameParagraph.textContent = nameInput.value;
    commentParagraph.textContent = commentInput.value;

    newComment.appendChild(nameParagraph);
    newComment.appendChild(commentParagraph);
    commentList.appendChild(newComment);

    // Reset form
    nameInput.value = '';
    commentInput.value = '';
  } else {
    alert('Please fill in both fields.');
  }
});

