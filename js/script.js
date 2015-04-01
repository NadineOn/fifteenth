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
            moveRight(thisPos, emptyPos, thisVal, $el);
            moveLeft(thisPos, emptyPos, thisVal, $el);
            moveTop(thisPos, emptyPos, thisVal, $el);
            moveBottom(thisPos, emptyPos, thisVal, $el);

            AppNS.checkWinner();
        })
    };

    function moveRight(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 4 && thisPos != 8 && thisPos != 12 && thisPos!= 16 ) {
            if (emptyPos == (thisPos + 1)) {
                clearCell(thisVal, $el)
            }
        }
    }

    function moveLeft(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 1 && thisPos != 5 && thisPos != 9 && thisPos!= 13 ) {
            if (emptyPos == (thisPos - 1)) {
                clearCell(thisVal, $el)
            }
        }
    }

    function moveTop(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 1 && thisPos != 2 && thisPos != 2 && thisPos!= 4 ) {
            if (emptyPos == (thisPos - 4)) {
                clearCell(thisVal, $el)
            }
        }
    }

    function moveBottom(thisPos, emptyPos, thisVal, $el) {
        if (thisPos != 13 && thisPos != 14 && thisPos != 15 && thisPos!= 16 ) {
            if (emptyPos == (thisPos + 4)) {
                clearCell(thisVal, $el)
            }
        }
    }

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

    //function getXY(i) { return ' data-x='+( ((i-1) % 4)+1 )+' data-y='+Math.ceil( (i)/4); }

    AppNS.setPositions = function (position) {
        var $container = $('.container').empty();
        var emptyCell;
        for (var i=0; i<position.length; i++) {
            (position[i] == '') ? emptyCell = ' empty' : emptyCell = '';
            var contentHtml = '<div class="container__item'+emptyCell+'" data-position="'+(i+1)+'">'+position[i]+'</div>';
            //var contentHtml = '<div class="container__item'+emptyCell+'" '+getXY(i+1)+' data-position="'+(i+1)+'">'+position[i]+'</div>';
            $container.append(contentHtml)
        }

    }

    AppNS.newGame = function(position) {
        AppNS.mixItems(position);
        AppNS.setPositions(position);
    }

    //AppNS.keyboardEvent = function(e) {
    //    switch(e.keyCode) {
    //        case 38: AppNS.key('up'); break;
    //        case 40: AppNS.key('down'); break;
    //        case 37: AppNS.key('left'); break;
    //        case 39: AppNS.key('right'); break;
    //    }
    //}
    function clearCell(thisVal, $el) {
        $('.empty').removeClass('empty').html(thisVal);
        $el.addClass('empty').empty();
    }


    //AppNS.key = function ( type ) {
    //    var $emptyEl = $('.empty');
    //    var emptyPos = $emptyEl.data('position');
    //    switch (type) {
    //        case 'up':
    //            console.log(emptyPos);
    //            if (emptyPos != 1 && emptyPos != 2 && emptyPos != 2 && emptyPos!= 4 ) {
    //                var thisVal = $('.container__item').data('position', emptyPos+4).html();
    //                clearCell(thisVal, $emptyEl)
    //            }
    //
    //            //var from = 'x' + a + 'y' + (b + 1);
    //            //var to = 'x' + a + 'y' + b;
    //            break;
    //        case 'down':
    //            var from = 'x' + a + 'y' + (4 - b);
    //            var to = 'x' + a + 'y' + (5 - b);
    //            break;
    //        case 'left':
    //            var from = 'x' + (b + 1) + 'y' + a;
    //            var to = 'x' + b + 'y' + a;
    //            break;
    //        case 'right':
    //            var from = 'x' + (4 - b) + 'y' + a;
    //            var to = 'x' + (5 - b) + 'y' + a;
    //            break;
    //    }
    //    if( !$('.'+to).length ) {
    //    //    $('.empty').css('top', '100px')
    //        $('.'+from).removeClass(from).addClass(to);
    //        AppNS.checkWinner();
    //        return
    //    }
    //
    //}

    AppNS.checkWinner = function() {
        var correctCell = 0;
        $('.container__item').not(".empty").each(function(){
            var el = $(this);
            if (el.data('position') == el.html()) {
                correctCell ++;
            }
        })
        console.log(correctCell)
        if (correctCell == 15) alert('You won!');
    }


    $(AppNS.init);

})(jQuery);