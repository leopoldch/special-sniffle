<script setup>
import { ref } from 'vue'
import Cookies from 'js-cookie';
import html2pdf from 'html2pdf.js';
import Footer from './Footer.vue'

const text = ref('')
const firstLine = ref([]);
const myLines = ref([]);
const jours = ref([]);
const semaine = ref([]);
let colors = ["#20B2AA", "#FAEBD7", "#008B8B", "#BDB76B", "#8FBC8F", "#DAA520", "#CD5C5C", "#66CDAA","#808000","#6B8E23","#FFE4B5","#FFE4E1","#EEE8AA", "#CD853F", "#BC8F8F",
"#6A5ACD", "#F4A460", "ffbdfd", "bde0ff", "cbbd97", "#E8AABE", "#4AA3A2", "#C8BED1", "#B4F2E5", "#F3D4B0", "#F7AF9D",
"#B384A7", "#CE8F8A"]
const UVs = ref(new Map());
var days = new Map();


//console.log(UVs.value)
//console.log(text)

days.set("LUNDI...", 1)
days.set("MARDI...", 2)
days.set("MERCREDI", 3)
days.set("JEUDI...", 4)
days.set("VENDREDI", 5)
days.set("SAMEDI..", 6)



function rerollColors(){
  colors = shuffleArray(colors);
  let i =  0;
  for (const [key] of UVs.value) {
    UVs.value.set(key, colors[i]);
    i++;
  }
  Cookies.set('UVS', JSON.stringify(Array.from(UVs.value.entries())), {expires : undefined});

}

function applyTheme1(){
  colors = ["#20B2AA", "#FAEBD7", "#008B8B", "#BDB76B", "#8FBC8F", "#DAA520", "#CD5C5C", "#66CDAA","#808000","#6B8E23","#FFE4B5","#FFE4E1","#EEE8AA", "#CD853F", "#BC8F8F",
  "#6A5ACD", "#F4A460", "ffbdfd", "bde0ff", "cbbd97", "#E8AABE", "#4AA3A2", "#C8BED1", "#B4F2E5", "#F3D4B0", "#F7AF9D",
  "#B384A7", "#CE8F8A"]
  let i =  0;
  for (const [key] of UVs.value) {
    UVs.value.set(key, colors[i]);
    i++;
  }
  Cookies.set('UVS', JSON.stringify(Array.from(UVs.value.entries())), {expires : undefined});

}

function applyTheme2(){
  colors = ["#20B2AA", "#FAEBD7", "#008B8B", "#BDB76B", "#8FBC8F", "#DAA520", "#CD5C5C", "#66CDAA","#808000","#6B8E23","#FFE4B5","#FFE4E1","#EEE8AA", "#CD853F", "#BC8F8F",
  "#6A5ACD", "#F4A460", "ffbdfd", "bde0ff", "cbbd97", "#E8AABE", "#4AA3A2", "#C8BED1", "#B4F2E5", "#F3D4B0", "#F7AF9D",
  "#B384A7", "#CE8F8A"]
  colors = colors.reverse()
  let i =  0;
  for (const [key] of UVs.value) {
    UVs.value.set(key, colors[i]);
    i++;
  }
  Cookies.set('UVS', JSON.stringify(Array.from(UVs.value.entries())), {expires : undefined});

}

function fromStorage(){
  let temp1 = Cookies.get('EDT')
  let temp2 = Cookies.get('FIRTLINE')
  let temp3 = Cookies.get('UVS')

  if(temp1 !== undefined && temp2 !== undefined && temp3 !== undefined){
    text.value = temp3;
    firstLine.value = temp2.split(',');
    UVs.value = new Map(JSON.parse(temp3));
    myLines.value = JSON.parse(temp1);
  }
}


fromStorage();

function reset() {
  text.value = '';
  firstLine.value = [];
  myLines.value = [];
  UVs.value = new Map();
  colors = ["#20B2AA", "#FAEBD7", "#008B8B", "#BDB76B", "#8FBC8F", "#DAA520", "#CD5C5C", "#66CDAA","#808000","#6B8E23","#FFE4B5","#FFE4E1","#EEE8AA", "#CD853F", "#BC8F8F",
"#6A5ACD", "#F4A460"];
}

