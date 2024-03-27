document.addEventListener("DOMContentLoaded", function() {
    fetchRandomImage();
    updateHistoryView();
});

function fetchRandomImage() {
    const accessKey = 'n5yi0epubZjHAFxguJmSIk6x0bUfUYFzgWTxLUOPdkw';

    fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.regular;
            const photographerName = data.user.name;
            const photoId = data.id;

            document.getElementById('unsplash-image').src = imageUrl;
            document.getElementById('photographer-name').textContent = photographerName;

            setupLikeButton(photoId);
            addToHistory(photoId, imageUrl, photographerName);
        })
        .catch(err => console.log(err));
}

function setupLikeButton(photoId) {
    const likeButton = document.getElementById('like-button');
    const likeCountElement = document.getElementById('like-count');
    likeCountElement.textContent = getLikes(photoId);

    likeButton.onclick = () => {
        const currentLikes = getLikes(photoId) + 1;
        setLikes(photoId, currentLikes);
        likeCountElement.textContent = currentLikes;
        updateHistoryItemLikes(photoId, currentLikes);
    };
}

function getLikes(photoId) {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    return likes[photoId] || 0;
}

function setLikes(photoId, count) {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    likes[photoId] = count;
    localStorage.setItem('likes', JSON.stringify(likes));
}

function addToHistory(photoId, imageUrl, photographerName) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.unshift({ photoId, imageUrl, photographerName, likes: getLikes(photoId) });
    localStorage.setItem('history', JSON.stringify(history));
}

function updateHistoryView() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyElement = document.getElementById('history');

    historyElement.innerHTML = history.map(item => `
        <div class="history-item">
            <img src="${item.imageUrl}" alt="Фото">
            <p>Фотограф: ${item.photographerName}</p>
            <p>Лайков: ${item.likes}</p>
        </div>
    `).join('');
}

function updateHistoryItemLikes(photoId, newLikes) {
    const history = JSON.parse(localStorage.getItem('history')) || [];

    history.forEach(item => {
        if (item.photoId === photoId) {
            item.likes = newLikes;
        }
    });

    localStorage.setItem('history', JSON.stringify(history));
    updateHistoryView();
}
