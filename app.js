new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                message: `You deal ${damage} damage to the monster!`
            })
            if (this.checkWin()) { return };

            this.monsterDamage();

        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                message: `You deal ${damage} damage with special attack to the monster!`
            })
            if (this.checkWin()) { return };

            this.monsterDamage();
        },
        heal: function () {
            var heal = this.calculateDamage(3, 15);
            this.playerHealth += heal;
            this.turns.unshift({
                isPlayer: true,
                message: `You restore ${heal}% heal of your health!`
            })
            if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }
            this.monsterDamage();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
            return damage;
        },
        monsterDamage: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                message: `Monster did ${damage} damage to you!`
            })
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});