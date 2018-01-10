import {Logger} from "../utils/logger";

let roundCounter = 0;
export class Referee {

    static introduceFighters(first, second) {
        const message = "<div class='intro-div text-center'><h2>Test introduce log</h2></div>";
        Logger.log(message);
        Logger.logFighter(first);
        Logger.logFighter(second);
    }

    static introduceTeams(first, second) {
        const msg = '<div class="intro-div text-center"><h2>Team introduce log</h2></div>';
        Logger.log(msg);
        Logger.logTeam(first);
        Logger.logTeam(second);
    }

    static showRoundNumber() {
        roundCounter++;
        const msg = '<hr><div class="round-summary text-center"><h4>Round ' + roundCounter + ' has started</h4></div>';
        Logger.log(msg);
    }

    static clearRoundNumber() {
        roundCounter = 0;
    }

    static roundSummary(first, second) {
        const msg = `
    <div class="round-summary text-center">
        <div>Health left: ${first.name} : ${first.health}</div>
        <div>Health left: ${second.name} : ${second.health}</div>
        </div>`;
        Logger.log(msg);
    }

    static matchRoundSummary(first, second) {
        let msg = '<div class="round-summary text-center">';
        msg += '<div class="first-team">';
        first.fighters.forEach(f => {
            msg+= ` <div>Health left: ${f.name} : ${f.health}</div>`;
        });
        msg += '</div> <div class="second-team">';
        second.fighters.forEach(f => {
            msg+= ` <div>Health left: ${f.name} : ${f.health}</div>`;
        });
        msg += '</div></div>';

        Logger.log(msg);
    }

    static declareWinner(fighter) {
        const msg = '<div class="winner-div text-center"><h2>Winner is </h2></div>';
        Logger.log(msg);
        Logger.logFighter(fighter);
    }

    static declareWinningTeam(team) {
        const msg = '<div class="winner-div text-center"><h2>The winning team is </h2></div>';
        Logger.log(msg);
        Logger.logTeam(team);
    }
}