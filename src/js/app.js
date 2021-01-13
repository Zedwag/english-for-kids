import Header from './header';
import Slider from './slider';
import Cards from './cards';
import Statistics from './statistics';
import Footer from './footer';

export default class App {

    constructor() {
        this.menuOpened = false
        this.currentActive = 0
        this.isTrain = true

        this.appElement = document.createElement('div')
        this.appElement.classList.add('container')
        this.header = new Header()
        this.slider = new Slider()
        this.cards = new Cards()
        this.statistics = new Statistics()
        this.footer = new Footer()
        this.headerElement = this.header.header
        this.sliderElement = this.slider.slider
        this.cardsElement = this.cards.cards
        this.statisticsElement = this.statistics.statistics
        this.footerElement = this.footer.footer

        this.appElement.append(this.headerElement)
        this.appElement.append(this.sliderElement)
        this.appElement.append(this.cardsElement)
        this.appElement.append(this.statisticsElement)
        this.appElement.append(this.footerElement)

        this.addEventListeners()
    }

    addEventListeners() {
        this.header.burger.addEventListener('click', () => {
            this.header.burger.classList.add('burger_active')
            this.slider.openMenu()
        })
        this.slider.overlay.addEventListener('click', () => {
            this.header.burger.classList.remove('burger_active')
            this.slider.closeMenu()
        })

        const statisticsItemIdx = 9

        this.slider.menu.childNodes.forEach((element, idx) => {
            if (idx === statisticsItemIdx) {
                element.addEventListener('click', () => {
                    this.statisticsElement.classList.remove('hidden')
                    this.statistics.getAllNamesData()
                    this.statistics.updateStatistics()
                    this.cardsElement.classList.add('hidden')
                    this.header.burger.classList.remove('burger-active')
                    this.slider.closeMenu()
                    this.header.burger.classList.remove('burger_active')
                    this.slider.menu.childNodes.forEach(el => el.classList.remove('menu__item-active'))
                    element.classList.add('menu__item-active')
                })
            }
            else {
                element.addEventListener('click', () => {
                    this.statisticsElement.classList.add('hidden')
                    this.cardsElement.classList.remove('hidden')
                    this.cards.currentPage = idx
                    this.cards.refreshCards()
                    this.header.burger.classList.remove('burger-active')
                    this.slider.closeMenu()
                    this.header.burger.classList.remove('burger_active')
                    this.slider.menu.childNodes.forEach(el => el.classList.remove('menu__item-active'))
                    element.classList.add('menu__item-active')
                    this.currentActive = idx
                })
            }
        })

        this.header.switcherElement.addEventListener('click', () => {
            this.header.switch()
            this.isTrain = !this.isTrain
            this.cards.isTrain = !this.cards.isTrain
            if (this.cards.gameStarted) {
                this.cards.finishGame()
            }
            this.cards.refreshCards()
        })
    }

    get appElement() {
        return this.appElement
    }
}
