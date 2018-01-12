import {Referee} from "../entities/referee";
import {Helpers} from "../utils/helpers";
import {Logger} from "../utils/logger";
import Consumable from "./consumables";
import {getFighters} from "../api/mockFighters";
import GameEvent from "./GameEvent";

const roundInterval = 1500;
let intervalId;
let event;
let selectedTeam;

export default class Game {
    static startGame(firstFighter, secondFighter) {
        Logger.clearLog();
        Referee.introduceFighters(firstFighter, secondFighter);

        clearInterval(intervalId);
        intervalId = setInterval(() => {
            Referee.showRoundNumber();
            const number = Helpers.getRandomNumber(0, 201);
            if(number > 80 && number < 120 && !event) {
                event = GameEvent.generateEvent();
                event.logEvent();
                if(event.isGlobal) {
                    event.effect([firstFighter, secondFighter]);
                } else if(event.isTeamEvent) {
                    if(!selectedTeam) {
                        selectedTeam = Helpers.getRandomNumber(1,2);
                    }

                    selectedTeam === 1 ? event.effect([firstFighter]) : event.effect([secondFighter])
                }

                event.roundsLeft -=1;
            }

            if(event && event.roundsLeft > 0) {
                if(event.isGlobal) {
                    event.effect([firstFighter, secondFighter]);
                } else if(event.isTeamEvent) {
                    if(!selectedTeam) {
                        selectedTeam = Helpers.getRandomNumber(1,2);
                    }

                    selectedTeam === 1 ? event.effect([firstFighter]) : event.effect([secondFighter])
                }

                event.roundsLeft -=1;
            }

            if(event && event.roundsLeft === 0) {
                event = undefined;
                selectedTeam = undefined;
            }


            if (number > 100) {
                secondFighter.health -= firstFighter.hit();

                if (number > 149 && number < 160) {
                    const consumable = Consumable.getConsumable();
                    firstFighter.health += consumable.health;
                    const msg = `<div class="consumable text-center">${firstFighter.name} consumed ${consumable.name} which gave gim ${consumable.health} HP.</div>`;
                    Logger.log(msg);
                }
            } else {
                firstFighter.health -= secondFighter.hit();

                if (number > 49 && number < 60) {
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

    static startTeamMatch(teamOne, teamTwo) {
        Logger.clearLog();
        Referee.introduceTeams(teamOne, teamTwo);

        clearInterval(intervalId);

        intervalId = setInterval(() => {
            Referee.showRoundNumber();
            const number = Helpers.getRandomNumber(0, 1001);


            if(number > 460 && number < 540 && !event) {
                event = GameEvent.generateEvent();
                event.logEvent();
                if(event.isGlobal) {
                    event.effect(teamOne.fighters);
                    event.effect(teamTwo.fighters);
                } else if(event.isTeamEvent) {
                    if(!selectedTeam) {
                        selectedTeam = Helpers.getRandomNumber(1,2);
                    }

                    selectedTeam === 1 ? event.effect(teamOne.fighters) : event.effect(teamTwo.fighters)
                }

                event.roundsLeft -=1;
            }

            if(event && event.roundsLeft > 0) {
                if(event.isGlobal) {
                    event.effect(teamOne.fighters);
                    event.effect(teamTwo.fighters);
                } else if(event.isTeamEvent) {
                    if(!selectedTeam) {
                        selectedTeam = Helpers.getRandomNumber(1,2);
                    }

                    selectedTeam === 1 ? event.effect(teamOne.fighters) : event.effect(teamTwo.fighters)
                }

                event.roundsLeft -=1;
            }

            if(event && event.roundsLeft === 0) {
                event = undefined;
                selectedTeam = undefined;
            }

            if (number < 500) {
                for(let i=0; i<teamOne.fighters.length; i++) {
                    let fighter = teamOne.fighters[i];

                    let randomEnemy = teamTwo.fighters[Helpers.getRandomNumber(0, teamTwo.fighters.length - 1)];
                    Logger.log(`${fighter.name} attacked ${randomEnemy.name}.`);
                    randomEnemy.health -= fighter.hit();

                    if (randomEnemy.health <= 0) { // remove dead fighter
                        let index = teamTwo.fighters.map(f => {
                            return f.id
                        }).indexOf(randomEnemy.id);
                        teamTwo.fighters.splice(index, 1);
                    }

                    if (teamTwo.fighters.length === 0) break;
                }

                let specialAttack = Helpers.getRandomNumber(0, 100);
                if (specialAttack > 60 && specialAttack < 80) {
                    const consumable = Consumable.getConsumable();
                    let randomFighter = teamOne.fighters[Helpers.getRandomNumber(0, teamOne.fighters.length - 1)];
                    randomFighter.health += consumable.health;

                    const msg = `<div class="consumable text-center">${randomFighter.name} consumed ${consumable.name} which gave gim ${consumable.health} HP.</div>`;
                    Logger.log(msg);
                }
            } else {
                for(let i=0; i<teamTwo.fighters.length; i++) {
                    let fighter = teamTwo.fighters[i];

                    let randomEnemy = teamOne.fighters[Helpers.getRandomNumber(0, teamOne.fighters.length - 1)];
                    Logger.log(`${fighter.name} attacked ${randomEnemy.name}.`);
                    randomEnemy.health -= fighter.hit();

                    if (randomEnemy.health <= 0) { // remove dead fighter
                        let index = teamOne.fighters.map(f => {
                            return f.id
                        }).indexOf(randomEnemy.id);
                        teamOne.fighters.splice(index, 1);
                    }

                    if (teamOne.fighters.length === 0) break;
                }

                let specialAttack = Helpers.getRandomNumber(0, 100);
                if (specialAttack > 60 && specialAttack < 80) {
                    const consumable = Consumable.getConsumable();
                    let randomFighter = teamTwo.fighters[Helpers.getRandomNumber(0, teamTwo.fighters.length - 1)];
                    randomFighter.health += consumable.health;

                    const msg = `<div class="consumable text-center">${randomFighter.name} consumed ${consumable.name} which gave gim ${consumable.health} HP.</div>`;
                    Logger.log(msg);
                }
            }

            Referee.matchRoundSummary(teamOne, teamTwo);

            if (teamOne.fighters.length === 0) {
                Referee.declareWinningTeam(teamTwo);
                clearInterval(intervalId);
            }

            if (teamTwo.fighters.length === 0) {
                Referee.declareWinningTeam(teamOne);
                clearInterval(intervalId)
            }
        }, roundInterval);
    }

    static stopGame() {
        Logger.clearLog();
        clearInterval(intervalId);
        Referee.clearRoundNumber();
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