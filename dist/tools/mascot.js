import { createLogUpdate } from "log-update";
import color from 'picocolors';
class Mascot {
    mouthExpressions = [` ${color.cyan("◡")} `, ` ${color.cyan("○")} `, ` ${color.cyan("▬")} `, ` ${color.cyan("●")} `];
    eyesExpressions = ["0", "U"];
    moodExpression = {
        happy: `^ ${color.cyan("▽")} ^`,
    };
    mascot = '';
    log;
    interval;
    duration = 50;
    eye = this.eyesExpressions[0];
    mouth = this.mouthExpressions[0];
    constructor() {
        this.log = createLogUpdate(process.stdout, { showCursor: false });
        this.mascot = `
  ____    |\\/|
  \\  /\\   / ..__.
   \\/  \\__\\   _/
    \\__   __  \\_     
       \\____\\___\\`;
    }
    say(messages) {
        let messagesClone, words, message, wordIndex;
        function setNewMessages(currentMessages = messages) {
            messagesClone = [...currentMessages];
            words = messagesClone.shift()?.split(" ");
            message = "";
            wordIndex = 0;
        }
        setNewMessages();
        return new Promise((resolve, reject) => {
            const updateMessage = () => {
                if (words === undefined) {
                    return;
                }
                const word = words[wordIndex];
                message = `${message} ${word}`;
                this.setTalkAnimation(message);
                wordIndex++;
                if (wordIndex === words.length) {
                    clearInterval(this.interval);
                    if (messagesClone.length > 0)
                        setTimeout(() => {
                            setNewMessages(messagesClone);
                            this.interval = setInterval(updateMessage, this.duration);
                        }, 1000);
                    if (messagesClone.length === 0) {
                        resolve();
                    }
                }
            };
            this.interval = setInterval(updateMessage, this.duration);
        });
    }
    setTalkAnimation(message) {
        let mouth;
        mouth = this.mouthExpressions[Math.floor(Math.random() * this.mouthExpressions.length)];
        this.log(`${color.magenta(this.mascot)} ${color.yellow(message)}`);
    }
    clear() {
        clearInterval(this.interval);
        this.log.clear();
    }
}
export default Mascot;
