function getObject(elementId) {
    return document.getElementById(elementId);
}

function getObjectValue(elementId) {
    return getObject(elementId).value;
}

function getSelectedItem(objectName) {
    var chosen = 0;
    var myObjects = document.getElementsByName(objectName);

    for (i = 0; i < myObjects.length; i++)
        if (myObjects[i].checked) chosen = myObjects[i].value;

    return chosen;
}

function postBack(formName) {
    getObject(formName).submit();
}

function openWindow(url, width, height, location, title, status) {
    newwindow = window.open(url, title, 'location=' + location + ', status=' + status + ', height=' + height + ', width=' + width + '');
    if (window.focus) newwindow.focus();
    return;
}

function isNumeric(event) {
    var theEvent = event || window.event;
    var key = theEvent.keyCode || theEvent.which;
    var keyCharCode = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(keyCharCode) && key != 8) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function clearTextBox(myObject) {
    myObject.value = "";
}

function printPage() {
    window.print();
}

function isEmpty(elementId) {
    var obj = getObject(elementId);
    if (obj.value == "") {
        obj.focus();
        return true;
    }
    return false;
}

function messageAlert(status, text) {
    if (status) {
        alert(text);
    }
    return status;
}

function isEqual(firstElementId, secondElementId) {
    var obj = getObject(secondElementId);
    if (getObject(firstElementId).value == obj.value) return true;
    else {
        obj.focus();
        return false;
    }
}

function isEqualValue(firstValue, secondValue) {
    return (firstValue == secondValue);
}

function isValidEmail(elementId) {
    var obj = getObject(elementId);
    if ((obj.value).search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/) != -1) return true;
    else {
        obj.focus();
        return false;
    }
}

function isTextLenghtEqual(elementId, length) {
    var obj = getObject(elementId);
    if (obj.value.length == length) return true;
    else {
        obj.focus();
        return false;
    }
}

function isTextLenghtMinimum(elementId, length) {
    var obj = getObject(elementId);
    if (obj.value.length < length) return true;
    else {
        obj.focus();
        return false;
    }
}


function ReplaceStringT(strword) {

  return strword.replace(/[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,'');
}

function isTextLenghtMaximum(elementId, length) {
    var obj = getObject(elementId);
    if (obj.value.length > length) return true;
    else {
        obj.focus();
        return false;
    }
}

function isValidDate(y, m, d) {
    var year = parseInt(y);
    var month = parseInt(m);
    var day = parseInt(d);
    var maxdayinmonth = Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
    if (year < 1 || month < 1 || month > 12 || day < 1) return false;
    if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) maxdayinmonth[2] = 29;
    if (day > maxdayinmonth[month]) return false;
    return true;
}

function randomNumber(length) {
    return Math.floor(Math.random() * length);
}

function ajaxSetup() {
    $(document).ready(function () {

        $.ajaxSetup({
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            cache: false
        });

    });
}

function checkShortcut() {
    if (event.keyCode == 8 || event.keyCode == 13) {
        return false;
    }
}

/*
==> JQUERY AJAX KULLANIM BİÇİMİ


function GetData(path, CoverId, rowCount, oblectId) {
$.ajax({
url: "Default.aspx/GetData",
data: "{'path':'" + path + "', 'CoverId':'" + parseInt(CoverId) + "', 'rowCount':'" + rowCount + "'}",
success: function (msg) {
$("#" + oblectId).html(msg.d);
},
error: function () {
$(oblectId).html("Oluşan hatadan dolayı işlem yapılamıyor.");
}
});
}
*/