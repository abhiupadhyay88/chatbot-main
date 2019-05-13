$(function() {
//	function get_response() {
//		var value = $('.text').val();
//
//		if (value.length > 0) {
//			$('.no-message').addClass('hidden');
//			$('.text').val('');
//

//
//			$('.messages').append(html_string);
//
//			var socket = new WebSocket('ws://127.0.0.1:8765');
//
//			socket.onmessage = function(event) {
//				data = JSON.parse(event.data);
//
//				var html_string = `<div class="card col-md-6 chat-message offset-md-6"><div class="card-body">${data['response']}</div></div>`;
//
//				$('.messages').append(html_string);
//				$('.text').val('');
//			};
//
//			var data = {'text': value};
//
//			socket.onopen = function(event) {
//				socket.send(JSON.stringify(data));
//			};
//		} else {
//			$('.no-message').removeClass('hidden');
//			$('.text').val('');
//		}
//	}
    function create_new_question(next_question_id,next_question){
        var html_string = '<div class="card col-md-6 chat-message"><div class="card-body"><p class="question" id="' + next_question_id + '">' + next_question + '</p></div></div>'
//        console.log(html_string)
        $('.messages').append(html_string);
        $('.text').val('');
        if (next_question_id == 'End'){
            $('#text-box').hide()
        }
    }

    function update_entry(){
        update_field_name = $('.question').get(-1).id
        update_field_value = $('.text').val()
        $('.no-message').addClass('hidden');
        $('.text').val('');
        var html_string = '<div class="card col-md-6 user-message offset-md-6""><div class="card-body">'+ update_field_value + '</div></div>';
//        console.log(html_string)
        $('.messages').append(html_string);
        $.ajax({
            url: '/update_entry/',
            dataType: 'json',
            data:{'update_field_name':update_field_name,'update_field_value':update_field_value},
            success:function(response){
                next_question_id = response.next_question_id
                next_question =  response.next_question
                create_new_question(next_question_id,next_question)
                $('html,body').animate({ scrollTop: 9999 }, 'slow');
            }
        });

    }

	$('.send-btn').click(function(){
	    var value = $('.text').val();
	    if (value.length > 0) {
            update_entry()
        } else {
            $('.no-message').removeClass('hidden');
			$('.text').val('');
        }
	});

	$('.text').keypress(function (e) {
		var key = e.which;
		if(key == 13)  // the enter key code
		 {
			$('.send-btn').click();
			$('.text').val('');
		 }
	   });   
});