import Game from "./game/game";
import {Logger} from "./utils/logger";

let chosenFighters = 0;
let firstFighter = undefined;
let secondFighter = undefined;
let fighters = [];

function appendHolders() {
    $('.container').append(`
    <div id="choose-fighter" class="text-center">
        <h3><span>Choose fighters</span><button class="btn btn-primary reset-game">Reset Game</button></h3>
      </div>
      <div id="selected-fighters" class="text-center">
        <h3>Selected fighters</h3>
      </div>
      <div id="log">

      </div>
    `);
}

function attachStartButton() {
    $("#selected-fighters").append('<button class="btn btn-primary start-btn">Start fight</button>');
    $(".start-btn").on('click', function () {
        Logger.setLogHolder('#log');
        Game.startGame(firstFighter, secondFighter);
    });
}

function attachResetButton() {
    $('.reset-game').on('click', function() {
        $('.container').html('');
        $(".start-btn").off('click');
        $('.details-holder').off('click');
        firstFighter = undefined;
        secondFighter = undefined;
        chosenFighters = 0;
        Game.stopGame();
        initGame();
    });
}

function initGame() {
    appendHolders();
    attachResetButton();
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

            if (chosenFighters === 2) {
                chosenFighters = 0;
                attachStartButton();
            }
        });
    });
}

$(window).on('load', function () {
    initGame();
});