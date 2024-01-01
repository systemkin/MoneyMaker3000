function checkdata()
{
    var label = document.getElementById("card");
    if (label.value === "")
    {
        document.getElementById("invalid").innerHTML = "Куда деньги отправлять?";
    }
    else if(!label.checkValidity())
        document.getElementById("invalid").innerHTML = "Неверный номер карты";
    else
        document.getElementById("invalid").innerHTML = "Ожидайте поступления средств";
}