import Game from "./game/game";
import {Logger} from "./utils/logger";
import {Team} from "./entities/team";

let chosenFighters = 0;
let firstFighter = undefined;
let secondFighter = undefined;
let fighters = [];
let hasStartButton = false;

function chooseGame() {
    $('.container').append(`
        <div class="choose-game-mode">
            <button class="btn btn-primary single-fight">Single fight</button>
            <button class="btn btn-primary team-match">Match fight</button>
        </div>
    `);

    $('.single-fight').on('click', function () {
        $('.container').html('');
        initGame();
    });

    $('.team-match').on('click', function () {
        $('.container').html('');
        initGame(true)
    });
}

function appendHolders(isTeamMatch) {
    $('.container').append(`
    <div id="choose-fighter" class="text-center">
        <h3><span>Choose fighters</span><button class="btn btn-primary reset-game">Reset Game</button></h3>
      </div>      
    `);

    if (isTeamMatch) {
        $('.container').append(`
        <div id="selected-fighters" class="text-center">
        <div class="row">
            <div class="col-xs-6">
            <h4>Team One</h4>
                <div class="team-one allowedDrop">
                
                </div>
            </div>
             <div class="col-xs-6">
                <h4>Team two</h4>
                <div class="team-two allowedDrop">
                
                </div>
            </div>
        </div>
      </div>
    `);
    } else {
        $('.container').append(`
        <div id="selected-fighters" class="text-center">
        <h3>Selected fighters</h3>
      </div>
    `);
    }

    $('.container').append(`
        <div id="log">

      </div>
    `);
}

function attachStartButton(isMatchGame) {
    $("#selected-fighters").append('<button class="btn btn-primary start-btn">Start fight</button>');
    $(".start-btn").on('click', function () {
        Logger.setLogHolder('#log');

        if (isMatchGame) {
            let teamOne = new Team('Team One', []);
            let teamTwo = new Team('Team Two', []);

            $('.team-one').children().each(function () {
                teamOne.fighters.push(fighters.filter(f => f.id === $(this).data('id'))[0]);
            });

            $('.team-two').children().each(function () {
                teamTwo.fighters.push(fighters.filter(f => f.id === $(this).data('id'))[0]);
            });

            Game.startTeamMatch(teamOne, teamTwo);
        } else {
            Game.startGame(firstFighter, secondFighter);
        }
    });
}

function attachResetButton() {
    $('.reset-game').on('click', function () {
        $('.container').html('');
        $(".start-btn").off('click');
        $('.details-holder').off('click');
        firstFighter = undefined;
        secondFighter = undefined;
        chosenFighters = 0;
        hasStartButton = false;

        Game.stopGame();
        chooseGame();

    });
}

function attachClickEvent() {
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
}

function attachDragAndDropHandlers() {
    $('.details-holder').on('dragstart', function (event) {
        $('.container').data('draggged', $(event.currentTarget));
    });

    $('.team-one, .team-two').on('dragover', function (event) {
        event.preventDefault();
    });

    $('.team-one').on('drop', function (event) {
        event.preventDefault();
        let data = $('.container').data('draggged');
        $('.team-one').append(data);

        if ($('.team-two').children().length > 0 && $('.team-one').children().length > 0) {
            attachStartButton(true);
        }
    });

    $('.team-two').on('drop', function (event) {
        event.preventDefault();
        let data = $('.container').data('draggged');
        $('.team-two').append(data);

        if ($('.team-two').children().length > 0 && $('.team-one').children().length > 0 && !hasStartButton) {
            hasStartButton = true;
            attachStartButton(true);
        }
    });
}

function initGame(isMatchFight) {
    appendHolders(isMatchFight);
    attachResetButton();
    Game.logFighters().then((apiFighters) => {
        fighters = apiFighters;

        if (isMatchFight) {
            attachDragAndDropHandlers();
        } else {
            attachClickEvent();
        }
    });
}

$(window).on('load', function () {
    chooseGame();
});