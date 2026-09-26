/* =====================================================
   INTRO CLEANUP
   ===================================================== */

const introEl =
    document.getElementById("intro");

if (introEl) {

    introEl.addEventListener(
        "animationend",
        function(event) {

            if (event.target === introEl) {

                introEl.style.display = "none";
            }
        }
    );
}


/* =====================================================
   INTRO GIFT TAP — START MUSIC + OPEN GIFT
   ===================================================== */

const giftWrap =
    document.querySelector(".gift-wrap");

if (giftWrap && introEl) {

    giftWrap.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            introEl.classList.add(
                "gift-opened"
            );
        },
        {
            once: true
        }
    );
}


/* =====================================================
   SCENES
   ===================================================== */

const scenes = [
    document.getElementById("scene1"),
    document.getElementById("scene2"),
    document.getElementById("scene3"),
    document.getElementById("scene4"),
    document.getElementById("scene5"),
    document.getElementById("scene6"),
    document.getElementById("scene7"),
    document.getElementById("scene8")
];


/* =====================================================
   BACKGROUND AUDIO / VIDEO
   ===================================================== */

const bgAudioVideo =
    document.getElementById("bgAudioVideo");


function startBackgroundMusic() {

    if (!bgAudioVideo) return;

    /*
       Start the audio from 36 seconds.
       Only the audio is intended to be heard.
    */

    bgAudioVideo.currentTime = 72;

    const playPromise =
        bgAudioVideo.play();

    if (
        playPromise &&
        typeof playPromise.catch === "function"
    ) {

        playPromise.catch(function() {
            /*
               Browser autoplay protection.
               The next user interaction will
               try again.
            */
        });
    }
}


/* =====================================================
   RESTART MUSIC WHEN VIDEO ENDS
   ===================================================== */

if (bgAudioVideo) {

    bgAudioVideo.addEventListener(
        "ended",
        function() {

            bgAudioVideo.currentTime = 72;

            const playPromise =
                bgAudioVideo.play();

            if (
                playPromise &&
                typeof playPromise.catch ===
                    "function"
            ) {

                playPromise.catch(function() {});
            }
        }
    );
}


/* =====================================================
   SHOW SCENE
   ===================================================== */

function showScene(number) {

    scenes.forEach(function(scene) {

        if (!scene) return;

        scene.classList.remove(
            "scene-enter"
        );

        scene.style.display =
            "none";

        scene.style.opacity =
            "0";
    });


    const target =
        scenes[number - 1];

    if (!target) return;


    target.style.display =
        "block";


    /*
       Force the browser to register
       the new scene before animation.
    */

    void target.offsetWidth;


    target.classList.add(
        "scene-enter"
    );


    target.style.opacity =
        "1";


    /*
       Reset Scene 2 whenever it opens.
    */

    if (number === 2) {

        resetMischievousButton();
    }
}


/* =====================================================
   SCENE 1
   ===================================================== */

const openButton =
    document.getElementById(
        "openButton"
    );

const dontOpenButton =
    document.getElementById(
        "dontOpenButton"
    );


if (openButton) {

    openButton.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(4);
        }
    );
}


if (dontOpenButton) {

    dontOpenButton.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(2);
        }
    );
}


/* =====================================================
   SCENE 2
   ===================================================== */

const openButton2 =
    document.getElementById(
        "openButton2"
    );

const dontWantButton =
    document.getElementById(
        "dontWantButton"
    );

const scene2 =
    document.getElementById(
        "scene2"
    );


if (openButton2) {

    openButton2.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(4);
        }
    );
}


/* =====================================================
   MISCHIEVOUS BUTTON VARIABLES
   ===================================================== */

let escapeCount = 0;

let finalReady = false;


const messages = [

    "I don't wanna see 🙄",

    "Nope 😤",

    "Hehehe 😭",

    "Catch me! 👀",

    "Nice try 😂"

];


/* =====================================================
   RESET MISCHIEVOUS BUTTON
   ===================================================== */

function resetMischievousButton() {

    if (!dontWantButton) return;


    escapeCount = 0;

    finalReady = false;


    dontWantButton.innerText =
        "I don't wanna see 🙄";


    /*
       Put the button back into
       the normal HTML layout.
    */

    dontWantButton.style.position =
        "relative";

    dontWantButton.style.left =
        "";

    dontWantButton.style.top =
        "";

    dontWantButton.style.right =
        "";

    dontWantButton.style.bottom =
        "";

    dontWantButton.style.margin =
        "";

    dontWantButton.style.transform =
        "translate(0, 0)";

    dontWantButton.style.animation =
        "";

    dontWantButton.style.zIndex =
        "1000";
}


/* =====================================================
   RUN AWAY — INSIDE SCENE 2
   ===================================================== */

