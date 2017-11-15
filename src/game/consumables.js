import {Helpers} from "../utils/helpers";

export default class Consumable {

    static Potions = [
        SMALL_HEALING_POTION = {
            health: 300,
            name: "Small healing potion"
        },
        MEDIUM_HEALING_POTION = {
            health: 400,
            name: "Medium healing potion"
        },
        ARGE_HEALING_POTION = {
            health: 500,
            name: "Large healing potion"
        }
    ];

    static Food = [
        SUSHI = {
            health: 100,
            name: "Sushi"
        },
        PIZZA = {
            health: 200,
            name: "Pizza"
        },
        CAKE = {
            health: 300,
            name: "Cake"
        }
    ];

    static getConsumable() {
        let rndNumber = Math.floor((Math.random() * 40) + 1);

        if(rndNumber > 20) {
            return Consumable.Potions[Helpers.getRandomNumber(0,2)];
        } else {
            return Consumable.Food[Helpers.getRandomNumber(0,2)];
        }
    }
}