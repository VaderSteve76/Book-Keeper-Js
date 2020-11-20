const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];


// Show modal, focus on input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Validate form
function validate(nameValue, urlValue) {
  const exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(exp);
  if(!nameValue || !urlValue) {
    alert('Please submit values for both.');
    return false;
  }
  if(!urlValue.match(regex)) {
    alert('Please provide a valid web address');
    return false;
  }
  return true;
}

// Fetch bookmarks from localstorage
function fetchBookmarks() {
  // get bookmarks from localstorage if available
  if(localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // create bookmarks array in localstorage
    bookmarks = [
      {
        name: 'My Github',
        url: 'https://github.com/VaderSteve76'
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
}

// Submit data
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if(!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  if(!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));
bookmarkForm.addEventListener('submit', storeBookmark);

// on load
fetchBookmarks();