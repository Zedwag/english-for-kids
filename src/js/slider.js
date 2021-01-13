export default class Slider {

    constructor() {
        this.sliderElement = document.createElement('div');
        this.sliderElement.classList.add('slider')
        this.overlayElement = document.createElement('div')
        this.menuElement = document.createElement('nav')
        this.sliderElement.append(this.overlayElement)
        this.sliderElement.append(this.menuElement)
        this.menuElement.classList.add('menu')
        this.overlayElement.classList.add('overlay', 'hidden')
        const names = ['Main menu', 'Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Family', 'Nature', 'Statistics']
        names.forEach(el => {
            const menuItem = document.createElement('span')
            menuItem.innerText = el
            menuItem.classList.add('menu__item')
            this.menuElement.append(menuItem)
        })
        this.menuElement.childNodes[0].classList.add('menu__item-active')
    }

    openMenu() {
        this.overlayElement.classList.remove('hidden')
        this.menuElement.style.left = '0';
    }

    closeMenu() {
        this.overlayElement.classList.add('hidden')
        this.menuElement.style.left = '-15rem';
    }

    get slider() {
        return this.sliderElement
    }

    get menu() {
        return this.menuElement
    }

    get overlay() {
        return this.overlayElement
    }
}
