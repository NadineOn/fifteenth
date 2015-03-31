var handlersSetter = {

    setHandlers : function(){

        $("body").on("click",".block",function(e){

            var position = parseFloat(e.currentTarget['id']);


            if(core.check_top(position)){
                core.replace(position, -64, 0, -4);
            }

            if(core.check_bottom(position)){
                core.replace(position, 64, 0, 4);
            }


            if(core.check_right(position)){
                core.replace(position, 0, 64, 1);
            }


            if(core.check_left(position)){
                core.replace(position, 0, -64, -1);
            }

        });

    }

}



var core = {

    check_win : false,

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

    setEmptifyTable : function(func){
        core.table_of_emptify = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true];
        func();
    },

    mix : function(){

        core.check_win = false;

        for(var i = 0; i < 600; i++){

            var num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            var free_pos = 0;

            for(var j = 1; j<=16;j++){
                if(core.table_of_emptify[j] == true){
                    free_pos = j;
                    break;
                }
            }

            switch (num) {
                case 1:
                    $('#'+(free_pos-4)).trigger('click');
                    break;
                case 2:
                    $('#'+(free_pos+4)).trigger('click');
                    break;
                case 3:
                    $('#'+(free_pos-1)).trigger('click');
                    break;
                case 4:
                    $('#'+(free_pos+1)).trigger('click');
                    break;
                default:
                    break;
            }

        }

        core.check_win = true;

    },

    check_top : function (position){

        target_position = parseFloat(position) - 4;

        if(target_position > 0){
            return(core.table_of_emptify[target_position]);
        }else{
            return false;
        }

    },


    check_bottom : function (position){

        target_position = parseFloat(position) + 4;

        if(target_position <= 16){
            return(core.table_of_emptify[target_position]);
        }else{
            return false;
        }

    },

    check_left : function (position){

        target_position = parseFloat(position) - 1;

        if((target_position != 0)&&(target_position != 4)&&(target_position != 8)&&(target_position != 12)){
            return(core.table_of_emptify[target_position]);
        }else{
            return false;
        }

    },

    check_right : function (position){

        target_position = parseFloat(position) + 1;

        if((target_position != 1)&&(target_position != 5)&&(target_position != 9)&&(target_position != 13)){
            return(core.table_of_emptify[target_position]);
        }else{
            return false;
        }

    },

    check_pos : function (pos){

        var obj = $('#'+pos);
        if(obj.html() == pos){
            obj.attr('class','block true');
        }else{
            obj.attr('class','block false');
        }


        if(!core.check_win){
            return;
        }

        if($('#15').html() == '15'){

            var flag = true;

            for(var i = 1; i <= 15; i++){

                if($('#'+i).html() != i){
                    flag = false;
                    break;
                }

            }

            if(flag){

                $('.start').hide();
                $('.start_button_field').show();
                $('.win').show();
                $('#win_time').show();
                $('.timer').timer('pause');

            }

        }

    },

    set_default : function(){

        $('.game_field').html('<div class="block" id="1">1 </div><div class="block" id="2">2 </div><div class="block" id="3">3 </div><div class="block" id="4">4 </div><div class="block" id="5">5 </div><div class="block" id="6">6 </div><div class="block" id="7">7 </div><div class="block" id="8">8 </div><div class="block" id="9">9 </div><div class="block" id="10">10</div><div class="block" id="11">11</div><div class="block" id="12">12</div><div class="block" id="13">13</div><div class="block" id="14">14</div><div class="block" id="15">15</div>');

        for(var i = 1; i <= 15; i++){

            if($('#'+i).html() == i){
                $('#'+i).attr('class','block true');
            }else{
                $('#'+i).attr('class','block false');
            }

        }

        core.setEmptifyTable(core.mix);


    },

    init : function(){

        handlersSetter.setHandlers();
        core.setEmptifyTable(core.mix);

    }

}

$(document).ready(function(){
    core.init();
});