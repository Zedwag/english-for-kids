import {playSound} from "./audio";

export default class Card {

    constructor(word, translation = '', image) {

        this.isHovered = false
        this.isCategory = true
        this.isTrain = true
        this.isInactive = false

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('card')
        this.cardImageElement = document.createElement('img')
        this.cardImageElement.classList.add('card__image')
        this.cardContentElement = document.createElement('div')
        this.cardContentElement.classList.add('card__content')
        this.cardReverseButtonElement = document.createElement('img')
        this.cardReverseButtonElement.classList.add('card__reverse-button')
        this.cardReverseButtonElement.src = 'img/reverse.png'
        this.cardReverseButtonElement.alt = 'reverse'
        this.cardTitleElement = document.createElement('h5')
        this.cardTitleElement.classList.add('card__title')
        this.cardTitleElement.innerText = word
        this.cardContentElement.append(this.cardReverseButtonElement)
        this.cardContentElement.append(this.cardTitleElement)
        this.cardElement.append(this.cardImageElement)
        this.cardElement.append(this.cardContentElement)

        this.setCard(word, translation, image)

        this.cardReverseButtonElement.classList.add('hidden')

        this.addEventListeners()
    }

    addEventListeners() {
        this.cardReverseButtonElement.addEventListener('click', () => {
            this.flipCard()
        })
        this.cardElement.addEventListener('mouseout', event => {
            if (event.toElement === document.querySelector('.cards')) {
                this.unflipCard()
            }
        })
        this.cardElement.addEventListener('click', event => {
            if (event.target !== this.cardReverseButtonElement && !this.isCategory && !this.isHovered && this.isTrain) {
                this.playWord()
                if (localStorage.getItem(`${this.word}_clicks`)) {
                    const clicksAmount = parseInt(localStorage.getItem(`${this.word}_clicks`), 10) +1
                    localStorage.setItem(`${this.word}_clicks`, clicksAmount.toString())
                } else {
                    localStorage.setItem(`${this.word}_clicks`, '1')
                }
            }
        })
    }

    get card() {
        return this.cardElement
    }

    playWord() {
        playSound(this.word)
    }

    hideCardDescription() {
        this.isTrain = false
        this.cardReverseButtonElement.classList.add('hidden')
        this.cardContentElement.classList.add('hidden')
        this.cardTitleElement.classList.add('hidden')
    }

    showCardDescription() {
        this.isTrain = true
        this.cardReverseButtonElement.classList.remove('hidden')
        this.cardContentElement.classList.remove('hidden')
        this.cardTitleElement.classList.remove('hidden')
    }

    flipCard() {
        this.cardElement.classList.add('card-flip')

        const flipDelay = 400

        setTimeout(() => {
            this.cardReverseButtonElement.classList.add('hidden')
            this.cardTitleElement.innerText = this.translation
            this.cardElement.classList.remove('card-flip')
        }, flipDelay)
        setTimeout(() => { this.isHovered = true }, flipDelay + 100)
    }

    unflipCard() {
        if (!this.isHovered) return
        this.cardElement.classList.add('card-flip')

        const unflipDelay = 500

        setTimeout(() => {
            this.cardReverseButtonElement.classList.remove('hidden')
            this.cardTitleElement.innerText = this.word
            this.cardElement.classList.remove('card-flip')
        }, unflipDelay)
        this.isHovered = false
    }

    setCard(word, translation = '', image) {
        this.word = word
        this.translation = translation
        this.url = `https://github.com/Zedwag/tasks/blob/master/tasks/rslang/english-for.kids.data/img/${image}.jpg?raw=true`
        if (translation === '') {
            this.isCategory = true
        } else {
            this.isCategory = false
        }
        this.cardImageElement.alt = this.word
        this.cardImageElement.src = this.url
        this.cardTitleElement.innerText = word
        if (!this.isCategory) {
            this.cardReverseButtonElement.classList.remove('hidden')
        } else {
            this.cardReverseButtonElement.classList.add('hidden')
        }
    }
}
