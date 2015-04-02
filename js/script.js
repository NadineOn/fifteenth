var AppNS = {};

(function($, undefined){

    var position = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''],
    $counterMoves = $('.page__moves span'),
    $container = $('.page__container'),
    $timeEl = $('.page__timer span'),
    flag = true,
    moves = 0,
    period;

    AppNS.init = function() {
        AppNS.newGame();
        $(window).on('keydown', AppNS.keyboardEvent);
        $('.page__start').on('click', function() {
            AppNS.newGame();
        });
        $container.on('click', '.container__item', function(){
            var $el = $(this);
            var emptyPos = $('.empty').data('position');
            var thisPos = $el.data('position');
            var thisVal = $el.html();
            AppNS.moveRight(thisPos, emptyPos, thisVal, $el);
            AppNS.moveLeft(thisPos, emptyPos, thisVal, $el);
            AppNS.moveTop(thisPos, emptyPos, thisVal, $el);
            AppNS.moveBottom(thisPos, emptyPos, thisVal, $el);
        })
    };

    AppNS.mixItems = function() {
        function random(min, max) {
            var range = max - min + 1;
            return Math.floor(Math.random()*range) + min;
        }

        for (var i=0; i<position.length-1; i++) {
            var k = random(0, position.length-1);
            var v = position[k];
            position[k] = position[position.length-1];
            position[position.length-1] = v;
        }
        return position;
    }

    AppNS.setPositions = function () {
        $container.empty();
        var emptyClass;
        for (var i=0; i<position.length; i++) {
            (position[i] === '') ? emptyClass = ' empty' : emptyClass = '';
            var contentHtml = '<div class="container__item'+emptyClass+'" data-position="'+(i+1)+'">'+position[i]+'</div>';
            $container.append(contentHtml);
        }
    }

    AppNS.newGame = function() {
        AppNS.timer(false);
        AppNS.mixItems();
        AppNS.setPositions();
        moves = 0;
        $counterMoves.html(moves);
        flag = true;
    }

    AppNS.moveRight = function(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 4 && thisPos != 8 && thisPos != 12 && thisPos!= 16 ) {
            if (emptyPos == (thisPos + 1)) {
                AppNS.replaceCells(thisVal, $el)
            }
        }
    }

    AppNS.moveLeft = function(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 1 && thisPos != 5 && thisPos != 9 && thisPos!= 13 ) {
            if (emptyPos == (thisPos - 1)) {
                AppNS.replaceCells(thisVal, $el)
            }
        }
    }

    AppNS.moveTop = function(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 1 && thisPos != 2 && thisPos != 3 && thisPos!= 4 ) {
            if (emptyPos == (thisPos - 4)) {
                AppNS.replaceCells(thisVal, $el)
            }
        }
    }

    AppNS.moveBottom = function(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 13 && thisPos != 14 && thisPos != 15 && thisPos!= 16 ) {
            if (emptyPos == (thisPos + 4)) {
                AppNS.replaceCells(thisVal, $el)
            }
        }
    }

    AppNS.replaceCells = function(thisVal, $el) {
        $('.empty').removeClass('empty').html(thisVal);
        $el.addClass('empty').empty();
        AppNS.checkWinner();
        moves++;
        $counterMoves.html(moves);
        if (flag) AppNS.timer(true);
        flag = false;
    }

    AppNS.keyboardEvent = function(e) {
        switch(e.keyCode) {
            case 40: AppNS.key('up'); break;
            case 38: AppNS.key('down'); break;
            case 39: AppNS.key('left'); break;
            case 37: AppNS.key('right'); break;
        }
    }

    AppNS.key = function ( type ) {
        var newPos;
        var emptyPos = $('.empty').data('position');
        switch (type) {
            case 'up':
                if (emptyPos != 1 && emptyPos != 2 && emptyPos != 3 && emptyPos!= 4 ) {
                    newPos = emptyPos-4;
                }
                break;
            case 'down':
                if (emptyPos != 13 && emptyPos != 14 && emptyPos != 15 && emptyPos!= 16 ) {
                    newPos = emptyPos+4;
                }
                break;
            case 'left':
                if (emptyPos != 1 && emptyPos != 5 && emptyPos != 9 && emptyPos!= 13 ) {
                    newPos = emptyPos-1;
                }
                break;
            case 'right':
                if (emptyPos != 4 && emptyPos != 8 && emptyPos != 12 && emptyPos!= 16 ) {
                    newPos = emptyPos+1;
                }
                break;
        }
        if (newPos) {
            var $newEl = $('.container__item[data-position="'+newPos+'"]');
            var thisVal = $newEl.html();
            AppNS.replaceCells(thisVal, $newEl);
        }
    }


    AppNS.checkWinner = function() {
        var correctCell = 0;
        $('.container__item').not(".empty").each(function(){
            var el = $(this);
            if (el.data('position') == el.html()) {
                correctCell ++;
            }
        })
        if (correctCell == 15) alert('You won!');
    }

    AppNS.timer = function(val) {
        var timer = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;

        function countTime(){
            ++timer;
            hours   = Math.floor(timer / 3600);
            minutes = Math.floor((timer - hours * 3600) / 60);
            seconds = timer - hours * 3600 - minutes * 60;
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;
            $timeEl.html(hours + ':' + minutes + ':' + seconds);
        }

        if (val) {
            countTime();
            period = setInterval(countTime, 1000);
        } else {
            clearInterval(period);
            $timeEl.html('00:00:00');
        }
    }

    $(AppNS.init);

})(jQuery);