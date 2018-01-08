const logElement = $("#log");

export class Logger {
    static log(message) {
        logElement.append(message);
        this.newLine();
    }

    static logObj(obj) {
        let msg = '';

        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                msg += prop + " : " + obj[prop] + "<br>";
            }
        }

        this.log(msg);
        this.newLine();
    }

    static newLine() {
        logElement.append("<br>");
    }

    static clearLog() {
        logElement.innerHTML = '';
    }
}