









// load issues
async function loadIssues(type){

setActiveTab(type)
manageSpinner(true)

const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"
let allissues=[]

if(allissues.length === 0){   // fetch only first time
const res = await fetch(API)
const data = await res.json()

allissues = data.data
}

let filtered=allissues


if(type==="open"){

filtered=allissues.filter(issue=>issue.status==="open")

}

if(type==="closed"){

filtered=allissues.filter(issue=>issue.status==="closed")

}


renderIssues(filtered)


document.getElementById("issueCount").innerHTML=
`<div class="flex justify-between my-8 shadow-sm px-5 py-5 items-center">
<div class="flex items-center gap-5 ">
<img class="bg-purple-200 p-2 rounded-full" src="./assets/Aperture.png">
<p class="text-gray-400"><span class="text-gray-950">${filtered.length} Issues</span><br>Track and manage your project issues</p>


</div>
<div class="flex gap-6">
<p><i class="fa-solid fa-circle text-green-400 align-middle mr-1"></i>open</p>
<p><i class="fa-solid fa-circle text-purple-400 align-middle mr-1"></i>closed</p>
</div>
</div>
`

}

function getPriorityColor(priority){
  if(priority === "high") return "bg-red-50 text-red-400";
  if(priority === "medium") return "bg-yellow-50 text-yellow-500";
  return "bg-gray-100 text-gray-500";
}
// spinner


function manageSpinner (status){
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issuesContainer").classList.add("hidden")
    }else{
           document.getElementById("issuesContainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden")
    }
}

// modal is here
async function loadCardDetails  (id)  {
  

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    
    const res = await fetch(url);
    const details = await res.json();
    displayCardDetails(details.data)
}
function displayCardDetails(info){
   const detailsBox = document.getElementById("details-container");
   detailsBox.innerHTML = `

         <h2 class="font-bold capitalize text-xl py-2">${info.title}</h2>
        <div class="flex gap-5 items-center my-2">
            <button class="rounded-full bg-gray-400 font-bold uppercase px-5 py-2">${info.status}</button>
            <span class="capitalize">Opened by ${info.assignee}</span>
            <span> ${info.createdAt}</span>
        </div>
        <div class=" font-bold">
<button class="text-xs mt-2 bg-red-200 text-red-400 px-3 py-2 rounded-full font-bold uppercase"> <i class="fa-solid fa-bug"></i>${info.labels[0]}</button>
<button class="text-xs mt-2 bg-yellow-200 text-yellow-600 px-3 py-2 rounded-full font-bold uppercase"><i class="fa-solid fa-circle-radiation"></i> ${info.labels[1]}</button>
</div>
<p class="py-3">${info.description}</p>
<div class="flex justify-between">
   <div class="">
     <label >Assigne: </label><br>
    <span class="font-bold capitalize">${info.assignee}</span>
   </div>
   <div>
     <label >Priority: </label><br>
    <button class="${getPriorityColor(info.priority)} rounded-full px-8 py-2 uppercase ">${info.priority}</button>
   </div>
</div>
   `
 document.getElementById("info_modal").showModal();

}
// render cards
function renderIssues(list){

const container=document.getElementById("issuesContainer")

container.innerHTML=""

list.forEach(issue=>{

const border=
issue.status==="open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500"

container.innerHTML+=`

<div class="bg-white p-4 rounded shadow ${border}">

<div class="flex justify-between mb-2">
<img class="w-10" src="./assets/Open-Status.png"/>
<button class="${getPriorityColor(issue.priority)} px-8 text-sm font-bold rounded-full uppercase py-2">${issue.priority}</button>
</div>
<h2 onclick="loadCardDetails(${issue.id})"
class="font-bold text-blue-600 cursor-pointer">

${issue.title}

</h2>

<p class="text-sm text-gray-600 mt-2">
${issue.description.substring(0,80)}...
</p>

<div class=" font-bold">
<button class="text-xs mt-2 bg-red-200 text-red-400 px-3 py-2 rounded-full font-bold uppercase"> <i class="fa-solid fa-bug"></i>${issue.labels[0]}</button>
<button class="text-xs mt-2 bg-yellow-200 text-yellow-600 px-3 py-2 rounded-full font-bold uppercase"><i class="fa-solid fa-circle-radiation"></i> ${issue.labels[1]}</button>
</div>
<p class="text-xs py-2">#1 ${issue.assignee}</p>
<p class="text-xs"> ${issue.createdAt}</p>


</div>

`

})

manageSpinner(false)
}

function setActiveTab(type){
    document.querySelectorAll(".tab").forEach(btn => {
        btn.classList.remove("bg-blue-500","text-white")
btn.classList.add("outline")
    })

    document.getElementById(type+"Tab")
.classList.remove("outline");
    document.getElementById(type+"Tab").classList.add("bg-blue-500", "text-white");

    
}


loadIssues("all")


document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data =>{
        const allIssues = data.data;
        console.log(allIssues)
        const filterIssues = allIssues.filter(issue => issue.title.toLowerCase().includes(searchValue))
        renderIssues(filterIssues)
    })
})

