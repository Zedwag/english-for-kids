const playSound = (word) => {
    const audio = new Audio(`https://wooordhunt.ru/data/sound/sow/us/${word}.mp3`)
    audio.play()
}

const playSoundFile = (word) => {
    const audio = new Audio(`audio/${word}.mp3`)
    audio.play()
}

export {
    playSound,
    playSoundFile
}
