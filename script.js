        // Game
        var game = document.getElementById("game");

        // Huyền Vân
        var character = document.getElementById("character");
        character.style.animationPlayState = "paused";

        // Cu Hiệp
        var boss = document.getElementById("boss");
        var laser = document.getElementById("laser");
        laser.hidden = true;
        laser.style.animationPlayState = 'paused';

        // Audio
        var bossSound = document.getElementById("bossSound");
        var rate = 2.0;
        bossSound.playbackRate = rate;

        var gunSound = document.getElementById("gunSound");

        // Countdown
        let countdownHTML = document.getElementById("countdown");

        function audioEnd() {
            boss.classList.remove('activeBoss');
            var i = 0;
            var time = [1,1,2,3,4,5];
            var random = time[Math.floor(Math.random() * time.length)];
            let loopSound = setInterval(() => {
                i ++;
                bossSound.play();
                boss.classList.add('activeBoss');
                if (i>0) {
                    clearInterval(loopSound);
                }
            }, random * 1000);

            if (character.style.animationPlayState === 'running' && character.offsetLeft < boss.offsetLeft){
                gunSound.play();
                laser.hidden = false;
                laser.style.animationPlayState = 'running';
                character.style.animationPlayState = 'paused';
                character.style.opacity = '0.2';
                setTimeout(function(){
                alert("Uh-oh, You Lose...");
                location.reload();
                }, 1000);

            } else if(character.offsetLeft - boss.offsetLeft >= 20){
                alert("Great, You Win!");
                location.reload();
            }
        }

        function run(){
            if (character.style.animationPlayState == 'paused'){
                character.style.animationPlayState = 'running';
                if (bossSound.pause && !boss.classList.contains('activeBoss')) {
                    gunSound.play();
                    laser.hidden = false;
                    laser.style.animationPlayState = 'running';
                    character.style.animationPlayState = 'paused';
                    character.style.opacity = '0.2';
                    setTimeout(function(){
                    alert("Uh-oh, You Lose...");
                    location.reload();
                    }, 1000);
                }
            } else {
                character.style.animationPlayState = 'paused';
                if(character.offsetLeft - boss.offsetLeft >= 20){
                    alert("Great, You Win!");
                    location.reload();
                }
            }
        }

        // Countdown
        function startGame() {
            bossSound.muted = false;
            document.getElementById("intro").style.display = "block";
            document.getElementById("startButton").style.display = "none";
            document.getElementById("countdown").style.display = "block";
            let timeleft = 60;
            let loop = setInterval(() => {
                countdown(timeleft--)
                if (timeleft < -1) {
                    clearInterval(loop);
                }
            }, 1000);

            var i = 0;
            var time = [1,1,2,3,4,5];
            var random = time[Math.floor(Math.random() * time.length)];
            let loopSound = setInterval(() => {
                i ++;
                bossSound.play();
                boss.classList.add('activeBoss');
                if (i>0) {
                    clearInterval(loopSound);
                }
            }, random * 1000);
        }

        function countdown(timeleft) {
            if (timeleft < 0) {
                if (character.offsetLeft - boss.offsetLeft >= 20) {
                    character.style.animationPlayState = 'paused';
                    countdownHTML.innerHTML = "Great, You Win!";
                } else {
                    countdownHTML.innerHTML = "Uh-oh, You Lose...";
                    gunSound.play();
                    laser.hidden = false;
                    laser.style.animationPlayState = 'running';
                    character.style.animationPlayState = 'paused';
                    character.style.opacity = '0.2';
                    setTimeout(function(){
                        alert("Uh-oh, You Lose...");
                        location.reload();
                        }, 1000);
                }
                return;
            }

            let minutes = Math.floor(timeleft / 60);
            let seconds = timeleft - minutes * 60;
            if (minutes < 5) {
                countdownHTML.style.color = "red";
            }

            minutes = minutes > 9 ? minutes : "0" + minutes;
            seconds = seconds > 9 ? seconds : "0" + seconds;
            countdownHTML.innerHTML = `${minutes}:${seconds}`;
        }
