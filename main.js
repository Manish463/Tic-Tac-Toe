//taking elements from DOM of index.html
let form = document.querySelector("#myForm");
let rdo = document.getElementsByName("side");

//function
function select(e) {
  e.preventDefault();
  for (let i=0; i<rdo.length; i++) {
    if(rdo[i].checked) {
      localStorage.clear();
      localStorage.setItem("choice", rdo[i].value);
      window.location.href = "/game_page.html";
    }
  }
}

//Taking user choice and storing it in localstorage
if(form) {
  form.addEventListener("submit", select)
}


//taking elements from DOM of game_page.html
let score = document.querySelectorAll(".score-box span");
let gmBox = document.querySelector(".game-box");
let line = document.querySelector(".line");
let boxes = document.querySelectorAll(".box");
let i = document.querySelectorAll(".turn i")
let btn = document.querySelector(".crl");
let rst = document.querySelector(".reset");
let ng = document.querySelector(".newGame");

//Variables
let turn;
let p1=0, p2=0, p3=0, t=0;
const winPtt = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

//all functions
function inp_turn(){
  turn = localStorage.getItem("choice");
  localStorage.clear();
}
function trn_highliter(){
  if(turn === 'O'){
    i[0].style.color = "#0a6ceb";
    btn.classList.remove("left-shift");
    btn.classList.add("right-shift");
    i[1].style.color = "#ddd";
  } else {
    i[1].style.color = "#2ccece";
    btn.classList.remove("right-shift");
    btn.classList.add("left-shift");
    i[0].style.color = "#ddd";
  }
}
function line_draw(i){
  line.style.display = "block";
  let yUnit;

  if (window.matchMedia("(min-width: 1024px)").matches) {
    yUnit = "6.3vw";
  } else if (window.matchMedia("(max-width: 600px)").matches) {
    yUnit = "24vw";
  } else {
    yUnit = "7em";
  }

  switch (i) {
    case 0:
      line.style.transform = `translateY(-${yUnit})`;
      break;
    case 1:
      line.style.transform = `translateY(0vw)`;
      break;
    case 2:
      line.style.transform = `translateY(${yUnit})`;
      break;
    case 3:
      line.style.transform = `rotate(90deg) translateY(${yUnit})`;
      break;
    case 4:
      line.style.transform = `rotate(90deg) translateY(0vw)`;
      break;
    case 5:
      line.style.transform = `rotate(90deg) translateY(-${yUnit})`;
      break;
    case 6:
      line.style.transform = "rotate(45deg)";
      break;
    case 7:
      line.style.transform = "rotate(135deg)";
      break;
  }

  // Animation class toggle
  if (i >= 0 && i <= 5) {
    line.classList.remove("anim-crs");
    line.classList.add("anim-nor");
  } else if (i === 6 || i === 7) {
    line.classList.remove("anim-nor");
    line.classList.add("anim-crs");
  }
}
function winner() {
  winPtt.forEach((p, i) => {
    let pos1Val = boxes[p[0]].innerHTML;
    let pos2Val = boxes[p[1]].innerHTML;
    let pos3Val = boxes[p[2]].innerHTML;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      if (pos1Val.includes("fa-o")) {
        p1 += 1;
        score[0].innerText = p1;
      } else if (pos1Val.includes("fa-x")) {
        p2 += 1;
        score[1].innerText = p2;
      }
      gmBox.classList.add("disable");
      line_draw(i);
    }
  });
  t++;
  if(t==9){
    p3 += 1;
    score[2].innerText = p3;
  }
}

//Event listners
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turn === 'O') {
        box.style.color = "#2ccece";
        box.innerHTML = `<i class="fa-solid fa-o">`;
        box.classList.add("disable");
        turn = 'X';
      } else {
        box.style.color = "#0a6ceb";
        box.innerHTML = `<i class="fa-solid fa-x">`;
        box.classList.add("disable");
        turn = 'O';
      }
    }
    trn_highliter(turn);
    winner();
  })
});
rst.addEventListener("click", () => {
  t=0;
  line.style.display = "none";
  gmBox.classList.remove("disable");
  for(let box of boxes){
    box.innerHTML = "";
    box.classList.remove("disable");
  }
});
ng.addEventListener("click", ()=>{
  window.location.href = "/index.html";
  select();
  inp_turn();
  p1=p2=p3=0;
  score[0].innerText=score[1].innerText=score[2].innerText=0;
});

//code which invoked as the game_page.html loaded
if(window.location.pathname.endsWith("/game_page.html")) {
  inp_turn();
  trn_highliter();
  score[0].innerText = p1;
  score[1].innerText = p2;
  score[2].innerText = p3;
  line.style.display = "none";
}