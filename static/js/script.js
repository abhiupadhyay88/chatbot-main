$(function() {

    function validate_sex(value){
        return value.trim().toLowerCase() == 'male' || value.trim().toLowerCase() == 'female'
    }

    function validate_yes_no(value){
        return value.trim().toLowerCase() == 'yes' || value.trim().toLowerCase() == 'no'
    }

    function validate_result(value){
        return value.trim().toLowerCase() == 'done'
    }

    function validate_date(value){
        if (value.trim().match(/^\d\d-\d\d-\d\d\d\d$/)){
            return true
        }
        return false
    }

    function create_new_question(next_question_id,next_question){
        var html_string = '<div class="card col-md-6 chat-message"><div class="card-body"><p class="question" id="' + next_question_id + '">' + next_question + '</p></div></div>'
//        console.log(html_string)
        $('.messages').append(html_string);
        $('.text').val('');
        $('.text').attr("id","user_"+next_question_id)
        if (next_question_id == 'End'){
            $('#text-box').hide()
        }
    }

    function update_entry(){
        update_field_name = $('.question').get(-1).id
        update_field_value = $('.text').val()
        $('.no-message').addClass('hidden');
        $('.validation').addClass('hidden')
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
	        question_id = $('.text').attr('id')
	        validation_flag = false
//	        console.log(question_id)
	        switch(question_id) {
	            case "user_birth_date":
	                validation_flag = validate_date(value)
	                if (!validation_flag){
	                    $('.validation').html('Please enter a valid date in dd-mm-YYYY format')
	                    $('.validation').removeClass('hidden')
	                }
	                break
                case "user_smoking_status":
                    validation_flag = validate_yes_no(value)
                    if (!validation_flag){
	                    $('.validation').html('Please enter yes or no')
	                    $('.validation').removeClass('hidden')
	                }
	                break
	            case "user_sex":
	                validation_flag = validate_sex(value)
	                if (!validation_flag){
	                    $('.validation').html('Please enter male or female')
	                    $('.validation').removeClass('hidden')
	                }
	                break
	            case "user_result":
	                validation_flag = validate_result(value)
	                if (!validation_flag){
	                    $('.validation').html('Please enter Done')
	                    $('.validation').removeClass('hidden')
	                }
	                break
	            case "user_name":
	                validation_flag = true
	                break
	        }
//	        console.log(validation_flag)
	        if (validation_flag){
                update_entry()
            } else {
                $('.text').val('');
            }

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