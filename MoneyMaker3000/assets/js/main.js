function checkdata()
{
    var label = document.getElementById("card");
    var label2 = document.getElementById("wantedIncome");
    if (label.value === "")
    {
        document.getElementById("invalid").innerHTML = "Куда деньги отправлять?";
    }
    else if(!label.checkValidity())
        document.getElementById("invalid").innerHTML = "Неверный номер карты";
    else
    {
        if((!label2.checkValidity()) || (label2.value === ""))
            document.getElementById("invalid").innerHTML = "Неверный обьём денег";
        else
        {
            document.getElementById("invalid").innerHTML = "Ожидайте поступления средств";
            document.cookie = Date.now() + "%" + label2.value;
        }
    }
}
function income()
{
    if (document.cookie == "")
        document.getElementById("income").innerHTML = "Вы ещё ничего не заработали";
    else{
        const words = document.cookie.split('%');
        const time = (Date.now()-Number(words[0]))/1000/60/60/24;
        const income = time* Number(words[1]);
        document.getElementById("income").innerHTML = "Вы заработали " + income.toFixed(2) + " денег";
    }
}