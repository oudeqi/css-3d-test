import './index.css';
import './jplaceholder.js';

$('input[type=text],input[type=password]').keyup(function(){
	if($(this).val()){
		$(this).next('.clear').show();
	}
});

$('.clear').click(function(){
	$(this).prev('input').val('');
	$(this).parent().next('.mes').find('.pwd_icon').removeClass('pwdok').removeClass('pwdno').html('○');
	$(this).prev('input').focus();
	$(this).hide();
	
});

$('input[type=text]').focusin(function(){
	$(this).css('border','1px solid #3F89EC');
	$(this).parent().siblings('.mes').find('.error').hide().end().find('.tip').show();
}).focusout(function(){
	$(this).css('border','1px solid #ddd');
	$(this).parent().siblings('.mes').find('.tip').hide();
});

$('input[type=password]').focusin(function(){
	$(this).css('border','1px solid #3F89EC');
	$(this).parent().siblings('.mes').find('.error').hide().end().find('ul').show();
}).focusout(function(){
	$(this).css('border','1px solid #ddd');
	//$(this).parent().siblings('.mes').find('ul').hide();
});

if('placeholder' in document.createElement('input')){
	$('input[type=text]').eq(0).focus();
}

$('#telEmail').blur(function(){
	if(isTelOrEmail()){
		$(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass().addClass('ok_icon').next('span').html('');
		//document.title = 'yes';
		
	}else{
		if($('#telEmail').val()){
			$(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass().addClass('error_icon').next('span').html('请填写正确的手机号码/邮箱');
		}
		
		//document.title = 'no';
	};
});

$('#pswd').blur(function(){
	if(checkLength() && checkChar() && !checkSpace()){
		$(this).parent().siblings('.mes').find('ul').hide();
		//$(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass().addClass('ok_icon').next('span').html('');
	}else{
		if(!$('#pswd').val()){
			$(this).parent().siblings('.mes').find('ul').find('.pwd_icon').removeClass('pwdok').removeClass('pwdno').html('○').end().hide();
		}
	}
});

$('#pswd').keyup(function(){

	if(checkLength()){
		$(this).parent().siblings('.mes').find('.pwd_icon').eq(0).html('').removeClass('pwdno').addClass('pwdok');
	}else{
		$(this).parent().siblings('.mes').find('.pwd_icon').eq(0).html('').removeClass('pwdok').addClass('pwdno');
	}
	
	if(checkChar()){
		$(this).parent().siblings('.mes').find('.pwd_icon').eq(1).html('').removeClass('pwdno').addClass('pwdok');
	}else{
		$(this).parent().siblings('.mes').find('.pwd_icon').eq(1).html('').removeClass('pwdok').addClass('pwdno');
	}
	
	if(!checkSpace()){
		$(this).parent().siblings('.mes').find('.pwd_icon').eq(2).html('').removeClass('pwdno').addClass('pwdok');
	}else{
		$(this).parent().siblings('.mes').find('.pwd_icon').eq(2).html('').removeClass('pwdok').addClass('pwdno');
	}
});

$('#yzm').blur(function(){
	/*
		if(checkYzmNull()){
		$(this).parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass().addClass('error_icon');
	}
	*/
	
});

var isTelOrEmail = function(){
	return /^1\d{10}$/.test($('#telEmail').val()) || /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test($('#telEmail').val());
}

var checkLength = function(){
	return $('#pswd').val().length >= 6 && $('#pswd').val().length <=14;
}

var checkChar = function(){
	return /[0-9a-zA-Z|\.]/.test($('#pswd').val());
}

var checkSpace = function(){
	return /\s/g.test($('#pswd').val());
}

var checkYzmNull = function(){
	return $.trim($('#yzm').val()) == '' || $.trim($('#yzm').val()) == null || $.trim($('#yzm').val()) == undefined;
}

var checkAgree = function(){
	if($('#agree').is(':checked')){
		return true;
    }else{
		return false;
	}
}

$('#agree').click(function(){
	if($(this).is(':checked')){
		$('.regBtn').parent().next('.mes').find('.error').hide();
	}
	//else{
	//	$('.regBtn').parent().next('.mes').find('.error').show();
	//}
});


$('.regBtn').click(function(){
	if(isTelOrEmail() && checkLength() && checkChar() && !checkSpace() && !checkYzmNull() && checkAgree()){
	
		alert('可以提交');
		
	}else{//不能提交
		if(!isTelOrEmail()){
			$('#telEmail').css('border','1px solid red');
			$('#telEmail').parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass().addClass('error_icon').next('span').html('请填写正确的手机号码/邮箱');
		}
		
		if(!checkLength() || !checkChar() || checkSpace()){
			$('.mes').find('ul').hide();
			$('#pswd').css('border','1px solid red');
			$('#pswd').parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass().addClass('error_icon').next('span').html('请输入密码');
		}
		
		if(checkYzmNull()){
			$('#yzm').css('border','1px solid red');
			$('#yzm').parent().siblings('.mes').find('.error').show().find('span').eq(0).removeClass().addClass('error_icon').next('span').html('请输入验证码');
		}
		
		if(!checkAgree()){
			$(this).parent().next('.mes').find('.error').show();
		}
	}	
});
