var AppNS = {};

(function($, undefined){

    AppNS.init = function() {
        var position = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
        AppNS.newGame(position);
        window.addEventListener('keydown', AppNS.keyboardEvent, false);
        $('#new-game').on('click', function() { AppNS.newGame(position) });
        $('.container').on('click', '.container__item', function(){
            var $el = $(this);
            var emptyPos = $('.empty').data('position');
            var thisPos = $el.data('position');
            var thisVal = $el.html();
            AppNS.moveRight(thisPos, emptyPos, thisVal, $el);
            AppNS.moveLeft(thisPos, emptyPos, thisVal, $el);
            AppNS.moveTop(thisPos, emptyPos, thisVal, $el);
            AppNS.moveBottom(thisPos, emptyPos, thisVal, $el);
            AppNS.checkWinner();
        })
    };

    AppNS.mixItems = function(position) {
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

    AppNS.setPositions = function (position) {
        var $container = $('.container').empty();
        var emptyCell;
        for (var i=0; i<position.length; i++) {
            (position[i] == '') ? emptyCell = ' empty' : emptyCell = '';
            var contentHtml = '<div class="container__item'+emptyCell+'" data-position="'+(i+1)+'">'+position[i]+'</div>';
            $container.append(contentHtml)
        }
    }

    AppNS.newGame = function(position) {
        AppNS.mixItems(position);
        AppNS.setPositions(position);
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
        var $newEl;
        var emptyPos = $('.empty').data('position');
        switch (type) {
            case 'up':
                if (emptyPos != 1 && emptyPos != 2 && emptyPos != 3 && emptyPos!= 4 ) {
                    $newEl = $('.container__item[data-position="'+(emptyPos-4)+'"]');
                }
                break;
            case 'down':
                if (emptyPos != 13 && emptyPos != 14 && emptyPos != 15 && emptyPos!= 16 ) {
                    $newEl = $('.container__item[data-position="'+(emptyPos+4)+'"]');
                }
                break;
            case 'left':
                if (emptyPos != 1 && emptyPos != 5 && emptyPos != 9 && emptyPos!= 13 ) {
                    $newEl = $('.container__item[data-position="'+(emptyPos-1)+'"]');
                }
                break;
            case 'right':
                if (emptyPos != 4 && emptyPos != 8 && emptyPos != 12 && emptyPos!= 16 ) {
                    $newEl = $('.container__item[data-position="'+(emptyPos+1)+'"]');
                }
                break;
        }
        var thisVal = $newEl.html();
        AppNS.replaceCells(thisVal, $newEl);
        AppNS.checkWinner();

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

    $(AppNS.init);

})(jQuery);