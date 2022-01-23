<template>
  <h2>{{customTitle}}</h2>
  <p><span data-testid="counter" >{{counter}}</span> <sup>2</sup> = {{squareCounter}} </p>
  <div>
    <button data-testid="increment" @click="increment()">+1</button>
    <button data-testid="decrement" @click="decrement()">-1</button>
  </div>
</template>

<script>
export default {
  props:{title: String, start:{
    type:Number,
    default:100, 
    validator: function(value){
      return value>=100;
    }},
  },
  data() {
    return {
      counter: this.start,
    }
  },
  methods:{
    getSquareValue() {
     return this.counter * this.counter;
    },
    increment(){
        this.counter++
    },
    decrement(){  
        this.counter--
    },
  },
  computed: {
    squareCounter() {
       return this.counter * this.counter
    },
    customTitle() {
      return this.title || 'Counter'
    }
  },
}
</script>

<style>
button{
  background-color: #64B687;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 10px;
  transition: 0.3s ease-in-out;

}
</style>