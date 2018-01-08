import {Fighter} from "../entities/fighter";
import {Referee} from "../entities/referee";
import {Helpers} from "../utils/helpers";
import {Logger} from "../utils/logger";

const roundInterval = 1000;
let intervalId;

export default class Game {
    static startGame() {
        Logger.clearLog();
        let firstFighter = new Fighter('Gosho', 100, '');
        let secondFighter = new Fighter('Ivan', 100, '');
        Referee.introduceFighters(firstFighter, secondFighter);

        clearInterval(intervalId);
        intervalId = setInterval(() => {
            Referee.roundSummary(firstFighter, secondFighter);
            const number = Helpers.getRandomNumber(0, 201);
            if (number > 100) {
                secondFighter.health -= firstFighter.hit();
            } else {
                firstFighter.health -= secondFighter.hit();
            }

            if (firstFighter.health <= 0) {
                Referee.declareWinner(secondFighter);
                clearInterval(intervalId);
            }

            if (secondFighter.health <= 0) {
                Referee.declareWinner(firstFighter);
                clearInterval(intervalId)
            }

        }, roundInterval);
    }
}