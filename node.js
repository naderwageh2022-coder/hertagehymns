let currentHymnData = {};


function playNewHymn(buttonElement, title, sub, audioUrl, videoUrl, lyricsUrl) {
    

    document.getElementById('currentTitle').innerText = title;
    document.getElementById('currentSub').innerText = sub;
    

    currentHymnData = { title, sub, audioUrl };


    const hymnItem = buttonElement.closest('.hymn-item');
    if (hymnItem) {
        const wordsBtn = hymnItem.querySelector('.words-btn-class');
        const videoBtn = hymnItem.querySelector('.video-btn');
        
        if (wordsBtn) wordsBtn.href = lyricsUrl;
        if (videoBtn) videoBtn.href = videoUrl;
    }
    

    const player = document.getElementById('mainAudioPlayer');
    const source = document.getElementById('audioSource');
    
    if (player && source) {
        source.src = audioUrl;
        player.load(); 
        player.play().catch(error => {
            console.log("خطأ في التشغيل التلقائي: ", error);
        });
    }
}



const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let hymnItems = document.querySelectorAll('.hymn-item');

        hymnItems.forEach(function(item) {
            let title = item.querySelector('.song-title').innerText.toLowerCase();
            if (title.includes(filter)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
}
function addToFavorites(title, audioSrc) {

    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];


    let isExist = favorites.some(item => item.title === title);

    if (!isExist) {

        favorites.push({ title: title, audio: audioSrc });

        localStorage.setItem('myFavorites', JSON.stringify(favorites));
        alert('Added to Favorites! ❤️');
    } else {
        alert('This hymn is already in your favorites!');
    }
}

