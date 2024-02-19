Vue.component('message-board', {
    props:["title"],
    template: `
    <div>
      <h3> {{ title }} </h3>
          <div class="form-group">
            <label for="vistor_name">Your Name</label>
            <input type="text" id="vistor_name" v-model="vistor_name" /> 
          </div>
          <div class="form-group">
            <label for="vistor_message">Your Message</label>
            <input type="text" id="vistor_message" v-model="vistor_message" /> 
          </div>
          <button v-on:click="sayHi">Say Hi</button>
          <i class="bi bi-cloud-arrow-up-fill"  v-bind:class="savedIconClass"></i>
        <h3> Messages </h3>
        <ul>
            <li v-for="message in messages"> {{message['vistor_name']}} - {{message['vistor_message']}}</li>
        </ul>
    </div>
        `,
    data: function() {
      return {
          vistor_name: null,
          vistor_message: null,
          messages: [],
          savedIconClass: "text-success" // text-danger text-warning
        }
    },
    methods: {
        sayHi: function(name) {
            this.messages.push({
                "vistor_name": this.vistor_name,
                "vistor_message": this.vistor_message
            });
            this.savedIconClass = "text-warning";
            fetch('https://httpbin.org/post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({"for":this.title, "vistor_name": this.vistor_name, "vistor_message": this.vistor_message}),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              this.savedIconClass = "text-success";
            })
            .catch((error) => {
              console.error('Error:', error);
              this.savedIconClass = "text-danger";
            });
            this.vistor_name = "";
            this.vistor_message = "";
            this.$emit('add-to-grand-total');
        }
    },
    computed: {
        count: function() {
            return this.messages.length;
        }
    },
    mounted : async function(){ //get the previous messages to Satvik and display it
     r = await fetch("example-response.json") // this for example. Ideally you have to send get request to api and get the data from backend. 
     d = await r.json()
     console.log(d)
     this.messages = [{"for":"Satvik", "vistor_name": "Rajesh", "vistor_message": "Hello world"}]
    //  r = await fetch('http://localhost:8000/messages.json')
    //  data = await r.json()
    //  this.messages = data
    } //watcher is another way to call an api
})

var app = new Vue({
    el: '#app',
    data: {
        grand_total : 0
    },
    methods:{
        add_grand_total : function(){   
            console.log("in grand_total"); 
            this.grand_total = this.grand_total + 1;   
        }
    }

})