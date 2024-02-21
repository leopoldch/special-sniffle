<script setup>
import { ref } from 'vue'
const text = ref('')
const firstLine = ref([]);
const myLines = ref([]);
let colors = ["#20B2AA", "#FAEBD7", "#008B8B", "#BDB76B", "#8FBC8F", "#DAA520", "#CD5C5C", "#66CDAA"]

function shuffleArray(array) {
  for (let i = array.length -  1; i >  0; i--) {
    const j = Math.floor(Math.random() * (i +  1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
colors = shuffleArray(colors)
var UVs = new Map();

function onInput(e) {
  text.value = e.target.value
  if(text.value ===""){
    myLines.value = [];
  }else{
    filterInputData();
  }
  console.log(myLines.value);
  console.log(firstLine.value);

}
function filterInputData() {
    myLines.value = []
    const words = text.value.split(" ");
    let filteredData = words.filter(word => word != "")
    const nbUV = parseInt(filteredData[2]);
    firstLine.value.push(filteredData[0]);
    firstLine.value.push(filteredData[1]);
    firstLine.value.push(filteredData[2]);

    for(let i=0; i<nbUV; i++){
        firstLine.value.push(filteredData[3+i]);
        UVs.set(filteredData[3+i], colors[i]);
    }
    myLines.value.push(firstLine.value);

    const line = ref([]);
    for(let i=2+nbUV+1; i<filteredData.length; i++){
      let verifier = false;
      if(UVs.has(filteredData[i])){
          verifier = true;
      }
      if(verifier){
              myLines.value.push(line.value);
              line.value = [];
              line.value.push(filteredData[i]);
              console.log(filteredData[i])
      }else{
              line.value.push(filteredData[i]);
      }

    if(i === filteredData.length-1){
        myLines.value.push(line.value);
    }
    }

    for(let i=1; i<myLines.value.length;i++){
      if(myLines.value[i].length > 4){
          if(myLines.value[i].length === 5){
            myLines.value[i][1] = myLines.value[i][1]+myLines.value[i][2];
            myLines.value[i].splice(2,1);
          }else if(myLines.value[i].length === 6){
            myLines.value[i][1] = myLines.value[i][1]+myLines.value[i][2]+myLines.value[i][3];
            myLines.value[i].splice(2,2);
          }else{
            console.log("Erreur de parsing !")
          }
      }

    }

    myLines.value.splice(1,1);

    for(let i=1; i<myLines.value.length;i++){
      let temp = myLines.value[i][3].split(',');
      temp[2] = temp[2].replace("S", "");
      temp[2] = temp[2].replace("=", "");
      temp.splice(1,1);
      myLines.value[i].splice(myLines.value[i].length-1,1);
      myLines.value[i].push(temp[0]);
      myLines.value[i].push(temp[1]);
    }

    myLines.value.splice(0,1);

}


</script>

<template>
  <div v-if="firstLine.length != 0">
    <h1>Emploi du temps de : {{ firstLine[0] }}</h1>
  </div>
  <div v-else>
    <h1>Emploi du temps</h1>
  </div>
  <input class="input-text" type="text" :value="text" @input="onInput" placeholder="Copiez collez votre emploi du temps  ici ...">
  <div class="grid-wrapper">
    <div class="grid-container" v-if="myLines.length >  0">
    <div class="grid-item" v-for="(item, index) in myLines" :key="index" :style="{ backgroundColor: UVs.get(item[0]) }" >
      <h1>{{item[0]}}</h1>
        <h2>{{item[3]}}</h2>
        <h2>{{item[4]}} -- {{ item[1] }}</h2>
    </div>
  </div>
  </div>

</template>

<style>
  @import '../styles/Application.css';
</style>