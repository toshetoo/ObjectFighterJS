import {Referee} from "../entities/referee";
import {Helpers} from "../utils/helpers";
import {Logger} from "../utils/logger";
import Consumable from "./consumables";
import {getFighters} from "../api/mockFighters";

const roundInterval = 500;
let intervalId;

export default class Game {
    static startGame(firstFighter, secondFighter) {
        Logger.clearLog();
        Referee.introduceFighters(firstFighter, secondFighter);

        clearInterval(intervalId);
        intervalId = setInterval(() => {
            Referee.showRoundNumber();
            const number = Helpers.getRandomNumber(0, 201);
            if (number > 100) {
                secondFighter.health -= firstFighter.hit();

                if(number > 149 && number < 160) {
                    const consumable = Consumable.getConsumable();
                    firstFighter.health += consumable.health;
                    const msg = `<div class="consumable text-center">${firstFighter.name} consumed ${consumable.name} which gave gim ${consumable.health} HP.</div>`;
                    Logger.log(msg);
                }
            } else {
                firstFighter.health -= secondFighter.hit();

                if(number > 49 && number < 60) {
                    const consumable = Consumable.getConsumable();
                    secondFighter.health += consumable.health;
                    const msg = `<div class="consumable text-center">${secondFighter.name} consumed ${consumable.name} which gave gim ${consumable.health} HP.</div>`;
                    Logger.log(msg);
                }
            }

            Referee.roundSummary(firstFighter, secondFighter);

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

    static logFighters() {
        return new Promise((resolve) => {
            getFighters().then((fighters) => {
                fighters.forEach(fighter => {
                    Logger.logFighter(fighter, '#choose-fighter');
                });

                resolve(fighters);
            });
        });
    }
}