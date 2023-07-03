```javascript
let comments = [];
let currentURL = '';

// Function to save comment
function saveComment(comment) {
  comments.push(comment);
  chrome.storage.sync.set({ [currentURL]: comments }, function() {
    console.log('Comment saved');
  });
}

// Function to load comments
function loadComments() {
  chrome.storage.sync.get([currentURL], function(result) {
    comments = result[currentURL] || [];
    displayComments();
  });
}

// Function to display comments
function displayComments() {
  const commentList = document.getElementById('commentList');
  commentList.innerHTML = '';
  comments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.textContent = comment;
    commentList.appendChild(commentElement);
  });
}

// Event listener for save button
document.getElementById('saveButton').addEventListener('click', function() {
  const commentInput = document.getElementById('commentInput');
  const comment = commentInput.value;
  commentInput.value = '';
  saveComment(comment);
});

// Event listener for options button
document.getElementById('optionsButton').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});

// Load comments when the page is loaded
window.addEventListener('load', function() {
  currentURL = window.location.href;
  loadComments();
});
```