

export default class Footer {

    constructor() {
        this.footerElement = document.createElement('div');
        this.footerElement.classList.add('footer')
        this.footerElement.innerHTML = `
            <div class="footer-content">
                <a href="https://github.com/zedwag/"><img class="logo" src="img/github.png" alt="github logo"></a>
                Aleksandr Kozlovskiy 2020
                <a href="https://rs.school/js/"><img class="logo" src="img/rss.png" alt="rss logo"></a>
            </div>`
    }

    get footer() {
        return this.footerElement
    }
}
