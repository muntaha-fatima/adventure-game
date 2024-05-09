#! /usr/bin/env node
import inquirer from "inquirer";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseFuel() {
        this.fuel = 25;
    }
    increaseFuel() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
        this.fuel = 100;
    }
    decreaseFuel() {
        this.fuel -= 25;
    }
    increaseFuel() {
        this.fuel = 100;
    }
}
async function startGame(player, Opponent) {
    console.log(`${player.name} fuel is ${player.fuel}`);
    console.log(`${Opponent.name} fuel is ${Opponent.fuel}`);
    do {
        const ask = await inquirer.prompt([
            {
                name: "opt",
                type: "list",
                message: "What would you like to do?",
                choices: ["Attack", "Drink portion", "Run for your life.."]
            }
        ]);
        if (ask.opt === "Attack") {
            const num = Math.floor(Math.random() * 2);
            if (num > 0) {
                player.decreaseFuel();
                console.log(`${player.name} fuel is ${player.fuel}`);
                console.log(`${Opponent.name} fuel is ${Opponent.fuel}`);
                if (player.fuel <= 0) {
                    console.log("You lose, better luck next time");
                    process.exit();
                }
            }
            else {
                Opponent.decreaseFuel();
                console.log(`${player.name} fuel is ${player.fuel}`);
                console.log(`${Opponent.name} fuel is ${Opponent.fuel}`);
                if (Opponent.fuel <= 0) {
                    console.log("You win");
                    process.exit();
                }
            }
        }
        else if (ask.opt === "Drink portion") {
            player.increaseFuel();
            console.log(`You drink health portion. Your fuel is ${player.fuel}`);
        }
        else if (ask.opt === "Run for your life..") {
            console.log("You lose, better luck next time");
            process.exit();
        }
    } while (true);
}
(async () => {
    const player = new Player((await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter your name",
        }
    ])).name);
    const opponent = new Opponent((await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select your opponent",
            choices: ["skeleton", "alien", "zombie"]
        }
    ])).select);
    await startGame(player, opponent);
})();
