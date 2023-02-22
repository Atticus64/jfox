import { stdout } from "process";
import { createLogUpdate } from "log_update"
import color from "picocolors"

export class Mascot {
  mascot = '';
  log;
  interval: NodeJS.Timer;
  duration: number = 50

  constructor() {
    this.log = createLogUpdate(stdout, { showCursor: false })
    this.mascot = `
  ____    |\\/|
  \\  /\\   / ..__.
   \\/  \\__\\   _/
    \\__   __  \\_     
       \\____\\___\\`
  }

  async say(messages: string[]) {

    let messagesClone: string[], words: string[] | undefined, message: string, wordIndex: number;

    function setNewMessages(currentMessages = messages) {
      messagesClone = [...currentMessages]
      words = messagesClone.shift()?.split(" ");
      message = "";
      wordIndex = 0;
    }

    setNewMessages()

    return new Promise<void>((resolve, reject) => {

      const updateMessage = () => {
        if (words === undefined) {
          return
        }
        const word = words[wordIndex]
        message = `${message} ${word}`
        this.setTalkAnimation(message)
        wordIndex++;

        if (wordIndex === words.length) {
          clearInterval(this.interval)
          if (messagesClone.length > 0) setTimeout(() => {
            setNewMessages(messagesClone)
            this.interval = setInterval(updateMessage, this.duration)
          }, 1000)
          if (messagesClone.length === 0) {
            resolve()
          }
        }
      }

      this.interval = setInterval(updateMessage, this.duration)
    })

  }

  setTalkAnimation(message: string) {

    this.log(`${color.magenta(this.mascot)} ${color.yellow(message)}`)

  }

  clear() {
    clearInterval(this.interval)
    this.log.clear();
  }
}

export default Mascot
