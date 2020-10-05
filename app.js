// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAM-fWm5bSJvnPqC17ra_sRkCX_5IRngO4",
    authDomain: "smart-cleaning-db-ab48a.firebaseapp.com",
    databaseURL: "https://smart-cleaning-db-ab48a.firebaseio.com",
    projectId: "smart-cleaning-db-ab48a",
    storageBucket: "smart-cleaning-db-ab48a.appspot.com",
    messagingSenderId: "866300650205",
    appId: "1:866300650205:web:f48daa90c56b261d337134",
    measurementId: "G-MGWSM64RZR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference message collection
var messagesRef = firebase.database().ref("messages");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);
console.log("clicked");

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal("myName");
    var email = getInputVal("myEmail");
    var phone = getInputVal("myPhone");
    var message = getInputVal("myMessage");

    // Save message
    saveMessage(name, email, phone, message);

    // Show alert
    document.querySelector(".alert").style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(function() {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // Clear form
    document.getElementById("contactForm").reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        phone: phone,
        message: message,
    });
}

// Displaying a humburger on small screens

const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});


menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});

var tabs = document.querySelectorAll(".tabs ul li");
var tab_wraps = document.querySelectorAll(".tab_wrap");

tabs.forEach(function(tab, tab_index) {
    tab.addEventListener("click", function() {
        tabs.forEach(function(tab) {
            tab.classList.remove("active");
        })
        tab.classList.add("active");

        tab_wraps.forEach(function(content, content_index) {
            if (content_index == tab_index) {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        })

    })
})

var slideIndex, slides, dots, captionText;

function initGallery() {
    slideIndex = 0;
    slides = document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity = 1;



    //disable nextPrevBtn if slide count is one
    if (slides.length < 2) {
        var nextPrevBtns = document.querySelector(".leftArrow,.rightArrow");
        nextPrevBtns.style.display = "none";
        for (i = 0; i < nextPrevBtn.length; i++) {
            nextPrevBtn[i].style.display = "none";
        }
    }

    //add dots
    dots = [];
    var dotsContainer = document.getElementById("dotsContainer"),
        i;
    for (i = 0; i < slides.length; i++) {
        var dot = document.createElement("span");
        dot.classList.add("dots");
        dotsContainer.append(dot);
        dot.setAttribute("onclick", "moveSlide(" + i + ")");
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");
}
initGallery();

function plusSlides(n) {
    moveSlide(slideIndex + n);
}

function moveSlide(n) {
    var i;
    var current, next;
    var moveSlideAnimClass = {
        forCurrent: "",
        forNext: ""
    };
    var slideTextAnimClass;
    if (n > slideIndex) {
        if (n >= slides.length) {
            n = 0;
        }
        moveSlideAnimClass.forCurrent = "moveLeftCurrentSlide";
        moveSlideAnimClass.forNext = "moveLeftNextSlide";
        slideTextAnimClass = "slideTextFromTop";
    } else if (n < slideIndex) {
        if (n < 0) {
            n = slides.length - 1;
        }
        moveSlideAnimClass.forCurrent = "moveRightCurrentSlide";
        moveSlideAnimClass.forNext = "moveRightPrevSlide";
        slideTextAnimClass = "slideTextFromBottom";
    }

    if (n != slideIndex) {
        next = slides[n];
        current = slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "imageHolder";
            slides[i].style.opacity = 0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex = n;
        captionText.style.display = "none";
        captionText.className = "captionText " + slideTextAnimClass;
        captionText.innerText = slides[n].querySelector(".captionText").innerText;
        captionText.style.display = "block";
    }

}
var timer = null;

function setTimer() {
    timer = setInterval(function() {
        plusSlides(1);
    }, 3000);
}
setTimer();

function playPauseSlides() {
    var playPauseBtn = document.getElementById("playPause");
    if (timer == null) {
        setTimer();
        playPauseBtn.style.backgroundPositionY = "0px"
    } else {
        clearInterval(timer);
        timer = null;
        playPauseBtn.style.backgroundPositionY = "-33px"
    }
}