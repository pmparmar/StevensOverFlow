$(function() {

	// $('#loginBtn').modal('show');
	var loginbtn = $("#loginBtn");
	var userbtn = $("#userbtn");    
	var errmsg = $("#loginmessage");
    var loginmode = $("#loginModal");


    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	userbtn.click(function() {
        console.log('userbtn clicked');
        window.location.href = '/profile'
            /* body... */
    });


	console.log('errmsg.val() is '+errmsg.val());
    if(errmsg.val().length>0){
        errmsg.removeClass("hidden");
    }
	
	console.log('userbtn.val() is '+userbtn.val());
	if(userbtn.val().length>0)
	{
		loginbtn.addClass("hidden");
		userbtn.removeClass("hidden");
	}



});
