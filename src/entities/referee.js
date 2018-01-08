import {Logger} from "../utils/logger";

let roundCounter = 0;
export class Referee {

    static introduceFighters(first, second) {
        const message = "Test introduce log";
        Logger.log(message);
        Logger.logObj(first);
        Logger.logObj(second);
    }

    static roundSummary(first, second) {
        roundCounter++;
        const msg = 'Round ' + roundCounter + ' has finished';
        Logger.log(msg);
        // Logger.log('---------');
        // Logger.logObj(first);
        // Logger.logObj(second)
    }

    static declareWinner(fighter) {
        const msg = 'Winner is ';
        Logger.log(msg);
        Logger.logObj(fighter);
    }
}