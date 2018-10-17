var number = 0;
var x = -1;
var elements = [];

document.observe("dom:loaded", function(){
    $("add").observe("click", add);
    $("remove").observe("click", remove);
    $("select").observe("click", select_all);
    $("deselect").observe("click", deselect_all);
    $("save").observe("click", setCookie);
    getCookie();
});
function lost_focus(){
    $("input").blur();
    $("add").blur();
    $("remove").blur();
    $("select").blur();
    $("deselect").blur();
}
document.onkeydown = function(){
    switch(window.event.keyCode){
        case Event.KEY_DOWN:
            lost_focus();
            var target = $("li"+elements[x]);
            if(target)
                target.style.color = "honeydew";
            x = (++x)%elements.length;
            target = $("li"+elements[x]);
            if(target)
                target.style.color = "yellow";
            break;
        case Event.KEY_UP:
            lost_focus();
            var target = $("li"+elements[x]);
            if(target)
                target.style.color = "honeydew";
            if(--x<0)
                x+=elements.length;
            target = $("li"+elements[x]);
            if(target)
                target.style.color = "yellow";
            break;
        case 13:
            if("input" === document.activeElement.id)
                add();
            else{
                lost_focus();
                select();
            }
            break;
        default:
            break;
    }
};
function add(){
    var input = $("input");
    var text = input.value.trim();
    if(text === "") {
        alert("输入不能为空哦！");
    }
    else if(text.length>30){
        alert("请输入少于30个字符！");
    }
    else {
        var li = document.createElement("li");
        li.setAttribute("id", "li" + number);
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        li.appendChild(checkbox);
        li.append(text);
        $("list").appendChild(li);
        elements.push(number.toString());
        number++;
    }
    input.value = "";
    //关闭回车换行
    window.event.returnValue = false;
}
function remove() {
    for(var i = 0;i < elements.length;i++){
        var elem = $("li"+elements[i]);
        if(elem.firstChild.checked===true){
            //如果要删除的元素在已选择的元素之前，需调整x位置
            if(i<x)x--;
            else if(i===x) x = -1;
            elem.remove();
            elements.splice(i, 1);
            i--;
        }
    }
}
function select_all() {
    for(var i = 0;i < elements.length;i++){
        $("li"+elements[i]).firstChild.checked = true;
    }
}
function deselect_all() {
    for(var i = 0;i < elements.length;i++){
        $("li"+elements[i]).firstChild.checked = false;
    }
}
function select(){
    if(x===-1) return;
    var target = $("li"+elements[x]);
    target.firstChild.checked = !target.firstChild.checked;
}

function setCookie(){
    var to_do = "to_do=";
    for(var i=0;i<elements.length;i++){
        var text = $("li"+elements[i]).innerText;
        to_do += text + ",";
    }
    if(elements.length!==0)
        to_do = to_do.slice(0, to_do.length - 1);
    document.cookie = escape(to_do);
    alert("Saved successfully!");
}

function getCookie(){
    var to_do = unescape(document.cookie).split(';')[0];
    if(to_do.slice(0, 5)==="to_do"&&to_do.length>6){
        var text = to_do.split('=')[1].split(',');
        for(var i=0;i<text.length;i++){
            var li = document.createElement("li");
            li.setAttribute("id", "li" + number);
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            li.appendChild(checkbox);
            li.append(text[i]);
            $("list").appendChild(li);
            elements.push(number.toString());
            number++;
        }
    }
}

