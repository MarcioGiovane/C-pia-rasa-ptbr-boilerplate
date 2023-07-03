```javascript
let comments = [];
let currentURL = '';

document.getElementById('saveButton').addEventListener('click', saveComment);
document.getElementById('optionsButton').addEventListener('click', openOptions);

function saveComment() {
    let commentText = document.getElementById('commentInput').value;
    let timestamp = new Date().toISOString();
    let comment = { url: currentURL, text: commentText, timestamp: timestamp };

    comments.push(comment);
    chrome.storage.sync.set({ [currentURL]: comments }, function() {
        console.log('Comment saved');
    });

    document.getElementById('commentInput').value = '';
    loadComments();
}

function loadComments() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        currentURL = tabs[0].url;
        chrome.storage.sync.get([currentURL], function(result) {
            comments = result[currentURL] || [];
            displayComments();
        });
    });
}

function displayComments() {
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(function(comment) {
        let listItem = document.createElement('li');
        listItem.textContent = `${comment.text} (${comment.timestamp})`;
        commentList.appendChild(listItem);
    });
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}

window.onload = loadComments;
```