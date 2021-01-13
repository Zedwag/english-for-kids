import cardsData from "./cards-data";

export default class Statistics {

    constructor() {

        this.data = cardsData
        this.allWordsData = []

        this.currentSort = 'category'
        this.reversed = false

        this.tableContainer = document.createElement('div');
        this.tableContainer.classList.add('table-container', 'hidden')
        this.table = document.createElement('table')
        this.table.classList.add('table')
        this.tableContainer.append(this.table)
        this.firstTableRow = document.createElement('tr')
        this.table.append(this.firstTableRow)
        this.firstTableRow.innerHTML = `
            <th class="col1">Word</th>
            <th class="col2">Category</th>
            <th class="col3">Translation</th>
            <th class="col4">Clicks</th>
            <th class="col5">Correct</th>
            <th class="col6">Wrong</th>
            <th class="col7">Correctness</th>
        `
        for (let i = 0; i < 64; i+= 1) {
            const row = document.createElement('tr')
            this.table.append(row)
        }

        this.firstTableRow.childNodes.forEach((element, idx) => {
            switch (idx) {
                case 1:
                    element.addEventListener('click', () => this.sortByName())
                    break
                case 3:
                    element.addEventListener('click', () => this.sortByCategory())
                    break
                case 5:
                    element.addEventListener('click', () => this.sortByTranslation())
                    break
                case 7:
                    element.addEventListener('click', () => this.sortByClicks())
                    break
                case 9:
                    element.addEventListener('click', () => this.sortByCorrects())
                    break
                case 11:
                    element.addEventListener('click', () => this.sortByWrongs())
                    break
                case 13:
                    element.addEventListener('click', () => this.sortByPercents())
                    break
                default:
                    break
            }
        })
        this.getAllNamesData()
        this.updateStatistics()
    }

    getAllNamesData() {
        this.allWordsData = this.data.slice(1).flat(1)

        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                this.allWordsData[i * 8 + j].category = this.data[0][i].word
            }
        }

        this.allWordsData.forEach((element, idx) => {

            let clicks
            if (localStorage.getItem(`${element.word}_clicks`)) {
                clicks = localStorage.getItem(`${element.word}_clicks`)
            }  else {
                clicks = 0
            }
            this.allWordsData[idx].clicks = clicks
            let correct
            if (localStorage.getItem(`${element.word}_correct`)) {
                correct = localStorage.getItem(`${element.word}_correct`)
            }  else {
                correct = 0
            }
            this.allWordsData[idx].correct = correct
            let wrong
            if (localStorage.getItem(`${element.word}_wrong`)) {
                wrong = localStorage.getItem(`${element.word}_wrong`)
            }  else {
                wrong = 0
            }
            this.allWordsData[idx].wrong = wrong
            let percent
            if (correct > 0) {
                if (wrong > 0) {
                    percent = Math.floor(100 * parseInt(correct,10) / (parseInt(correct,10) + parseInt(wrong,10)))
                } else {
                    percent = 100
                }
            } else {
                percent = 0
            }
            this.allWordsData[idx].percent = percent
        })
    }

    sortByName() {
        this.getAllNamesData()
        this.allWordsData.sort((a, b) => a.word - b.word)
        if (this.currentSort === 'name') {
            this.reversed = !this.reversed
        }
        if (this.reversed) {
            this.allWordsData.reverse()
        }
        this.currentSort = 'name'
        this.updateStatistics()
    }

    sortByCategory() {
        this.getAllNamesData()
        this.allWordsData.sort((a, b) => a.category - b.category)
        if (this.currentSort === 'category') {
            this.reversed = !this.reversed
        }
        if (this.reversed) {
            this.allWordsData.reverse()
        }
        this.currentSort = 'category'
        this.updateStatistics()
    }

    sortByTranslation() {
        this.getAllNamesData()
        this.allWordsData.sort((a, b) => a.translation - b.translation)
        if (this.currentSort === 'translation') {
            this.reversed = !this.reversed
        }
        if (this.reversed) {
            this.allWordsData.reverse()
        }
        this.currentSort = 'translation'
        this.updateStatistics()
    }

    sortByClicks() {
        this.getAllNamesData()
        this.allWordsData.sort((a, b) => parseInt(a.clicks, 10) < parseInt(b.clicks, 10) ?  1 : -1)
        if (this.currentSort === 'clicks') {
            this.reversed = !this.reversed
        }
        if (this.reversed) {
            this.allWordsData.reverse()
        }
        this.currentSort = 'clicks'
        this.updateStatistics()
    }

    sortByCorrects() {
        this.getAllNamesData()
        this.allWordsData.sort((a, b) => parseInt(a.correct, 10) < parseInt(b.correct, 10) ?  1 : -1)
        if (this.currentSort === 'corrects') {
            this.reversed = !this.reversed
        }
        if (this.reversed) {
            this.allWordsData.reverse()
        }
        this.currentSort = 'corrects'
        this.updateStatistics()
    }

    sortByWrongs() {
        this.getAllNamesData()
        this.allWordsData.sort((a, b) => parseInt(a.wrong, 10) < parseInt(b.wrong, 10) ?  1 : -1)
        if (this.currentSort === 'wrongs') {
            this.reversed = !this.reversed
        }
        if (this.reversed) {
            this.allWordsData.reverse()
        }
        this.currentSort = 'wrongs'
        this.updateStatistics()
    }

    sortByPercents() {
        this.getAllNamesData()
        this.allWordsData.sort((a, b) => parseInt(a.percent, 10) < parseInt(b.percent, 10) ?  1 : -1)
        if (this.currentSort === 'percents') {
            this.reversed = !this.reversed
        }
        if (this.reversed) {
            this.allWordsData.reverse()
        }
        this.currentSort = 'percents'
        this.updateStatistics()
    }

    updateStatistics() {

        let num = 1
        for (let i = 0; i < 64; i += 1) {
            const row = this.table.childNodes[num]

            row.innerHTML = `
                <td>${this.allWordsData[i].word}</td>
                <td>${this.allWordsData[i].category}</td>
                <td>${this.allWordsData[i].translation}</td>
                <td>${this.allWordsData[i].clicks}</td>
                <td>${this.allWordsData[i].correct}</td>
                <td>${this.allWordsData[i].wrong}</td>
                <td>${this.allWordsData[i].percent}%</td>`

            num += 1
        }
    }

    get statistics() {
        return this.tableContainer
    }
}
