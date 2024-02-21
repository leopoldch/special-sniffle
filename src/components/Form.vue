<script setup>
import { ref } from 'vue'
const text = ref('')
const myLines = ref([]);
const colors = ["red", "orange", "blue", "green", "yellow", "pink", "purple", "cyan"]
function onInput(e) {
  text.value = e.target.value
  filterInputData();

console.log(myLines.value);

}
function filterInputData() {
    const words = text.value.split(" ");
    let filteredData = words.filter(word => word != "")
    const nbUV = parseInt(filteredData[2]);
    const firstLine = ref([]);
    firstLine.value.push(filteredData[0]);
    firstLine.value.push(filteredData[1]);
    firstLine.value.push(filteredData[2]);
    var UVs = new Map();

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
    return UVs;
}



</script>

<template>
  <h1>Emploi du temps de : name</h1>
  <input class="input-text" type="text" :value="text" @input="onInput" placeholder="Copiez collez votre emploi du temps ici ...">
</template>