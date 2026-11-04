const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

const playlistContainer = document.getElementById("playlist-container");

if (playlistContainer) {

    playlists.forEach((playlist, index) => {

        playlistContainer.innerHTML += `
            <div class="playlist-box">
                <h2>${playlist.name}</h2>
                <p>${playlist.songs.length} ترنيمة</p>

                <button onclick="openPlaylist(${index})">
                    فتح
                </button>
            <button onclick="editPlaylist(${index})">
    ✏ تعديل
</button>
                <button onclick="deletePlaylist(${index})">
                    حذف
                </button>

                <div id="songs-${index}" class="songs-box"></div>
            </div>
        `;

    });

}




document.querySelectorAll(".playlist-check").forEach(check => {

    check.addEventListener("change", function () {

        const box = this.closest(".hymn-item");

        if (this.checked) {
            box.classList.add("selected");
        } else {
            box.classList.remove("selected");
        }

    });

});




function createPlaylist() {

    const playlistName = document.getElementById("playlistName").value.trim();

    if (playlistName === "") {
        alert("اكتب اسم الـ Playlist");
        return;
    }

    const songs = [];

    document.querySelectorAll(".hymn-item").forEach(item => {

        const check = item.querySelector(".playlist-check");

        if (check && check.checked) {

    
            songs.push(item.outerHTML);

        }

    });

    if (songs.length === 0) {
        alert("اختر ترنيمة واحدة على الأقل");
        return;
    }

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    playlists.push({
        name: playlistName,
        songs: songs
    });

    localStorage.setItem("playlists", JSON.stringify(playlists));

    alert("تم إنشاء Playlist");

    window.location.href = "playlist1.html";

}

function deletePlaylist(index) {

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    playlists.splice(index, 1);

    localStorage.setItem("playlists", JSON.stringify(playlists));

    location.reload();

}


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
let current = 0;
let currentPlaylist = [];

function playAllSongs(index) {

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    currentPlaylist = playlists[index].songs;

    current = 0;

    playSong(current);

}

function playSong(i) {

    const player = document.getElementById("mainAudioPlayer");
    const source = document.getElementById("audioSource");

    source.src = currentPlaylist[i].audio;

    player.load();
    player.play();

    player.onended = function () {

        current++;

        if (current < currentPlaylist.length) {
            playSong(current);
        }

    };

}
function openPlaylist(index) {

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    const playlist = playlists[index];

    const songsBox = document.getElementById(`songs-${index}`);

    if (songsBox.style.display === "block") {
        songsBox.style.display = "none";
        songsBox.innerHTML = "";
        return;
    }

    songsBox.style.display = "block";
    songsBox.innerHTML = "";

    playlist.songs.forEach((song, songIndex) => {

        songsBox.innerHTML += `
            <div class="playlist-song">

                ${song}
                <button class="delete-song"
                 onclick="deleteSong(${index}, ${songIndex})">
                    🗑 حذف الترنيمة
                </button>

            </div>
        `;

    });

    songsBox.querySelectorAll(".playlist-check").forEach(check => {
        check.remove();
    });

}
function deleteSong(playlistIndex, songIndex) {

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    playlists[playlistIndex].songs.splice(songIndex, 1);

    localStorage.setItem("playlists", JSON.stringify(playlists));

    openPlaylist(playlistIndex);
}
function editPlaylist(index) {

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    const newName = prompt("اكتب الاسم الجديد للـ Playlist", playlists[index].name);

    if (newName === null) return;

    if (newName.trim() === "") {

        alert("اكتب اسم صحيح");

        return;

    }

    playlists[index].name = newName.trim();

    localStorage.setItem("playlists", JSON.stringify(playlists));

    location.reload();

}
function previewImage(event){

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload=function(e){

        document.getElementById("previewImage").src=e.target.result;

    }

    reader.readAsDataURL(file);

}