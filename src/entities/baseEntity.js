import {Helpers} from "../utils/helpers";
import {Logger} from "../utils/logger";

export class BaseEntity {
    constructor(name, health, image) {
        this.name = name;
        this.health = health;
        this.image = image;
        this.strength = 10;
    }

    hit() {
        const num = Helpers.getRandomNumber(0, 101);
        if(num < 80) {
            return this.normalAttack();
        } else {
            return this.specialAttack();
        }
    }

    normalAttack() {
        const dmg = this.strength * 0.4 + Helpers.getRandomNumber(0,20); // some formula for hit;
        const msg = `${this.name} performed a normal attack causing ${dmg}`;
        Logger.log(msg);
        return dmg;
    }

    specialAttack() {
        const dmg = this.strength * 0.8 + Helpers.getRandomNumber(10,40); // some formula for hit;
        const msg = `${this.name} performed a special attack causing ${dmg}`;
        Logger.log(msg);
        return dmg;
    }
}