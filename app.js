const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //context : (canvas)요소의 픽셀에 접근하는 것
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = canvas.offsetWidth;
const CANVAS_HEIGHT = canvas.offsetHeight;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
//console.log(canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//ctx.fillRect(50,20,200,100); //사각형 그림 시작x,시작y,종료x,종료y
//ctx.fillStyle = "green";


let painting = false; //그리는 상태
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

//움직임을 감지하고 라인을 그리는 function
function onMounseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //클릭안하고(painting할때가 mousedown밖에 없음) path를 만들기만 하는 중, 시작점
        //console.log("creating path in",x,y);
        ctx.beginPath(); //path: line
        ctx.moveTo(x, y); //좌표
        canvas.style.cursor = "grab";
    }else{ //클릭하고 움직임
        //console.log("creating line in",x,y);
        ctx.lineTo(x, y); //이전좌표와 지금좌표를 (직)선을만듬.
        ctx.stroke(); //선을 그림.
        canvas.style.cursor = "grabbing";
    }
}

//change color
function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

//input range size
function handleBrush(event){
   //console.log(event.target.value);
   const size = event.target.value;
   ctx.lineWidth = size;
}

//mode버튼 클릭시 fill, paint 상태 알려줌
function handleModeClick(){
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){ // if 없으면 채우고(filling) 선 그리는게 끝날때(paint) 색이 filling 됨
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMounseMove);
    canvas.addEventListener("mousedown", startPainting);//마우스 클릭했을때 : mousedown
    canvas.addEventListener("mouseup", stopPainting); //마우스 뗏을때 : mouseup
    canvas.addEventListener("mouseleave", stopPainting); //영역 벗어났을때 : mouseleave
    canvas.addEventListener("click", handleCanvasClick);
}

//각각의 색을 가져와서 적용
Array.from(colors).forEach(function(color){
    color.addEventListener("click", handleColor);
})

//input range 바꾸면 사이즈 바꿈
if(range){
    range.addEventListener("input", handleBrush);
}

//fill
if(mode){
    mode.addEventListener("click", handleModeClick);
}