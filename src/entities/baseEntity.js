import {Helpers} from "../utils/helpers";
import {Logger} from "../utils/logger";

export class BaseEntity {
    constructor(baseEntity) {
        this.id = baseEntity.id;
        this.name = baseEntity.name;
        this.health = baseEntity.health;
        this.image = baseEntity.image;
        this.strength = baseEntity.strength;
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
        const dmg = Math.ceil(this.strength * 0.4 + Helpers.getRandomNumber(0,40)); // some formula for hit;
        const msg = `<div class="attack-div normal-attack text-center">${this.name} performed a normal attack causing ${dmg} damage. </div>`;
        Logger.log(msg);
        return dmg;
    }

    specialAttack() {
        const dmg = Math.ceil(this.strength * 0.8 + Helpers.getRandomNumber(20,80)); // some formula for hit;
        const msg = `<div class="attack-div special-attack text-center">${this.name} performed a special attack causing ${dmg} damage. </div>`;
        Logger.log(msg);
        return dmg;
    }
}