let optionsCont = document.querySelector('.options-cont');
let optionsFlag = true;
let toolsCont =document.querySelector('.tools-cont')
let pencilCont = document.querySelector('.pencil-tool');
let eraserCont = document.querySelector('.eraser-tool');
let upload = document.querySelector('.upload');


optionsCont.addEventListener('click', (e)=>{
    optionsFlag = !optionsFlag;
    if(optionsFlag) openTool();
    else closeTool();
})

function closeTool(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "none";
    pencilCont.style.display = 'none';
    eraserCont.style.display = 'none';
}

function openTool(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "flex";

}

let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let pencilFlag = false;
let eraserFlag = false;

pencil.addEventListener('click',(e)=>{
    eraserCont.style.display = "none";
    eraserFlag = false;
    pencilFlag = !pencilFlag;

    if(pencilFlag) pencilCont.style.display = "block";
    else pencilCont.style.display = "none";
})

eraser.addEventListener('click',(e)=>{
    pencilCont.style.display = "none";
    pencilFlag = false;
    eraserFlag = !eraserFlag;

    if(eraserFlag) eraserCont.style.display = "flex";
    else eraserCont.style.display = "none";
})


// upload

upload.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let stickyTemplateHTML= `
            <div class="header-cont">
                <div class="minimize"></div>
                <div class="close"></div>
            </div>
            <div class="notes-cont">
                <img src="${url}"/>
            </div>
        `;
        createSticky(stickyTemplateHTML);
    })
    
    
})

//sticky notes

let sticky = document.querySelector('.notes');

sticky.addEventListener('click',(e)=>{
    
    let stickyTemplateHTML= `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="close"></div>
        </div>
        <div class="notes-cont">
            <textarea spellcheck="false"></textarea>
        </div>
    `;

    createSticky(stickyTemplateHTML);
    
})

function createSticky(stickyTemplateHTML){
    let stickyCont = document.createElement('div');
    
    stickyCont.setAttribute('class','sticky-cont');
    stickyCont.innerHTML= stickyTemplateHTML;
   
    document.body.appendChild(stickyCont);
    
    let minimize = stickyCont.querySelector('.minimize');
    
    let close = stickyCont.querySelector('.close');
    
    noteActions(minimize,close,stickyCont);

    stickyCont.onmousedown = function(event) {
      dragAndDrop(stickyCont,event);
    };
    
    stickyCont.ondragstart = function() {
        return false;
    };
}


function noteActions(minimize,close,stickyCont){
    close.addEventListener('click',(e)=>{
        stickyCont.remove();
    })

    minimize.addEventListener('click',(e)=>{
        let noteCont = stickyCont.querySelector('.notes-cont');
        let display = getComputedStyle(noteCont).getPropertyValue('display');
        if(display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}

function dragAndDrop(element,event){
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
      
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
          element.style.left = pageX - shiftX + 'px';
          element.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };
}

