const timer = [
    {
        className: "days",
        label: "Days",
    },
    {
        className: "hours",
        label: "Hours",
    },
    {
        className: "minutes",
        label: "Minutes",
    },
    {
        className: "seconds",
        label: "Seconds",
    },
];


const countdownContianer = document.querySelector('.countdown');

const countToDate = new Date("Oct 5,2023 22:59:59").getTime();

let previous;

function showTimer() {
    timer.forEach((e) => {
        const div = document.createElement('div');
        div.classList.add(e.className);
        div.innerHTML = `
        <div class="countdown-font">
            <div class="top">00</div>
            <div class="bottom">00</div>
        </div>
        <p class="description">${e.label}</p>
        `;

        countdownContianer.append(div);
    });
}

showTimer();

setInterval(() => {
    //Get date Now 
    let currentDate = new Date().getTime();

    //find the difference between now and countdown date

    let dateDiff = Math.floor(countToDate - currentDate);

    if (dateDiff !== previous) {
        flipAllCards(dateDiff);
    }
    previous = dateDiff;
}, 1000);

function flipAllCards(time) {
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours = Math.floor(time / (1000 * 60 * 60) % 24);
    let minutes = Math.floor(time / (1000 * 60) % 60);
    let seconds = Math.floor(time / (1000) % 60);

    const daysCard = document.querySelector('.days > .countdown-font');
    const hoursCard = document.querySelector('.hours > .countdown-font');
    const minutesCard = document.querySelector('.minutes > .countdown-font');
    const secondsCard = document.querySelector('.seconds > .countdown-font');

    flipCards(daysCard, days);
    flipCards(hoursCard, hours);
    flipCards(minutesCard, minutes);
    flipCards(secondsCard, seconds);
}

function flipCards(flipCard, time){
    time = String(time).padStart(2, "0")
    const currentValue = flipCard.querySelector('.top').innerText;

    if (time === currentValue) return;

    const topFlip = document.createElement('div')
    topFlip.classList.add('top-flip')
    topFlip.innerText = currentValue;

    const bottomFlip = document.createElement('div')
    bottomFlip.classList.add('bottom-flip')
    bottomFlip.innerText = time;

    const topHalf=flipCard.querySelector('.top')
    const bottomHalf=flipCard.querySelector('.bottom')

    topFlip.addEventListener('animationstart', () => {
        topHalf.innerText=time
    })

    topFlip.addEventListener('animationend', () => {
        topFlip.remove()

    })

    bottomFlip.addEventListener('animationend', () => {
        bottomHalf.innerText = time
        bottomFlip.remove()
    })

    flipCard.appendChild(topFlip)
    flipCard.appendChild(bottomFlip)
}

