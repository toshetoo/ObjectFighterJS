const logElement = $("#log");

export class Logger {
    static log(message) {
        logElement.append(message);
    }

    static logFighter(obj) {
        let msg = `
            <div class="details-holder">
                <div class="row">
                    <div class="col-xs-2">
                        <div class="img"><img src="${obj.image}"></div>
                    </div>
                    <div class="col-xs-9">
                        <div class="name">Name: ${obj.name}</div>
                        <div class="health">Health: ${obj.health}</div>
                        <div class="strength">Strength: ${obj.strength}</div>
                    </div>
                </div>               
            </div>
        `;

        this.log(msg);
    }

    static newLine() {
        logElement.append("<br>");
    }

    static clearLog() {
        logElement.innerHTML = '';
    }
}