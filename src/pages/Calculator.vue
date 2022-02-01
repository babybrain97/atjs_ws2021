<template>
  <Header title="Calculator" />
  <div class="bg-zinc-900 p-6 pb-8 rounded-xl shadow-xl lg:w-96 md:w-96">
    <Display :number=currentNumber />
    <div class="flex flex-wrap justify-between">
      <CalculatorButton :digit="number" v-for="number in numberKeys" @click="pushNumber(number)" :key="number" />

      <CalculatorButton :digit="'+'" @click="addNumber" />
      <CalculatorButton :digit="'-'" @click="substractNumber" />
      <CalculatorButton :digit="'*'" @click="multiplyNumber" />
      <CalculatorButton :digit="'/'" @click="divideNumber" />
      <CalculatorButton :digit="'AC'" @click="clear" />
      <CalculatorButton :digit="'='" @click="showResult" />
    </div>
  </div>


</template>

<script>
  import Header from "../components/Header.vue";
  import Display from "../components/Calculator/Display.vue"
  import CalculatorButton from "../components/Calculator/CalculatorButton.vue"
  const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  export default {
    name: 'Calculator',
    components: {
      Header,
      Display,
      CalculatorButton
    },
    data() {
      return {
        lastNumber: 0,
        operation: "plus",
        currentNumberArray: [],
        numberKeys,
      };
    },

    computed: {
      currentNumber() {
        // We turn the array into a number so we don't need to convert
        // any other istance of the currentNumber
        return parseInt(this.currentNumberArray.join(""), 10) || 0;
      },
    },

    methods: {
      pushNumber(numberStr) {
        // Just add the last number to the array
        this.currentNumberArray.push(numberStr);
      },

      addNumber() {
        // Store the currentNumber in memory of the lastNumber
        this.operation = "plus";
        this.lastNumber = this.currentNumber;
        this.currentNumberArray = [];
      },

      substractNumber() {
        // Store the currentNumber in memory of the lastNumber
        this.operation = "minus";
        this.lastNumber = this.currentNumber;
        this.currentNumberArray = [];
      },

      multiplyNumber() {
        // Store the currentNumber in memory of the lastNumber
        this.operation = "multiply";
        this.lastNumber = this.currentNumber;
        this.currentNumberArray = [];
      },

      divideNumber() {
        // Store the currentNumber in memory of the lastNumber
        this.operation = "divide";
        this.lastNumber = this.currentNumber;
        this.currentNumberArray = [];
      },

      clear() {
        this.lastNumber = [];
        this.currentNumberArray = [];
      },

      showResult() {
        let result;
        if (this.operation == "plus") {
          result = this.lastNumber + this.currentNumber;
        } else if (this.operation == "minus") {
          result = this.lastNumber - this.currentNumber;
        } else if (this.operation == "multiply") {
          result = this.lastNumber * this.currentNumber;
        } else if (this.operation == "divide") {
          result = this.lastNumber / this.currentNumber;
        }

        this.currentNumberArray = [...String(result)];
        // Logic here has a lot of room for improvements
      },
    },
  };
</script>

<style scoped>
  .calculatorContainer {
    border: 1px solid;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 8px 8px;
    max-width: 400px;
  }
</style>