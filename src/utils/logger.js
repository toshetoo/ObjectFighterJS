let logElement = $("#log");

export class Logger {
    static setLogHolder(el) {
        logElement = $(el);
    }

    static log(message) {
        logElement.append(message);
    }

    static logFighter(obj, el) {
        let msg = `
            <div class="details-holder" data-id="${obj.id}" draggable="true">
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

        if(el) {
            $(el).append(msg);
        } else {
            this.log(msg);
        }
    }

    static logTeam(team, el) {
        let msg = `<div class="team-holder ${team.id}"></div>`;

        if(el) {
            $(el).append(msg);
        } else {
            this.log(msg);
        }

        let teamHolder = $(`.${team.id}`);
        for(let fighter of team.fighters) {
            this.logFighter(fighter, teamHolder);
        }
    }

    static newLine() {
        logElement.append("<br>");
    }

    static clearLog() {
        logElement.innerHTML = '';
    }
}