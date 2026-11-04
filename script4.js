function displayFavorites() {
            const container = document.getElementById('favoritesList');
            let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

            if (favorites.length === 0) {
                container.innerHTML = '<div class="empty-state">Your favorite list is empty yet 🎵</div>';
                return;
            }

            container.innerHTML = '';
            favorites.forEach((item, index) => {
                container.innerHTML += `
                    <div class="fav-item">
                        <div class="song-details">
                            <div class="music-icon">🎵</div>
                            <div class="fav-title" title="${item.title}">${item.title}</div>
                        </div>
                        <div class="controls">
                            <button class="play-btn" onclick="playFavAudio('${item.title}','${item.audio}')">
                                <span>Play</span> ▶
                            </button>
                            <button class="remove-btn" onclick="removeFromFavorites(${index})" title="Remove">✕</button>
                        </div>
                    </div>
                `;
            });
        } 
        function playFavAudio(title, audioSrc) {

    console.log("Title:", title);
    console.log("Audio:", audioSrc);

    document.getElementById("currentTitle").textContent = title;
    document.getElementById("currentSub").textContent = "Orthodox Liturgical Music";

    const player = document.getElementById("mainAudioPlayer");
    const source = document.getElementById("audioSource");

    source.src = audioSrc;
    player.load();
    player.play();

}

        function removeFromFavorites(index) {
            let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
            favorites.splice(index, 1);
            localStorage.setItem('myFavorites', JSON.stringify(favorites));
            displayFavorites();
        }
        window.onload = displayFavorites;
function searchFavorites() {

    const filter = document
        .getElementById("searchFav")
        .value
        .toLowerCase()
        .trim();

    const items = document.querySelectorAll(".fav-item");

    items.forEach(item => {

        const title = item
            .querySelector(".fav-title")
            .textContent
            .toLowerCase();

        if (title.includes(filter)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }

    });

}