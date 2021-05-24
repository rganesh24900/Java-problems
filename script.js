
const cards = document.querySelectorAll('.card');
let hasFlipped=false;
let lockboard=false;
let firstcard,secondcard;
let flipped=0;
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn"); 
const playAgain= document.querySelector(".playagain-btn");
const movesCount=document.querySelector(".movescounter");
let moves=0;
const timeCounter=document.querySelector(".timer");
let minutes=0;
let seconds=0;
let timeStart=false;


function timer(){
    time=setInterval(function(){ 
        seconds++;

        if(seconds == 60){
            minutes++;
            seconds=0;
        }
        timeCounter.innerHTML="Timer: "+minutes+"Mins"+seconds+" Secs ";
    },1000);
}
    function stopTime(){
        clearInterval(time);

    }
    
    
     function movescounter(){
        movesCount.innerHTML++;
        moves++; 
     }  

    
    
//function deck(){
   // if (timeStart==false){
     //   timeStart=true
   // timer();}
   // flipCard();
//}     
        

function flipCard(){
    
    if (timeStart==false){
        timeStart=true
    timer();}
       
    movescounter();
    

    
    if(lockboard)return;
    if(this==firstcard)return;
    
    this.classList.add('flip');
    if(!hasFlipped){
        hasFlipped=true;
        
         
        firstcard=this;
        
        return;
    }
    
        
        secondcard=this;
        checkForMatch();
        
    

}
function checkForMatch(){
    let isMatch=firstcard.dataset.framework==secondcard.dataset.framework;
    isMatch ? disableCards():unflipCards();
    

}
function disableCards(){
   
    firstcard.removeEventListener('click',flipCard);
    secondcard.removeEventListener('click',flipCard);
    flipped++;
    resetCards();
    
    winGame();
    
    }

function unflipCards(){
    lockboard=true;
        setTimeout(()=>{firstcard.classList.remove('flip');
    secondcard.classList.remove('flip');
     resetCards();},1500)
    // movescounter();
    

}
cards.forEach(card => card.addEventListener('click',flipCard));
function resetEverything(){
    stopTime();
    timeStart=false;
    seconds=0;
    minutes=0;

    timeCounter.innerHTML = "Timer : 0:00";
    moves=0;
    movesCount.innerHTML = 0;
    
    } 
    function addStats(){
        const stats = document.querySelector(".modal-content");

        for (let i =1;i<= 2;i++) {
            const statsElement = document.createElement("p");
            statsElement.classList.add("stats");
            stats.appendChild(statsElement);
        }
        let p = stats.querySelectorAll("p.stats");
        p[0].innerHTML="Time to complete:"+minutes+"Minutes and"+seconds+" Seconds";
        p[1].innerHTML="Moves Taken"+moves; 
        
    }
    function displayModal(){
        const modalClose=document.getElementsByClassName("close")[0];
        modal.style.display= "block";

        modalClose.onclick = function() {
           
        
                modal.style.display="none";
            
        };
        window.onclick=function(event){
            if(event.target==modal){
                modal.style.display = "none";
            }
        };
    }
    function resetCards(){
        [hasFlipped,lockboard]=[false,false];
        [firstcard,secondcard]=[null,null]; 
    }
       
  function winGame(){
    if(flipped==5){
        stopTime();

        addStats();
        displayModal();
        alert("Congrats!!You have found all the 5 pair of cards.")
  }    
}    

(function shuffle(){
    cards.forEach(card =>{let randompos = Math.floor(Math.random()*12);
    card.style.order=randompos;});
})
();

reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click',function(){
    modal.style.display = "none";
    resetEverything();
});
  