function clearStorage() {
  reset();
  Cookies.remove('EDT');
  Cookies.remove('FIRTLINE');
  Cookies.remove('UVS');
}

function shuffleArray(array) {
  for (let i = array.length -  1; i >  0; i--) {
    const j = Math.floor(Math.random() * (i +  1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function exportToPDF(){
  var element = document.getElementById('edt');
  const opt = {
  margin:       0,
  filename:     'sniffle_UTC_edt.pdf',
  image:        { type: 'jpeg', quality:   75 },
  html2canvas:  { scale:   1 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
  html2pdf().set(opt).from(element).save()
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



console.log(myLines.value)

jours.value.push("LUNDI...");
jours.value.push("MARDI...");
jours.value.push("MERCREDI");
jours.value.push("JEUDI...");
jours.value.push("VENDREDI");
jours.value.push("SAMEDI..");
//console.log(jours.value[0])


function buildSemaine(semaine, day){
  semaine.push([day[0], day[3], day[4], day[1]])
}


function parsingICS(text, semaine){
  //console.log("test" + semaine.value)
  //console.log("test" + semaine[0])
  semaine.value = []
  semaine.value.push([], [], [], [], [], [])
  for(let i = 0; i < text.length; i++){
    switch (text[i][2]){
      case 'LUNDI...':
        buildSemaine(semaine.value[0], text[i]);
        break;
      case 'MARDI...':
        buildSemaine(semaine.value[1], text[i]);
        break;
      case 'MERCREDI':
        buildSemaine(semaine.value[2], text[i]);
        break;
      case 'JEUDI...':
        buildSemaine(semaine.value[3], text[i]);
        break;
      case 'VENDREDI':
        buildSemaine(semaine.value[4], text[i]);
        break;
      case 'SAMEDI..':
        buildSemaine(semaine.value[5], text[i]);
        break;
    }
  }
  console.log(semaine);
}



//console.log(semaine)
//semaine.value[0].push("test")
//console.log(semaine.value[0][0])




//let semaine=CreerSemaine(myLines.value)

function CreerICS(semaine){
  parsingICS(myLines.value, semaine)
	let ics =""
	let uid=0
ics+=`BEGIN:VCALENDAR
PRODID:Calendar
VERSION:2.0
`
	for(let i=0;i<semaine.value.length;i++){
	console.log(semaine.value)
		for(let j=0;j<semaine.value[i].length;j++){
		console.log(i,j)
			ics+=`BEGIN:VEVENT
UID:`+uid+`@default
CLASS:PUBLIC
DESCRIPTION:`+semaine.value[i][j][3]+" de "+semaine.value[i][j][0]+" en "+semaine.value[i][j][2]+`
DTSTAMP;VALUE=DATE-TIME:20240221T230000	
DTSTART;VALUE=DATE-TIME:202402`+(19+i)+`T`+semaine.value[i][j][1].slice(0,2)+semaine.value[i][j][1].slice(3,5)+`00
DTEND;VALUE=DATE-TIME:202402`+(19+i)+`T`+semaine.value[i][j][1].slice(6,8)+semaine.value[i][j][1].slice(9,11)+`00
RRULE:FREQ=WEEKLY;COUNT=18
LOCATION:`+semaine.value[i][j][2]+`
SUMMARY;LANGUAGE=en-us:`+semaine.value[i][j][0]+" "+semaine.value[i][j][3]+`
TRANSP:TRANSPARENT
END:VEVENT
`  
	uid+=1
		}

	}
	ics+=`END:VCALENDAR`
	console.log("aaaaa"+ics)
	return ics
}


function downloadICS() {
	const icsContent = CreerICS(semaine.value); 
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent));
	element.setAttribute('download', 'emploi_du_temps.ics');
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}


function onInput(e) {
  text.value = e.target.value
  if(text.value ===""){
    myLines.value = [];
    firstLine.value = []
  }else{
    try{
      filterInputData();
      Cookies.set('FIRTLINE', firstLine.value,{ expires: undefined });
      Cookies.set('EDT', JSON.stringify(myLines.value),{ expires: undefined });
      Cookies.set('UVS', JSON.stringify(Array.from(UVs.value.entries())), {expires : undefined});
      console.log(JSON.stringify(myLines.value));
    }catch(error){
      console.log("erreur d'input")
    }

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
        UVs.value.set(filteredData[3+i], colors[i]);
    }
    myLines.value.push(firstLine.value);

    const line = ref([]);
    for(let i=2+nbUV+1; i<filteredData.length; i++){
      let verifier = false;
      if(UVs.value.has(filteredData[i])){
          verifier = true
      }
      if(verifier){
              myLines.value.push(line.value);
              line.value = [];
              line.value.push(filteredData[i])

      }else{
          if(filteredData[i].substring(0,1) === "/"){
            myLines.value.push(line.value);
            line.value = [];
            line.value.push(myLines.value[myLines.value.length -1][0])
            line.value.push(myLines.value[myLines.value.length -1][1])
            line.value.push(myLines.value[myLines.value.length -1][2])
            line.value.push(filteredData[i].substring(1,filteredData[i].length))
          }else{
            line.value.push(filteredData[i])
          }
      }

    if(i === filteredData.length-1){
        myLines.value.push(line.value)
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
            
            console.log("Erreur de parsing ! : ", myLines.value[i])
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

    myLines.value.splice(0,1)
}


</script>

<template>
  <div class="taskbar">

  <div v-if="text.length > 4">
    <h1 class="title-scheluded">Emploi du temps de : {{ firstLine[0] }}</h1>
  </div>
  <div v-else-if="text.length === 0">
    <h1 class="title-scheluded">Emploi du temps</h1>
  </div>
  <div v-else>
    <div>
      <h1 class="title-scheluded">Emploi du temps : Erreur d'entrée</h1>
    </div>
    <div class="indications" >
    <p>Indication : Veuillez appuyer sur le bouton de réinitialisation et renouvelez la tentative.</p>
  </div>
  </div>
</div>
  <div class="indications" v-if="text.length === 0 ">
    <p>Indication : vous devez copier coller le texte à partir de votre login et jusqu'à la dernière ligne de vos UVs</p>
    <p>Ce site web est fait pour être utilisé sur un poste de travail et non sur mobile ou tablette.</p>
  </div>

  
  <input v-if="firstLine.length ==  0" class="input-text" type="text" :value="text" @input="onInput" :placeholder="`Copiez collez votre emploi du temps  ici...`">
  

  
  <div class="grid-wrapper" id="edt" >
    <div class="grid-container-title-wrapper">
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
    </div>


    <div v-if="myLines.length >  0" class="grid-container-items-wrapper">
      <div class="grid-container-horaires">
          <span v-for="i in  60" :key="i">
            <div class="horaires" :style="{ gridColumn:  1 }">
              <p v-if="i%4 == 0">{{ i/4 +7 }}:00</p>
            </div>
          </span>
        </div>

        <div class="grid-container" v-if="myLines.length >  0">
            
            <span v-for="i in  320" :key="i">
              <div class="grid-separator" :style="{ gridRow: i, gridColumn:  1 }"></div>
            </span>
          
            <div class="grid-item"  v-for="(item, index) in myLines" :key="index" :style="{ backgroundColor: UVs.get(item[0]), gridRowStart: item[5][0], gridRowEnd: item[5][1] , gridColumn: days.get(item[2])}">
            <div class="grid-subitem">
              <p>{{item[0]}}<br>{{ item[3] + " - " }}{{item[4] + " - " }} {{ item[1] }}</p>
            </div>
          </div>

        </div>


      </div>
    </div>
    
    <div class="action-wrapper">
    <div v-if="myLines.length > 4" class="button2-container">
      <button class="button" @click="rerollColors">Couleurs aléatoires</button>
    </div>
    <div v-if="myLines.length > 4" class="button2-container">
      <button class="button" @click="applyTheme1">Thème 1</button>
    </div>
    <div v-if="myLines.length > 4" class="button2-container">
      <button class="button" @click="applyTheme2">Thème 2</button>
    </div>
    <div v-if="myLines.length > 4" class="button2-container">
      <button class="button" @click="exportToPDF">Export PDF</button>
    </div>
    <div v-if="myLines.length > 4" class="button2-container">
      <button class="button" @click="downloadICS">Export ICS</button>
    </div>
    <div class="button1-container">
      <button class="button" @click="clearStorage" >Réinitialiser</button>
    </div>
  </div>



<Footer/>
</template>

<style>
  @import '../styles/Application.css';
</style>