"use strict"

//Burger menu
 function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document
      .querySelector(".custom_menu-btn")
      .classList.toggle("menu_btn-style");      
}


// Texte scramble source: https://jsfiddle.net/soulwire/08e3dLk2
class TextRotatif {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const longeur = Math.max(oldText.length, newText.length)
    const valeur = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < longeur; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    this.frame = 0
    this.update()
    return valeur
  }
  update() {
    let sortie = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        sortie += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        sortie += `<span class="dud">${char}</span>`
      } 
    }
    this.el.innerHTML = sortie
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}
const phrases = [
  "Profiter de l'application, elle est gratuite !",
  "Tester l'application ci-dessous.",
  "Faites vous aider",
  "N'ayez pas peur d'en parler !",
  "Ce n'est pas un sujet tabou.",
]

const element = document.querySelector('.text')
const tr = new TextRotatif(element)

let compteur = 0
const next = () => {
  tr.setText(phrases[compteur]).then(() => {
    setTimeout(next, 1300)
  })
  compteur = (compteur + 1) % phrases.length
}

next()






