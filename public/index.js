window.onload = function () {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    var vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    var display = document.getElementById('display');
    var pad = document.getElementById('pad');
    var isStarted = false;
    var roundedSeconds = 0;
    var seconds = 0;
    var maxScrollValue = 0;
    var rate = 0;
    var tsInstance;
    var tscrInstance;
    var scrollUnit = 0;
    wrap = document.querySelector('.wrap');

    notifySound = function () {
        audioElem = new Audio();
        audioElem.src = "material_notification.wav";
        audioElem.play();
    }

    document.querySelector('.wrap').onscroll = function () {
        if (isStarted) {

            rate = (this.scrollTop / maxScrollValue) * 3600;
            //var color = 'hsl('+rate*5+', 50%,'+((1-rate/3600)*100-20)+'%)';

            // 背景色を変更
            //document.body.style.backgroundColor = color;
            document.querySelector('.status').innerText = "タップしてストップ";

        } else {
            document.querySelector('.status').innerText = "タップしてスタート";
            // スクロール最大値を計算
            maxScrollValue = this.scrollHeight - this.offsetHeight;
            // 0 ~ 3600(60分) に変換
            rate = (this.scrollTop / maxScrollValue) * 3600;
            roundedSeconds = Math.round(rate / 10) * 10;
            display.innerHTML = roundedSeconds + "<span class='sec'> sec </span>";
            //var color = 'hsl('+rate*5+', 50%,'+((1-rate/3600)*100-20)+'%)';

            // 背景色を変更
            //document.body.style.backgroundColor = color;
        }
    };

    tickSecond = function () {
        if (roundedSeconds == 0) {
            seconds = 0;
            notifySound();
            clearInterval(tsInstance);
            clearInterval(tscrInstance);
            isStarted = false;
            document.querySelector('.status').innerHTML = '<img src="material_arrow_down.svg" alt="scroll down">';
        } else {
            roundedSeconds -= 1;
            display.innerHTML = roundedSeconds + "<span class='sec'> sec </span>";
        }
    }

    tickScroll = function () {
        seconds -= 0.1;
        wrap.scroll(0, scrollUnit * seconds);
    }

    pad.onclick = function () {
        isStarted = !isStarted;
        if (isStarted) {
            tsInstance = setInterval(tickSecond, 1000);
            seconds = roundedSeconds;
            scrollUnit = wrap.scrollTop / roundedSeconds;
            tscrInstance = setInterval(tickScroll, 100);
        } else {
            clearInterval(tsInstance);
            clearInterval(tscrInstance);
            document.querySelector('.status').innerText = "タップしてスタート";
        }
    };
};