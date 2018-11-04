$(document).ready(function () {

    // $("#MobilePhoneCode").mask("(999)");
    // $("#MobilePhoneNumber").mask("999-99-99");
    ajaxSetup();
    var delayTime = 1000;
    var $containerEl;

    $(".btnSubmit").on("click", function () {
        $containerEl = $(this).parents(".emailCntr"),
           $firstName = $containerEl.find("[name='txtFirstName']"),
           $lastName = $containerEl.find("[name='txtLastName']"),
           $fromEmail = $containerEl.find("[name='txtEmail']"),
           $toEmail = $containerEl.find("[name='emailAddress']"),
           $phone = $containerEl.find("[name='txtPhone']"),
           $subject = $containerEl.find("[name='txtSubject']"),
           $comment = $containerEl.find("[name='txtComment']");

          caparams.UserInput = $containerEl.find(".captcha-input").val();






        $firstName.attr("id", "fname");
        $lastName.attr("id", "lname");
        $fromEmail.attr("id", "fromemail");
        $phone.attr("id", "phone");
        $subject.attr("id", "subject");
        $comment.attr("id", "comment");



        if (messageAlert(isEmpty("fname"), "Please enter a name.")) return false;
        if (messageAlert(isEmpty("lname"), "Please enter a surname")) return false;

        if (messageAlert(isEmpty("fromemail"), "Please enter a email.")) return false;
        else {
            if (messageAlert(!isValidEmail("fromemail"), "Please enter a valid email.")) return false;
        }


        if (messageAlert(isEmpty("phone"), "Please enter a phone number")) return false;
        else {
            if (messageAlert(isTextLenghtMinimum("phone", 7), "Please enter a phone number that is at least 7 characters long.")) return false;
        }


        if (messageAlert(isEmpty("subject"), "Please enter a subject")) return false;


        if (messageAlert(isEqualValue(getObjectValue("comment"), "0"), "Please enter a comment.")) return false;


        $firstName.removeAttr("id");
        $lastName.removeAttr("id");
        $fromEmail.removeAttr("id");
        $phone.removeAttr("id");
        $subject.removeAttr("id");
        $comment.removeAttr("id");


        var contact = new Object();

        //contact.firstName = encodeURI($firstName.val());
        //contact.lastname = encodeURI($lastName.val());
        //contact.phone = encodeURI($phone.val());
        //contact.subject = encodeURI($subject.val());
        //contact.comment = encodeURI($comment.val());



        contact.firstName = $firstName.val();
        contact.lastname = $lastName.val();
        contact.phone = $phone.val();
        contact.subject = $subject.val();
        contact.comment = $comment.val();

        contact.email = $fromEmail.val();
        contact.userName = $toEmail.val();

        contact.captchaId = caparams.CaptchaId;
        contact.userInput = caparams.UserInput;
        contact.InstanceId = caparams.InstanceId;


        $.DataLoader(contact);




       
    });

    $.ToggleForm = function (process) {
        $.ToggleButton(process);
        if (process) {
            $("#KpForm").fadeOut(delayTime);
            $("#Result").html("<p> Thank you for your interest and sensibility.<br>Türkiye Halk Bankasi A.S.</p>").fadeIn(delayTime);
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
            method: 'post',
            datatype: 'json',
            url: "/en/Module/SentMail",
            data: JSON.stringify(dataObject),
            success: function (msg) {
                $.DataValidator(msg);
            },
            error: function () {
                messageAlert(true, "Sorry! An error has occurred. ");
            }
        });
    }

    $.DataValidator = function (result) {

        if (result == "0") {
            messageAlert(true, "Sorry. An error has occurred ");
            capobject.ReloadImage();
            caparams.UserInput = "";
        }
        else if (result == "2") {

            messageAlert(true, "Please enter a valid security code.");
            capobject.ReloadImage();
            caparams.UserInput = "";
        }
        else if (result == "1") {
            alert("Your email has been sent successfully.Thanks.");
            $comment = $containerEl.find("[name='txtComment']");
            $(".sendEmail").colorbox.close();
            capobject.ReloadImage();
            caparams.UserInput = "";

            $comment = $comment.val("");

        }

        else if (result == "3") {
            messageAlert(true, "Sorry. An error has occurred! ");
            capobject.ReloadImage();
        }
    }
});


