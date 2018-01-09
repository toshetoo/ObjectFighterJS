import Game from "./game/game";
import {Logger} from "./utils/logger";

let chosenFighters = 0;
let firstFighter = undefined;
let secondFighter = undefined;
let fighters = [];

function attachStartButton() {
    $("#selected-fighters").append('<button class="btn btn-primary start-btn">Start fight</button>');
    $(".start-btn").on('click', function () {
        Game.startGame(firstFighter, secondFighter);
    });
}

$(window).on('load', function () {
    Game.logFighters().then((apiFighters) => {
        fighters = apiFighters;

        $('.details-holder').on('click', function (event) {
            const id = $(event.currentTarget).data('id');
            if (!firstFighter) {
                firstFighter = fighters.filter(f => f.id === id)[0];
                Logger.logFighter(firstFighter, '#selected-fighters');
                chosenFighters++;
            } else if (!secondFighter) {
                secondFighter = fighters.filter(f => f.id === id)[0];
                Logger.logFighter(secondFighter, '#selected-fighters');
                chosenFighters++;
            }

            if (chosenFighters >= 2) {
                attachStartButton();
            }
        });
    });
});