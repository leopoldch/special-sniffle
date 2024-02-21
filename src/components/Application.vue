<script setup>
import { ref } from 'vue'
const text = ref('')
const firstLine = ref([]);
const myLines = ref([]);
let colors = ["#20B2AA", "#FAEBD7", "#008B8B", "#BDB76B", "#8FBC8F", "#DAA520", "#CD5C5C", "#66CDAA","#808000","#6B8E23","#FFE4B5","#FFE4E1","#EEE8AA", "#CD853F", "#BC8F8F",
"#6A5ACD", "#F4A460"]
var UVs = new Map();
var days = new Map();

days.set("LUNDI...", 1)
days.set("MARDI...", 2)
days.set("MERCREDI", 3)
days.set("JEUDI...", 4)
days.set("VENDREDI", 5)
days.set("SAMEDI..", 6)




function shuffleArray(array) {
  for (let i = array.length -  1; i >  0; i--) {
    const j = Math.floor(Math.random() * (i +  1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function pushTime(mystring){
  let tab = mystring.split("-");
  let start = tab[0]
  let end = tab[1]

  let hours_start = start.split(":")
  let hours_end = end.split(":")

  let start_case = parseInt(hours_start[0]-7)*4 + parseInt(hours_start[1]/15)
  let end_case = parseInt(hours_end[0]-7)*4 + parseInt(hours_end[1]/15)

  let returned_tab = [start_case,end_case]
  return returned_tab;

}


function onInput(e) {
  text.value = e.target.value
  colors = shuffleArray(colors)
  if(text.value ===""){
    myLines.value = [];
    firstLine.value = []
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
      myLines.value[i].push(pushTime(temp[0]))
      console.log(pushTime(temp[0]))
    }

    myLines.value.splice(0,1);

}


</script>

<template>
  <div v-if="firstLine.length != 0">
    <h1 class="title-scheluded">Emploi du temps de : {{ firstLine[0] }}</h1>
  </div>
  <div v-else>
    <h1 class="title-scheluded">Emploi du temps</h1>
  </div>
  
  <input v-if="firstLine.length == 0" class="input-text" type="text" :value="text" @input="onInput" placeholder="Copiez collez votre emploi du temps  ici ...">
  <div class="grid-wrapper">
  
    <div class="grid-container-title" v-if="myLines.length >  0">
      <div class="title1">
        <p>Lundi</p>
      </div>
      <div class="title2">
        <p>Mardi</p>
      </div>
      <div class="title3">
        <p>Mercredi</p>
      </div>
      <div class="title4">
        <p>Jeudi</p>
      </div>
      <div class="title5">
        <p>Vendredi</p>
      </div>
      <div class="title6">
        <p>Samedi</p>
      </div>
    </div>

    <div class="grid-container" v-if="myLines.length >  0">
      <div class="grid-item" v-for="(item, index) in myLines" :key="index" :style="{ backgroundColor: UVs.get(item[0]), gridRowStart: item[5][0], gridRowEnd: item[5][1] , gridColumn: days.get(item[2])}">
        <p>{{item[0]}}<br>
        {{item[4]}} -- {{ item[1] }}</p>
      </div>
    </div>

  </div>

</template>

<style>
  @import '../styles/Application.css';
</style>