

export default class Header {

    constructor() {

        this.isTrain = true

        this.headerElement = document.createElement('div');
        this.headerElement.classList.add('header')
        this.headerElement.innerHTML = `
            <img class="burger" src="img/burger.png" alt="burger menu">
            <h1 class="title">English for Kids</h1>
            <div class="mode">
                <span class="mode__train">Train</span>
                <div class="mode__switch_container">
                    <div class="mode__switch"></div>
                </div>
                <span class="mode__play">Play</span>
            </div>`

        const switchElement = this.headerElement.childNodes[5].childNodes[3].childNodes[1]
        this.switcherElement = switchElement

    }

    switch() {
        if (this.isTrain) {
            this.switcherElement.classList.add('mode__switch-play')
            this.isTrain = false
        } else {
            this.switcherElement.classList.remove('mode__switch-play')
            this.isTrain = true
        }
    }

    get header() {
        return this.headerElement
    }

    get burger() {
        return this.headerElement.childNodes[1]
    }
}
