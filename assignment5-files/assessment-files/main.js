// Show/hide comments functionality
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

showHideBtn.setAttribute('tabindex', '0'); // Make the button focusable
showHideBtn.setAttribute('role', 'button'); // Add ARIA role
showHideBtn.setAttribute('aria-expanded', 'false'); // Set ARIA attribute

commentWrapper.style.display = 'none';

showHideBtn.addEventListener('click', toggleComments);
showHideBtn.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') toggleComments(); // Enable Enter key to toggle comments
});

function toggleComments() {
  const isVisible = commentWrapper.style.display === 'block';
  commentWrapper.style.display = isVisible ? 'none' : 'block';
  showHideBtn.textContent = isVisible ? 'Show comments' : 'Hide comments';
  showHideBtn.setAttribute('aria-expanded', !isVisible);
}

// Add comment functionality
const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = function (e) {
  e.preventDefault();
  addComment();
};

function addComment() {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');

  const nameValue = nameField.value.trim();
  const commentValue = commentField.value.trim();

  if (!nameValue || !commentValue) {
    alert('Please fill out both fields.');
    return;
  }

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);
  list.appendChild(listItem);

  nameField.value = '';
  commentField.value = '';
}
