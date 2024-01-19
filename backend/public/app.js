let likeBtns = document.querySelectorAll(".like-btn");
let pressBtn = 1;
for(let btn of likeBtns){
    btn.addEventListener("click", () => {
        btn.style.color="red"
    })
    
}

// let btn = document.querySelector("#more-info");
// btn.addEventListener("click" , () => {
//     let toolbar=document.createElement("div");
//     console.dir(toolbar);
// })








