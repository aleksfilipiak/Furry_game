var Coin = require("./coin.js");
var Furry = require("./furry.js");


var Game = function () {

    var divs = document.getElementById("board").children;
    this.board = divs;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    }
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }
    this.hideVisibleFurry = function () {
        var divWithFurry = document.querySelector(".furry");
        divWithFurry.classList.remove("furry")
    }
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }
    this.moveFurry = function () {
        this.checkCoinCollision();


        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        }

        this.gameOver();
        this.showFurry();


    }
    var self = this;
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    }
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    }
    this.checkCoinCollision = function () {
        if (this.board[this.index(this.furry.x, this.furry.y)] === this.board[this.index(this.coin.x, this.coin.y)]) {
            var divWithCoin = document.querySelector(".coin");
            divWithCoin.classList.remove("coin");
            var scoreDiv = document.getElementById("score").children[0];
            this.score = this.score + 1;
            scoreDiv.innerHTML = "SCORE " + this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }
    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            var end = document.getElementById("over");
            end.classList.remove("invisible")
        }
    }
    document.addEventListener('keydown', function (event) {
        self.turnFurry(event);
    });
}



module.exports = Game;