function runAway() {

    if (finalReady) return;


    escapeCount++;


    /*
       Change the button message.
    */

    dontWantButton.innerText =
        messages[escapeCount - 1] ||
        "Okay... 😭💗";


    /*
       Stop any normal animation.
    */

    dontWantButton.style.animation =
        "none";


    /*
       Get Scene 2's actual dimensions.
    */

    const sceneRect =
        scene2.getBoundingClientRect();


    /*
       Get the button's dimensions
       BEFORE moving it.
    */

    const buttonRect =
        dontWantButton.getBoundingClientRect();


    const buttonWidth =
        buttonRect.width;

    const buttonHeight =
        buttonRect.height;


    /*
       IMPORTANT:

       The button is now absolutely positioned
       INSIDE Scene 2.

       It can no longer escape the card.
    */

    dontWantButton.style.position =
        "absolute";


    /*
       Remove the previous transform.
    */

    dontWantButton.style.transform =
        "none";


    /*
       Force layout update.
    */

    void dontWantButton.offsetWidth;


    /*
       Safe distance from the card edge.
    */

    const padding = 15;


    /*
       Entire available Scene 2 area.
    */

    const minX =
        padding;

    const minY =
        padding;


    const maxX =
        Math.max(
            minX,
            scene2.clientWidth -
            buttonWidth -
            padding
        );


    const maxY =
        Math.max(
            minY,
            scene2.clientHeight -
            buttonHeight -
            padding
        );


    /*
       Random position across
       the ENTIRE card.
    */

    const randomX =
        minX +
        Math.random() *
        Math.max(
            1,
            maxX - minX
        );


    const randomY =
        minY +
        Math.random() *
        Math.max(
            1,
            maxY - minY
        );


    /*
       Move the button.
    */

    dontWantButton.style.left =
        randomX + "px";

    dontWantButton.style.top =
        randomY + "px";


    /*
       After five escapes,
       the button finally gives up.
    */

    if (escapeCount >= 5) {

        finalReady = true;


        dontWantButton.innerText =
            "Okay... 😭💗";


        /*
           Give the final position
           a moment before returning
           the button to its normal place.
        */

        setTimeout(function() {

            dontWantButton.style.position =
                "relative";

            dontWantButton.style.left =
                "";

            dontWantButton.style.top =
                "";

            dontWantButton.style.right =
                "";

            dontWantButton.style.bottom =
                "";

            dontWantButton.style.margin =
                "";

            dontWantButton.style.transform =
                "translate(0, 0)";

        }, 350);
    }
}


/* =====================================================
   DESKTOP — MOUSE
   ===================================================== */

if (dontWantButton) {

    dontWantButton.addEventListener(
        "mouseenter",
        function() {

            if (!finalReady) {

                runAway();
            }
        }
    );
}


/* =====================================================
   MOBILE — TOUCH
   ===================================================== */

if (dontWantButton) {

    dontWantButton.addEventListener(
        "touchstart",
        function(event) {

            if (!finalReady) {

                event.preventDefault();

                runAway();
            }
        },
        {
            passive: false
        }
    );
}


/* =====================================================
   FINAL CLICK
   ===================================================== */

if (dontWantButton) {

    dontWantButton.addEventListener(
        "click",
        function() {

            /*
               Do nothing until the button
               has escaped five times.
            */

            if (!finalReady) return;


            /*
               Reset button completely.
            */

            dontWantButton.style.position =
                "relative";

            dontWantButton.style.left =
                "";

            dontWantButton.style.top =
                "";

            dontWantButton.style.right =
                "";

            dontWantButton.style.bottom =
                "";

            dontWantButton.style.margin =
                "";

            dontWantButton.style.transform =
                "translate(0, 0)";

            dontWantButton.style.animation =
                "";

            dontWantButton.style.zIndex =
                "1000";


            /*
               Go to Scene 3.
            */

            showScene(3);
        }
    );
}


/* =====================================================
   SCENE 3
   ===================================================== */

const openButton3 =
    document.getElementById(
        "openButton3"
    );


if (openButton3) {

    openButton3.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(4);
        }
    );
}


/* =====================================================
   SCENE 4
   ===================================================== */

const continueButton4 =
    document.getElementById(
        "continueButton4"
    );


if (continueButton4) {

    continueButton4.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(5);
        }
    );
}


/* =====================================================
   SCENE 5
   ===================================================== */

const nextButton5 =
    document.getElementById(
        "nextButton5"
    );


if (nextButton5) {

    nextButton5.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(6);
        }
    );
}


/* =====================================================
   SCENE 6
   ===================================================== */

const nextButton6 =
    document.getElementById(
        "nextButton6"
    );


if (nextButton6) {

    nextButton6.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(7);
        }
    );
}


/* =====================================================
   SCENE 7 — MEMORY SLIDESHOW
   ===================================================== */

const memoryImage =
    document.getElementById(
        "memoryImage"
    );


const memories = [
    "A.jpg",
    "B.jpg",
    "C.jpg",
    "D.jpg",
    "E.jpg",
    "F.jpg",
    "G.jpg",
    "H.jpg"
];


let memoryIndex = 0;


function changeMemory() {

    if (!memoryImage) return;


    if (!scenes[6]) return;


    /*
       Only change the image while
       Scene 7 is visible.
    */

    if (
        scenes[6].style.display !==
        "none"
    ) {

        memoryIndex =
            (memoryIndex + 1) %
            memories.length;


        /*
           Start fading out first.
        */

        memoryImage.style.opacity =
            "0";

        memoryImage.style.transform =
            "scale(.98)";


        /*
           Change the picture almost immediately
           so there is no noticeable delay.
        */

        setTimeout(function() {

            memoryImage.src =
                memories[memoryIndex];

        }, 100);


        /*
           Fade the new picture in.
        */

        setTimeout(function() {

            memoryImage.style.opacity =
                "1";

            memoryImage.style.transform =
                "scale(1)";

        }, 120);
    }
}


setInterval(
    changeMemory,
    1750
);


/* =====================================================
   SCENE 7 BUTTON
   ===================================================== */

const nextButton7 =
    document.getElementById(
        "nextButton7"
    );


if (nextButton7) {

    nextButton7.addEventListener(
        "click",
        function() {

            startBackgroundMusic();

            showScene(8);
        }
    );
}


/* =====================================================
   INITIAL SETUP
   ===================================================== */

scenes.forEach(function(scene) {

    if (!scene) return;

    scene.style.display =
        "none";

    scene.style.opacity =
        "0";
});


/*
   Start with Scene 1.
*/

showScene(1);
