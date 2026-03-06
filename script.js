const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "admin" && password === "admin123"){
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Invalid Credentials");
    }
});




// protect page
if(localStorage.getItem("auth")!=="true"){

window.location.href="login.html"

}



// load issues
async function loadIssues(type){

setActiveTab(type)
const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"
let issues=[]


const res=await fetch(API)

const data=await res.json()

issues=data.data

let filtered=issues


if(type==="open"){

filtered=issues.filter(issue=>issue.status==="open")

}

if(type==="closed"){

filtered=issues.filter(issue=>issue.status==="closed")

}


renderIssues(filtered)


document.getElementById("issueCount").innerText=
`${filtered.length} Issues`

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

<img src="./assets/Open-Status.png">
<h2 
class="font-bold text-blue-600 cursor-pointer">

${issue.title}

</h2>

<p class="text-sm text-gray-600 mt-2">
${issue.description.substring(0,80)}...
</p>

<p class="text-xs mt-2">Author: ${issue.author}</p>
<p class="text-xs">Category: ${issue.category}</p>
<p class="text-xs">Priority: ${issue.priority}</p>
<p class="text-xs">Label: ${issue.label}</p>

</div>

`

})

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


loadIssues("all");