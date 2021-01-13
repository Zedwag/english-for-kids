import Card from "./card";
import cardsData from "./cards-data";
import { playSoundFile } from "./audio";

export default class Cards {

    constructor() {

        this.currentPage = 0
        this.isTrain = true
        this.gameStarted = false
        this.gameCardsOrder = []
        this.allCards = []
        this.playSoundFile = playSoundFile

        this.createCardsElements()
        this.createGameElements()

    }

    createCardsElements() {
        this.cardsElement = document.createElement('div');
        this.cardsElement.classList.add('cards')
        for (let i =0; i < 8; i +=1) {
            const { word, translation, image } = cardsData[0][i]
            const card = new Card(word, translation, image)
            this.cardsElement.append(card.card)
            this.allCards.push(card)

        }
        this.cardsElement.childNodes.forEach((element, idx) => {
            element.addEventListener('click', () => {
                if (this.currentPage === 0) {
                    this.currentPage = idx + 1
                    this.refreshCards()
                    const menuItems = document.querySelectorAll('.menu__item')
                    menuItems.forEach(el => el.classList.remove('menu__item-active'))
                    menuItems[idx + 1].classList.add('menu__item-active')
                }
                if (this.gameStarted && !this.allCards[idx].isInactive) {
                    if (this.allCards[idx].word === this.allCards[this.gameCardsOrder[0]].word) {
                        this.playSuccess()

                        if (localStorage.getItem(`${this.allCards[idx].word}_correct`)) {
                            const correctAmount = parseInt(localStorage.getItem(`${this.allCards[idx].word}_correct`), 10) +1
                            localStorage.setItem(`${this.allCards[idx].word}_correct`, correctAmount.toString())
                        } else {
                            localStorage.setItem(`${this.allCards[idx].word}_correct`, '1')
                        }

                        element.classList.add('card_inactive')
                        const yesIcon = document.createElement('img')
                        yesIcon.classList.add('yes')
                        yesIcon.src = ('img/yes.png')
                        yesIcon.alt = 'yes'
                        this.gameScoreElement.append(yesIcon)
                        const maxCorrectAnswers = 8
                        if (this.gameScoreElement.childNodes.length === maxCorrectAnswers) {
                            this.gameScoreElement.removeChild(this.gameScoreElement.childNodes[0])
                        }

                        this.allCards[idx].isInactive = true
                        this.successCounter += 1
                        this.gameCardsOrder.shift()
                        if (this.successCounter === 8) {
                            setTimeout(() => this.finishGame(), 500)
                        } else {
                            setTimeout(() => this.playNextWord(), 1000)
                        }
                    } else {
                        this.playError()

                        if (localStorage.getItem(`${this.allCards[idx].word}_wrong`)) {
                            const wrongAmount = parseInt(localStorage.getItem(`${this.allCards[idx].word}_wrong`), 10) +1
                            localStorage.setItem(`${this.allCards[idx].word}_wrong`, wrongAmount.toString())
                        } else {
                            localStorage.setItem(`${this.allCards[idx].word}_wrong`, '1')
                        }

                        const noIcon = document.createElement('img')
                        noIcon.classList.add('no')
                        noIcon.src = ('img/no.png')
                        noIcon.alt = 'no'
                        this.gameScoreElement.append(noIcon)
                        if (this.gameScoreElement.childNodes.length > 8) {
                            this.gameScoreElement.removeChild(this.gameScoreElement.childNodes[0])
                        }
                        this.errorCounter += 1
                    }
                }
            })
        })
    }

    createGameElements() {
        this.gameContainerElement = document.createElement('div')
        this.gameScoreElement = document.createElement('div')
        this.gameStartButton = document.createElement('button')
        this.gameContainerElement.classList.add('game', 'hidden')
        this.gameScoreElement.classList.add('game__score')
        this.gameStartButton.classList.add('game__start-button')
        this.gameStartButton.innerText = 'Start game'
        this.cardsElement.append(this.gameContainerElement)
        this.gameContainerElement.append(this.gameScoreElement)
        this.gameContainerElement.append(this.gameStartButton)

        this.gameStartButton.addEventListener('click', () => {
            if (this.gameCardsOrder.length === 0) {
                this.startGame()
            } else {
                this.playNextWord()
            }
        })
    }

    startGame() {
        this.gameStartButton.innerText = 'Repeat'
        this.gameStartButton.classList.add('game__start-button_game')
        this.gameCardsOrder = [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5)
        this.gameStarted = true
        this.isTrain = false
        this.playNextWord()
        this.successCounter = 0
        this.errorCounter = 0
    }

    playNextWord() {
        if (this.allCards[this.gameCardsOrder[0]]) {
            this.allCards[this.gameCardsOrder[0]].playWord()
        }
    }

    playSuccess() {
        this.playSoundFile('success')
    }

    playError() {
        this.playSoundFile('error')
    }

    playWin() {
        this.playSoundFile('win')
    }

    playLose() {
        this.playSoundFile('lose')
    }

    finishGame() {
        if (this.successCounter === 8) {
            const endGame = document.createElement('div')
            endGame.classList.add('end-game')
            const endGameImage = document.createElement('img')
            endGameImage.classList.add('end-game__image')
            const endGameTitle = document.createElement('h2')
            endGameTitle.classList.add('end-game__title')
            endGame.append(endGameImage)
            endGame.append(endGameTitle)

            if (this.errorCounter > 0) {
                this.playLose()
                endGameTitle.innerText = `You have made ${this.errorCounter} mistakes!`
                endGameImage.src = "img/lose.png"
                endGameImage.alt = "lose"
            } else {
                this.playWin()
                endGameImage.src = "img/win.png"
                endGameImage.alt = "win"
            }
            document.querySelector('.container').append(endGame)
            setTimeout(() => document.querySelector('.container').removeChild(endGame), 5000)

            this.currentPage = 0
        }

        this.gameCardsOrder = []
        this.gameStarted = false
        this.gameStartButton.innerText = 'Start game'
        this.gameStartButton.classList.remove('game__start-button_game')
        this.gameScoreElement.innerHTML = ''
        this.refreshCards()
    }

    refreshCards() {
        this.cardsElement.childNodes.forEach((card, idx) => {
            card.classList.remove('card_inactive')
            if (idx !== 8) {
                this.allCards[idx].isInactive = false
            }
        })

        this.cardsElement.classList.add('invisible')
        this.allCards.forEach((card, idx) => {
            const { word, translation, image } = cardsData[this.currentPage][idx]
            card.setCard(word, translation, image)
            if (!this.isTrain && this.currentPage !== 0) {
                card.hideCardDescription()
                card.card.classList.add('card_game')
                card.cardImageElement.classList.add('card__image_game')
                this.gameContainerElement.classList.remove('hidden')
            } else {
                card.showCardDescription()
                card.card.classList.remove('card_game')
                card.cardImageElement.classList.remove('card__image_game')
                this.gameContainerElement.classList.add('hidden')
            }
        })
        setTimeout(() => this.cardsElement.classList.remove('invisible'), 1000)
    }

    get cards() {
        return this.cardsElement
    }
}
