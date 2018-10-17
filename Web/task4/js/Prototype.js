function Employee(name, salary) {
    this.name = name || "name_me";
    this.salary = salary || 0;
    this.show = function(){
        return "Name: ".concat(this.name, " Salary: ", this.salary);
    }
}
function Manager(name, salary, Inferiors=[]){
    function Man() {
        this.Inferiors = Inferiors;
        this.getInferiors = function () {
            var str = this.name + "的下属有：\n";
            for(var i = 0;i < this.Inferiors.length;i++)
                str += this.Inferiors[i].show() + "\n";
            return str;
        };
    }
    Man.prototype = new Employee(name, salary);
    return new Man();
}
function Secretary(name, salary){
    function Sec() {
        this.Superior = [];
        this.getSuperior = function () {
            var str = this.name + "的老板是：\n";
            str += this.Superior.show() + "\n";
            return str;
        };
    }
    Sec.prototype = new Employee(name, salary);
    return new Sec();
}

var Se1 = new Secretary("张三", 3000);
var Se2 = new Secretary("李四", 4000);
var Se3 = new Secretary("刘五", 5000);
var Se4 = new Secretary("何六", 6000);
var Se5 = new Secretary("吴七", 7000);
var Se6 = new Secretary("黄八", 8000);
var Ses1 = [Se1, Se2, Se3, Se4];
var Ses2 = [Se5, Se6];
var Ma1 = new Manager("路人甲", 11111, Ses1);
var Ma2 = new Manager("炮灰乙", 22222, Ses2);
Se1.Superior = Ma1;
Se2.Superior = Ma1;
Se3.Superior = Ma1;
Se4.Superior = Ma1;
Se5.Superior = Ma2;
Se6.Superior = Ma2;

function proto_f1(){
    alert(Se1.show() + "\n" + Se1.getSuperior());
}
function proto_f2(){
    alert(Se2.show() + "\n" + Se2.getSuperior());
}
function proto_f3(){
    alert(Se3.show() + "\n" + Se3.getSuperior());
}
function proto_f4(){
    alert(Se4.show() + "\n" + Se4.getSuperior());
}
function proto_f5(){
    alert(Se5.show() + "\n" + Se5.getSuperior());
}
function proto_f6(){
    alert(Se6.show() + "\n" + Se6.getSuperior());
}
function proto_f7(){
    alert(Ma1.show() + "\n" + Ma1.getInferiors());
}
function proto_f8(){
    alert(Ma2.show() + "\n" + Ma2.getInferiors());
}