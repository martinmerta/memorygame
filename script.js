const cardsColor = ['asp', 'asp', 'cplusplus', 'cplusplus', 'csharp', 'csharp', 'java', 'java', 'js', 'js', 'perl', 'perl', 'php', 'php', 'python', 'python', 'ruby', 'ruby'];
let cards = document.querySelectorAll('div');
cards = [...cards];
let activeCard = "";
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;
const startTime = new Date().getTime();

const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) {
        return
    }
    activeCard.classList.remove('hidden');
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach(card => {
            card.removeEventListener('click', clickCard);
        })
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add('off'))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains('off'))
                if (gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Great !! Your Time: ${gameTime} sec`)
                    location.reload();
                }
            } else {
                activeCards.forEach(card => card.classList.add('hidden'))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener('click', clickCard))
        }, 1000)
    }
}
const init = () => {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    })
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener('click', clickCard)
        })
    }, 1000)
}
init()