$(document).ready(function () {

  
    ajaxSetup();
    var delayTime = 1000;
    var ServicePath = "/Module";

    $("#btnVote").click(function () {
      

        if (!document.getElementById("rdContent0").checked && !document.getElementById("rdContent1").checked && !document.getElementById("rdContent2").checked)
            {
            alert("Please check the content field");
        }

        else if (!document.getElementById("rdCurrency0").checked && !document.getElementById("rdCurrency1").checked && !document.getElementById("rdCurrency2").checked) {
            alert("Please check the currency field");
        }
        else if (!document.getElementById("rdOverall0").checked && !document.getElementById("rdOverall1").checked && !document.getElementById("rdOverall2").checked) {
            alert("Please check the overall field");
        }

        else {




            var vote = new Object();



            var content = "2";
            var currency = "2";
            var overall = "2";
            if (document.getElementById('rdContent0').checked) {
                content = "0";
            }
            else if (document.getElementById('rdContent1').checked) {
                content = "1";
            }
            else { }

            if (document.getElementById('rdCurrency0').checked) {
                currency = "0";
            }
            else if (document.getElementById('rdCurrency1').checked) {
                currency = "1";
            }
            else { }

            if (document.getElementById('rdOverall0').checked) {
                overall = "0";
            }
            else if (document.getElementById('rdOverall1').checked) {
                overall = "1";
            }
            else { }


            vote.content = content;
            vote.currency = currency;
            vote.overall = overall;
            vote.comments = $('#txtComments').val();
            $.DataLoader(vote);
        }
    });

    $.ToggleForm = function (process) {
        $.ToggleButton(process);
        if (process) {
            $("#voteForm").fadeOut(delayTime);
            $("#Result").html("<p>Thank you for your interest and sensibility.<br>Türkiye Halk Bankası A.Ş.</p>").fadeIn(delayTime);
        }
    }

    $.ToggleButton = function (process) {
        var btnSubmitForm = $("#btnVote");
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
            url: "/en/Module/UseVote",
            data: JSON.stringify(dataObject),
            success: function (msg) {
                $.ToggleForm($.DataValidator(msg.d));
            },
            error: function () {
                $.ToggleForm(false);
                messageAlert(true, "Oluşan hatadan dolayı işlem yapılamıyor.");
            }
        });
    }

    $.DataValidator = function (result) {
        switch (result) {
            case "ErrorCode1": messageAlert(true, "Sunucuya yapılan istek güvenli değil."); return false;
            case "ErrorCode2": messageAlert(true, "Lütfen eksiksiz veri giriniz."); return false;
            case "ErrorCode3": messageAlert(true, "Oluşan hatadan dolayı işlem yapılamıyor."); return false;
            case "ErrorCode4": messageAlert(true, "Sistemde gösterilecek veri bulunamadı."); return false;
            case "ProcessCode1": messageAlert(true, "Hatalı yada eksik istek yapıldı. (Servis iletişimi başarılı.)"); return false;


            case "ProcessCode2": return true;

            case "ErrorCode3_53": messageAlert(true, "Kayıt Başarısız."); return false;
            case "ErrorCode3_54": messageAlert(true, "Sistemsel bir hata oluştu."); return false;

            case "ProcessCode3": return true;
            default: return true;
        }
    }
});