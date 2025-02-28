
class Node {
    constructor(value) {
        this.value = value; // Storing an object
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    addLast(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }
    addFirst(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }
    printList() {
        let current = this.head;
        const elements = [];
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        console.log(elements);
    }
}


const list = new DoublyLinkedList();
list.addLast({ songName: "Suzume", songPath: "songs/suzume.mp3", coverPath: "images/Suzume.jpg", id: "song1" });
list.addLast({ songName: "Fire", songPath: "songs/fire.mp3", coverPath: "images/fire.jpg", id: "song2" });
list.addLast({ songName: "CO2", songPath: "songs/co2.mp3", coverPath: "images/co2.jpg", id: "song3" });
list.addLast({ songName: "Dusk Till Dawn", songPath: "songs/dusk till dawn.mp3", coverPath: "images/dusk till dawn.jpg", id: "song4" });
list.addLast({ songName: "Bella Ciao", songPath: "songs/bella ciao.mp3", coverPath: "images/bella ciao.jpg", id: "song5" });
list.addLast({ songName: "FireFlies", songPath: "songs/fireflies.mp3", coverPath: "images/fireflies.jpg", id: "song6" });
list.addLast({ songName: "The Nights", songPath: "songs/the nights.mp3", coverPath: "images/the nights.jpg", id: "song7" });


const interchange = () => {
    Array.from(document.getElementsByClassName("SongsPlay")).forEach((element) => {
        element.src = "images/play1.jpg";
    })
}
console.log("Welcome to Melodify")
let myNode = list.head;
let audioElement = new Audio(myNode.value.songPath);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let beats = document.getElementById('beats')
let songInfo = document.getElementById("songInfoText");
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.src = "images/pause.jpg";
        beats.style.opacity = "1";
        document.getElementById(myNode.value.id).src = "images/pause1.jpg";
        songName = myNode.value.songName;
        songInfo.innerText = songName;
    } else {
        interchange();
        audioElement.pause();
        masterPlay.src = "images/play.jpg";
        beats.style.opacity = "0";
    }

})
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

Array.from(document.getElementsByClassName("SongsPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.src.split("/").pop() === "play1.jpg") {
            interchange();
            beats.style.opacity = "1"
            e.target.src = "images/pause1.jpg";
            index = parseInt(e.target.id[4])
            node = list.head;
            for (i = 1; i < index; i++) {
                node = node.next;
            }
            myNode = node;
            audioElement.src = node.value.songPath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.src = "images/pause.jpg";
            songName = myNode.value.songName;
            songInfo.innerText = songName;
        } else {
            e.target.src = "images/play1.jpg";
            audioElement.pause()
            masterPlay.src = "images/play.jpg";
            beats.style.opacity = "0"
        }
    })
})
function previous_song() {
    if (myNode.prev == null) {
        alert("This is the first song");
    } else {
        myNode = myNode.prev;
        interchange();
        audioElement.pause()
        audioElement = new Audio(myNode.value.songPath);
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.src = "images/pause.jpg";
        beats.style.opacity = "1";
        document.getElementById(myNode.value.id).src = "images/pause1.jpg";
        songName = myNode.value.songName;
        songInfo.innerText = songName;
        audioElement.addEventListener('timeupdate', () => {
            console.log('timeupdate')
            progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            myProgressBar.value = progress;
        })

        myProgressBar.addEventListener('change', () => {
            audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
        })
    }
}
document.getElementById("previous-button").addEventListener('click', () => {
    previous_song();
})
function next_song() {
    if (myNode.next == null) {
        alert("This is the last song");
    } else {
        myNode = myNode.next;
        interchange();
        audioElement.pause()
        audioElement = new Audio(myNode.value.songPath);
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.src = "images/pause.jpg";
        beats.style.opacity = "1";
        songName = myNode.value.songName;
        songInfo.innerText = songName;
        document.getElementById(myNode.value.id).src = "images/pause1.jpg";
        audioElement.addEventListener('timeupdate', () => {
            console.log('timeupdate')
            progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            myProgressBar.value = progress;
        })

        myProgressBar.addEventListener('change', () => {
            audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
        })
    }
}
document.getElementById("next-button").addEventListener('click', () => {
    next_song();
})


document.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        event.preventDefault();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.src = "images/pause.jpg";
            beats.style.opacity = "1";
            document.getElementById(myNode.value.id).src = "images/pause1.jpg";
            songName = myNode.value.songName;
            songInfo.innerText = songName;
        } else {
            interchange();
            audioElement.pause();
            masterPlay.src = "images/play.jpg";
            beats.style.opacity = "0";
        }
    } else if (event.key === "ArrowLeft") {
        previous_song();
    } else if (event.key === "ArrowRight") {
        next_song();
    }
});

audioElement.addEventListener('ended', () => {
    next_song();
});


document.addEventListener("DOMContentLoaded", function () {
    var logoutModalEl = document.getElementById("logoutModal");

    if (logoutModalEl) {
        var logoutModal = new bootstrap.Modal(logoutModalEl);

        // Ensure the cancel button properly dismisses the modal
        document.querySelectorAll("[data-bs-dismiss='modal']").forEach(button => {
            button.addEventListener("click", function () {
                logoutModal.hide();
            });
        });

        // Logout button handling
        document.getElementById("confirmLogout").addEventListener("click", function () {
            logoutModal.hide(); // Close modal
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect after a brief delay
            }, 300);
        });
    }
});
