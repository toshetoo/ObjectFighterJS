import {Helpers} from "../utils/helpers";

export default class Consumable {

    static getPotions() {
        return [
            {
                health: 300,
                name: "Small healing potion"
            },
            {
                health: 400,
                name: "Medium healing potion"
            },
            {
                health: 500,
                name: "Large healing potion"
            }
        ];
    }

    static getFood() {
        return [
            {
                health: 100,
                name: "Sushi"
            },
            {
                health: 200,
                name: "Pizza"
            },
            {
                health: 300,
                name: "Cake"
            }
        ];
    }

    static getConsumable() {
        let rndNumber = Math.floor((Math.random() * 40) + 1);

        if(rndNumber > 20) {
            return Consumable.getPotions()[Helpers.getRandomNumber(0,2)];
        } else {
            return Consumable.getFood()[Helpers.getRandomNumber(0,2)];
        }
    }
}