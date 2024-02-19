/* #2nd way.
let message = "Hello World";
document.getElementById("app").innerHTML=message; */

// 3rd way. A better approach. Using Vue app
var app = new Vue({
    el : "#app",
    data : {
        message : "Hello World",
        count : 0,
        visitor_name : "",
        visitor : []
    },
    methods : {
        sayHi : function(){
            this.message = "Hi";
            this.count = this.count + 1 ;
            this.visitor.push(this.visitor_name) ;
            this.visitor_name = "";
        }
    }/*,
    computed : {
        count : function(){
            return this.visitor.length;
        }
    }*/
})