"use strict";
/*
Aufgabe: 8.2 Goldener Herbst
Name: Jasmin Basler
Matrikel: 265114
Datum: 25.11.21
Quellen: Inspiration von meinem Code aus dem letzten Semester und der Lektion 08
*/
var GoldenerHerbst;
(function (GoldenerHerbst) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let line = 0.5;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        let horizon = crc2.canvas.height * line;
        drawBackground();
        drawGras();
        drawSun({ x: 250, y: 100 });
        drawCloud({ x: 550, y: 100 }, { x: 175, y: 75 });
        drawMountains({ x: 0, y: horizon }, 80, 200, "darkgrey", "lightgrey");
        drawSmallLeaf();
        drawBigLeaf();
        drawTrees();
        drawSquirrel();
    }
    function drawBackground() {
        console.log("background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(line, "white");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawGras() {
        console.log("gras");
        crc2.save();
        crc2.fillStyle = "#6f7848";
        crc2.fillRect(0, 300, crc2.canvas.width, crc2.canvas.height);
        crc2.restore();
    }
    function drawSun(_position) {
        console.log("sun");
        let radius1 = 15;
        let radius2 = 100;
        let gradientSun = crc2.createRadialGradient(0, 0, radius1, 0, 0, radius2);
        gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradientSun.addColorStop(1, "HSLA(60, 100%, 50%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradientSun;
        crc2.arc(0, 0, radius2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }
    function drawCloud(_position, _size) {
        console.log("Cloud", _position, _size);
        let cloudParticles = 20;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradientCloud = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradientCloud.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradientCloud.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradientCloud;
        for (let drawn = 0; drawn < cloudParticles; drawn++) {
            crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("mountains");
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradientMountain = crc2.createLinearGradient(0, 0, 0, -_max);
        gradientMountain.addColorStop(0, _colorLow);
        gradientMountain.addColorStop(0.8, _colorHigh);
        crc2.fillStyle = gradientMountain;
        crc2.fill();
        crc2.restore();
    }
    function drawSmallLeaf() {
        console.log("leaf");
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * 800;
            let y = Math.random() * (-100);
            let color = ["#6a040f", "#f48c06", "#fcbf49"];
            let colorMix = color[Math.floor(Math.random() * color.length)];
            crc2.save();
            crc2.translate(x, y);
            crc2.fillStyle = colorMix;
            crc2.beginPath();
            crc2.moveTo(50, 580);
            crc2.quadraticCurveTo(30, 570, 10, 580);
            crc2.moveTo(10, 580);
            crc2.quadraticCurveTo(30, 590, 50, 580);
            crc2.fill();
            crc2.restore();
        }
    }
    function drawBigLeaf() {
        console.log("leaf");
        for (let i = 0; i < 30; i++) {
            let x = Math.random() * 800;
            let y = Math.random() * (-100);
            crc2.save();
            crc2.translate(x, y);
            crc2.fillStyle = "#8b5e34";
            crc2.beginPath();
            crc2.arc(20, 570, 4, 0, 2 * Math.PI);
            crc2.arc(25, 575, 6, 0, 2 * Math.PI);
            crc2.arc(30, 580, 7, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.beginPath();
            crc2.moveTo(33, 583);
            crc2.lineTo(40, 590);
            crc2.lineWidth = 3;
            crc2.strokeStyle = "#6f4518";
            crc2.stroke();
            crc2.restore();
        }
    }
    function drawTrees() {
        console.log("trees");
        /*Tree 1*/
        crc2.save();
        crc2.fillStyle = "#332c18";
        crc2.beginPath();
        crc2.moveTo(100, 600);
        crc2.lineTo(150, 600);
        crc2.lineTo(150, 420);
        crc2.lineTo(100, 420);
        crc2.lineTo(100, 600);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#ca6702";
        crc2.beginPath();
        crc2.arc(75, 400, 70, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#ca6702";
        crc2.beginPath();
        crc2.arc(175, 400, 70, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#ca6702";
        crc2.beginPath();
        crc2.arc(125, 330, 70, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        /*Tree 2*/
        crc2.fillStyle = "#332c18";
        crc2.beginPath();
        crc2.moveTo(400, 450);
        crc2.lineTo(430, 450);
        crc2.lineTo(430, 320);
        crc2.lineTo(400, 320);
        crc2.lineTo(400, 450);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#e85d04";
        crc2.beginPath();
        crc2.arc(375, 300, 55, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#e85d04";
        crc2.beginPath();
        crc2.arc(455, 300, 55, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#e85d04";
        crc2.beginPath();
        crc2.arc(415, 250, 55, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        /*Tree 3*/
        crc2.fillStyle = "#332c18";
        crc2.beginPath();
        crc2.moveTo(600, 550);
        crc2.lineTo(630, 550);
        crc2.lineTo(630, 420);
        crc2.lineTo(600, 420);
        crc2.lineTo(600, 550);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#bb3e03";
        crc2.beginPath();
        crc2.arc(575, 380, 65, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#bb3e03";
        crc2.beginPath();
        crc2.arc(655, 380, 65, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#bb3e03";
        crc2.beginPath();
        crc2.arc(615, 330, 65, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }
    function drawSquirrel() {
        console.log("squirrel");
        crc2.save();
        crc2.fillStyle = "#463f3a";
        crc2.beginPath();
        crc2.arc(320, 450, 10, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        /*body*/
        crc2.beginPath();
        crc2.moveTo(320, 450);
        crc2.quadraticCurveTo(290, 500, 320, 500);
        crc2.moveTo(320, 500);
        crc2.quadraticCurveTo(350, 500, 320, 450);
        crc2.fill();
        /*feet*/
        crc2.beginPath();
        crc2.arc(310, 500, 5, 0, 2 * Math.PI);
        crc2.arc(330, 500, 5, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        /*ears*/
        crc2.beginPath();
        crc2.arc(313, 445, 5, 0, 2 * Math.PI);
        crc2.arc(328, 445, 5, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        /*tail*/
        crc2.beginPath();
        crc2.moveTo(330, 495);
        crc2.quadraticCurveTo(330, 460, 340, 450);
        crc2.moveTo(340, 450);
        crc2.quadraticCurveTo(370, 480, 330, 495);
        crc2.fill();
        crc2.restore();
    }
})(GoldenerHerbst || (GoldenerHerbst = {}));
//# sourceMappingURL=script.js.map