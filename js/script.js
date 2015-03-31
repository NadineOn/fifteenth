var AppNS = {};

(function($, undefined){

    AppNS.init = function() {
        var position = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
        AppNS.mixItems(position);
        AppNS.setPositions(position);

        $("body").on("click",".container__item",function(){
            var pos = parseFloat($(this).data('name'));


            if(core.check_top(pos)){
                core.replace(pos, -64, 0, -4);
            }

            if(core.check_bottom(pos)){
                core.replace(pos, 64, 0, 4);
            }


            if(core.check_right(pos)){
                core.replace(pos, 0, 64, 1);
            }


            if(core.check_left(pos)){
                core.replace(pos, 0, -64, -1);
            }

        });


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
        var $container = $('.container');
        var contentHtml = '';
        console.log(position)
        for (var i=0; i<position.length; i++) {
            contentHtml = '<div class="container__item" data-position="'+(i+1)+'">'+position[i]+'</div>';
            $container.append(contentHtml)
        }
    }


    $(AppNS.init);

})(jQuery);


var core = {
    replace : function(position, func_top, func_left, func_position){

        var obj = $('#'+position);
        var left = obj.offset().left;
        var top = obj.offset().top;

        new_position = new Object();
        new_position.top = top + func_top;
        new_position.left = left + func_left;
        core.table_of_emptify[position] = true;
        core.table_of_emptify[position+func_position] = false;
        obj.attr("id",(position+func_position));
        new_position.left = left + func_left;
        obj.offset(new_position);
        core.check_pos(position+func_position);

    },
}