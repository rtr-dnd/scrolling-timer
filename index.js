window.onload = function () {
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

    document.querySelector('.wrap').onscroll = function () {
        if (isStarted) {

            rate = (this.scrollTop / maxScrollValue) * 3600;
            var color = 'hsl('+rate*5+', 90%,'+((1-rate/3600)*100-20)+'%)';

            // 背景色を変更
            document.body.style.backgroundColor = color;

        } else {
            // スクロール最大値を計算
            maxScrollValue = this.scrollHeight - this.offsetHeight;
            // 0 ~ 3600(60分) に変換
            rate = (this.scrollTop / maxScrollValue) * 3600;
            roundedSeconds = Math.round(rate / 10) * 10;
            display.innerText = roundedSeconds;
            var color = 'hsl('+rate*5+', 90%,'+((1-rate/3600)*100-20)+'%)';

            // 背景色を変更
            document.body.style.backgroundColor = color;
        }
    };

    tickSecond = function () {
        if (roundedSeconds == 0) {
            seconds = 0;
            clearInterval(tsInstance);
            clearInterval(tscrInstance);
            isStarted = false;
        } else {
            roundedSeconds -= 1;
            display.innerText = roundedSeconds;
        }
    }

    tickScroll = function () {
        seconds -= 0.1;
        wrap.scroll(0, scrollUnit * seconds);
        console.log("scrolling");
    }

    pad.onclick = function () {
        console.log('clicked');
        isStarted = !isStarted;
        console.log(isStarted);
        if (isStarted) {
            tsInstance = setInterval(tickSecond, 1000);
            seconds = roundedSeconds;
            scrollUnit = wrap.scrollTop / roundedSeconds;
            tscrInstance = setInterval(tickScroll, 100);
        } else {
            clearInterval(tsInstance);
            clearInterval(tscrInstance);
        }
    };
};