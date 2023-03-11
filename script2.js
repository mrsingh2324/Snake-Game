
pauseButton.addEventListener('click', () => {
    if (isPaused) {
      pauseButton.textContent = 'Pause';    
      pauseButton.style.fontSize ='4.2vh';
      pauseButton.style.fontWeight ='900'
      isPaused = false;
    } else {
      pauseButton.textContent = 'Resume';
      pauseButton.style.fontSize ='4.2vh';
      pauseButton.style.fontWeight='900';
      isPaused = true;
    }
  });


  
  pauseButton.addEventListener('click', ()=>{
    if(velocityX ===0 && velocityY===0){ 
        velocityX=1;
        velocityY=0;
    }
    else if(velocityX !=0 || velocityY !=0){ 
        isPaused=true;
        velocityX=0;
        velocityY=0;
    }
})