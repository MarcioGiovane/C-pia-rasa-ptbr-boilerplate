```javascript
let comments = [];
let currentURL = '';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments: [] });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    currentURL = tab.url;
    chrome.storage.sync.get(['comments'], (result) => {
      comments = result.comments.filter(comment => comment.url === currentURL);
      chrome.runtime.sendMessage({ type: 'LOAD_COMMENTS', payload: comments });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SAVE_COMMENT') {
    const newComment = {
      url: currentURL,
      text: request.payload,
      timestamp: new Date().toISOString()
    };
    comments.push(newComment);
    chrome.storage.sync.set({ comments: [...comments, newComment] });
  }
});
```