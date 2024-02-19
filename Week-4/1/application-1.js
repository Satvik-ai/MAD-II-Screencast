var app = new Vue({
    el : "#app",
    data : {
        visitor_name : "",
        visitor_message : "",
        messages : []
    },
    methods : {
        sayHi : function(){
            this.messages.push({"visitor_name" : this.visitor_name, "visitor_message" : this.visitor_message});
            this.visitor_name = "";
            this.visitor_message = "";
        }
    },
    computed : {
        count : function(){
            return this.messages.length;
        }
    }
})