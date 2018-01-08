import {Fighter} from "../entities/fighter";
import {Referee} from "../entities/referee";
import {Helpers} from "../utils/helpers";
import {Logger} from "../utils/logger";
import Consumable from "./consumables";

const roundInterval = 1000;
let intervalId;

export default class Game {
    static startGame() {
        Logger.clearLog();
        let firstFighter = new Fighter('Gosho', 1000, 'https://r50gh2ss1ic2mww8s3uvjvq1-wpengine.netdna-ssl.com/wp-content/themes/bealearninghero.org/assets/images/dest/home-hero-mosaic.png');
        let secondFighter = new Fighter('Ivan', 1000, 'http://capacitybc.com/Websites/capacitybuilding/images/hero%20icon.png');
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
}