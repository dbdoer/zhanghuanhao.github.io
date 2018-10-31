var QuickSort = function (arr) {
    if (arr.length<=1) return arr;
    var pivotIndex = Math.floor(arr.length/2);
    var pivot = arr.splice(pivotIndex,1)[0];
    var left = [];
    var right = [];
    for (var i = 0;i < arr.length;i++){
        if(arr[i]<pivot)
            left.push(arr[i]);
        else{
            right.push(arr[i]);
        }
    }
    return QuickSort(left).concat([pivot], QuickSort(right));
};
var up_sort = function(){
    var str = $("input").value.trim();
    if(str===""){
        alert("输入不能为空哦!");
        return;
    }
    var arr = str.split(/\s+/).map(Number);
    $("output").value = QuickSort(arr).toString();
};
var down_sort = function(){
    var str = $("input").value.trim();
    if(str===""){
        alert("输入不能为空哦!");
        return;
    }
    var arr = str.split(/\s+/).map(Number);
    $("output").value = QuickSort(arr).reverse().toString();
};

var reverse = function(){
    var string = "";
    var counter = 1;
    for(var i = 5;i >= 0;i--){
        string += counter++ + ". " + $(i+"").innerHTML.toString() + "\n";
    }
    alert(string);
};
var i = 0;
var isAccelerate = false;
var timer;
var start_change = function() {
    if ($(i + "").style.color !== "red")
        $(i + "").style.color = "red";
    else
        $(i + "").style.color = "black";
    i = (++i) % 6;
};
var accelerate = function(){
    if(isAccelerate)
    {
        clearInterval(timer);
        timer = setInterval("start_change()", 10000);
        isAccelerate = false;
        $("accelerate").innerHTML = "加速变色";
    }
    else
    {
        clearInterval(timer);
        timer = setInterval("start_change()", 150);
        isAccelerate = true;
        $("accelerate").innerHTML = "减速变色";
    }
};
window.onload = function () {
    timer = setInterval("start_change()", 10000);
};
