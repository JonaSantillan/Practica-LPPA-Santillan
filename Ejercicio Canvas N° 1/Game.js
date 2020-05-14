var canvas = null,
    ctx = null,
    x = 50,
    y = 50,
    lastPress = null,
    KEY_ENTER = 13,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,
    dir = 0,
    pause = true;

document.addEventListener('keydown', function (evt) {
    lastPress = evt.which;
}, false);

function paint(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(50, 50, 100, 60);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.fillRect(x, y, 10, 10);
    ctx.fillStyle = '#fff';
    //ctx.fillText('Last Press: ' + lastPress, 0, 20);

    if(pause){
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', 150, 75);
        ctx.textAlign = 'left';
    }
}

function repaint() {
    window.requestAnimationFrame(repaint);
    paint(ctx);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    run ();
    repaint();
}

function run() {
    window.requestAnimationFrame(run);
    paint(ctx);
    setTimeout(run, 50);
    act();
}

function act(){
    x += 2;
    if(!pause){
        if (x > canvas.width) {
            x = 0;
        }
        if(lastPress == KEY_UP) {
            dir = 0;
        }
        if (lastPress == KEY_RIGHT) {
            dir = 1;
        }
        if (lastPress == KEY_DOWN) {
            dir = 2;
        }
        if (lastPress == KEY_LEFT){
            dir = 3;
        }

        if(dir == 0){
            y -=10;
        }
        if(dir == 1){
            x +=10;
        }
        if(dir == 2){
            y +=10;
        }
        if(dir == 3){
            x -=10;
        }

        if(x > canvas.width){
            x = 0;
        }
        if(y > canvas.height){
            y = 0;
        }
        if(x < 0){
            x = canvas.width;
        }
        if(y < 0){
            y = canvas.height;
        }
    }

    if(lastPress == KEY_ENTER){
        pause = !pause;
        lastPress = null;
    }
}

window.addEventListener('load', init, false);

