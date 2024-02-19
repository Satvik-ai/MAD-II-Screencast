//Event hooks. Vue lifecycle.
Vue.component('message-board', {
    props : ['title'],
    template : `
    <div>
        <h4> {{ title }} </h4>
        <p>Your name : <input type="text" v-model="visitor_name"></p>
        <p>Your message : <input type="text" v-model="visitor_message"></p>
        <button v-on:click="sayHi">Say Hi</button>
        <ul>
            <li v-for="message in messages">{{message["visitor_name"]}} : {{message["visitor_message"]}}</li>
        </ul>
    </div>
    `,
    data : function() {
        return {
            visitor_name : "",
            visitor_message : "",
            messages : []
        }
    },
    methods : {
        sayHi : function(){
            this.messages.push({"visitor_name" : this.visitor_name, "visitor_message" : this.visitor_message});
            this.visitor_name = "";
            this.visitor_message = "";
            this.$emit("add-to-global-total")
        }
    },
    computed : {
        count : function(){
            return this.messages.length;
        }
    },
    beforeCreate : function(){
        //fetch data from backend
        console.log('Component beforeCreate');
    },
    created : function(){
        console.log('Component Created');
    },
    beforeMount : function(){
        console.log("Component beforeMount");
    },
    mounted : function(){
        //fetch data from backend.It is recommended to fetch data here.
        console.log("Component mounted");
    },
    beforeUpdate : function(){
        console.log("Component beforeUpdate");
    },
    updated : function(){
        console.log("Component updated");
    }
})

var app = new Vue({
    el : "#app",
    data : {
        global_count : 0
    },
    methods : {
        count_global : function(){
            this.global_count = this.global_count + 1;
        }
    }, //Look at console
    beforeCreate : function(){
        //fetch data from backend
        console.log('App beforeCreate');
        console.log(this.global_count); //Here we do not have access to data. It is undeined.
    },
    created : function(){
        console.log('App Created');
        console.log(this.global_count);
    },
    beforeMount : function(){
        console.log("App beforeMount");
    },
    mounted : function(){
        //fetch data from backend.It is recommended to fetch data here.
        console.log("App mounted");
        console.log(this.$el);
    },
    beforeUpdate : function(){
        console.log("App beforeUpdate");
    },
    updated : function(){
        console.log("App updated");
    }
})