$(document).ready(function () {

    // $("#MobilePhoneCode").mask("(999)");
    // $("#MobilePhoneNumber").mask("999-99-99");
    ajaxSetup();
    var delayTime = 1000;
    var ServicePath = "/Module";

    $("#btnSubmit").click(function () {
        if (messageAlert(isEmpty("txtFirstName"), "Please enter a name.")) return false;
        if (messageAlert(isEmpty("txtLastName"), "Please enter a surname")) return false;
        if (messageAlert(isEmpty("txtCompany"), " Please enter a Company.")) return false;
        if (messageAlert(isEmpty("txtDepartment"), "Please enter a department.")) return false;
       
        if (messageAlert(isEmpty("txtEmail"), "Please enter a email.")) return false;
        else {
            if (messageAlert(!isValidEmail("txtEmail"), "Please enter a valid email.")) return false;
        }
   

        if (messageAlert(isEmpty("txtPhone"), "Please enter a phone number")) return false;
        else {
            if (messageAlert(isTextLenghtMinimum("txtPhone", 7), "Please enter a phone number that is at least 7 characters long.")) return false;
        }
        if (messageAlert(isEqualValue(getObjectValue("selectYear"), "0"), "Please enter a country.")) return false;

        if (messageAlert(isEqualValue(getObjectValue("txtComment"), "0"), "Please enter a message.")) return false;

        $('#status').text('');

        var contact = new Object();
        contact.firstName = $("#txtFirstName").val();
        contact.lastname = $("#txtLastName").val();

        contact.company = $("#txtCompany").val();
        contact.department = $("#txtDepartment").val();
        contact.email = $("#txtEmail").val();
        contact.phone = $("#txtPhone").val();
        contact.country = $("#selectYear").val();

        contact.shareHolder = $("input[name=rdShareHolder]:radio:checked").val();
        contact.shareHolderTurkishComp = $("input[name=rdShareHolderTurkishComp]:radio:checked").val();
        contact.Comment = $("#txtComment").val();
        var captchaObj = $("#CaptchaCode").get(0).Captcha;

        contact.captchaId = captchaObj.Id;
        contact.InstanceId = captchaObj.InstanceId;
        contact.userInput = $("#CaptchaCode").val();
       

     
     


        //var captchaObj = $("#CaptchaCode").get(0).Captcha;
        //var params = {}
        //params.CaptchaId = captchaObj.Id;
        //params.InstanceId = captchaObj.InstanceId;
        //params.UserInput = $("#CaptchaCode").val();
        //$.getJSON('/en/Module/CheckCaptcha', params, function (result) {



            //if (true === result) {
                $.DataLoader(contact);
            //}

            //else
                
            //{
            //    $('#status').attr('class', 'incorrect');
            //    $('#status').text('Güvenlik kodunu doğru girin.');
            //    captchaObj.ReloadImage();
            //}
            
            
            
        });

    });



$.ToggleForm = function (process) {
    var delayTime = 1000;
        $.ToggleButton(process);
        if (process) {
            $("#KpForm").fadeOut(delayTime);
            $("#Result").html("<p>Thank you for your interest and sensibility.<br>Sincerly ,<br>Türkiye Halk Bankası A.Ş.</p>").fadeIn(delayTime);
        }
    }

    $.ToggleButton = function (process) {
        var btnSubmitForm = $("#btnSubmit");
        var LoadingForm = $("#LoadingForm");
        if (process) {
            btnSubmitForm.hide();
            LoadingForm.show();
        }
        else {
            btnSubmitForm.show();
            LoadingForm.hide();
        }
    }

    $.DataLoader = function (dataObject) {
        $.ToggleButton(true);
        $.ajax({
            method:'post',
            datatype: 'json',
            url:"/en/Module/KeepMeUpdateForm",
            data: JSON.stringify(dataObject),
            success: function (msg) {
                $.ToggleForm($.DataValidator(msg));
            },
            error: function () {
                $.ToggleForm(false);
                messageAlert(true, "Sorry. An error has occurred!.");
            }
        });
    }

   
       

       
    $.DataValidator = function (result) {

      
        if(result=="ProcessCode2")
        {
            return true;
        }
        else if(result=="2")
        {
            messageAlert(true, "Please enter a valid security code.");
            var captchaObj = $("#CaptchaCode").get(0).Captcha;
            captchaObj.ReloadImage();
        }
        else if (result=="3") {
            messageAlert(true, "Sorry!. An error has occurred! ");
            var captchaObj = $("#CaptchaCode").get(0).Captcha;
            captchaObj.ReloadImage();
        }

        else if (result == "ErrorCode3_53") {
            messageAlert(true, "Sorry!... An error has occurred! ");
            var captchaObj = $("#CaptchaCode").get(0).Captcha;
            captchaObj.ReloadImage();

        }
        else if (result = "ErrorCode3_54") {
            messageAlert(true, "Sorry. An error has occurred...");
            var captchaObj = $("#CaptchaCode").get(0).Captcha;
            captchaObj.ReloadImage();
        }
          
    }
   


      




