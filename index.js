const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.buttons div');
const play = document.querySelectorAll('.outer-circle div');
const end = document.querySelectorAll('.slide-14 div');
const playButtonImage = document.querySelectorAll('.outer-circle');
const triangle = document.querySelectorAll('.triangle');

let timeoutID;
var count = 1;

function getNextPrev(){
  timeoutId = setTimeout(() => {
  })
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);
  let next, prev;

  if (activeIndex === slides.length - 1)
  {
    next = slides[0];
  }
  else {
   next = slides[activeIndex+1];
  }

  if (activeIndex === 0)
  {
    prev = slides[slides.length - 1];
  }
  else {
    prev = slides[activeIndex - 1];
  }

  return[next, prev]

  console.log(ne)
}

function getPosition() {
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();

  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = 'translateX(0)';
    }
    else if (slide === prev) {
      slide.style.transform = 'translateX(-100%)';
    }
    else if (slide === next) {
      slide.style.transform = 'translateX(100%)';
    }
    else {
      slide.style.transform = 'translate(100%)';
    }

    slide.addEventListener('transitionend', ()=> {
      slide.classList.remove('top');
    })
  })
}
getPosition();


buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('next')) getNextSlide()
    else if (button.classList.contains('prev')) getPrevSlide();
  })
})

function getNextSlide() {
 clearTimeout(timeoutId);
  const current = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  if(current.classList.contains('top')) {
    return;
  }
  current.classList.add('top');
  next.classList.add('top');
  current.classList.remove('active');
  current.style.transform = 'translate(-100%)';
  next.classList.add('active');
  next.style.transform = 'translate(0)';
  getPosition();
  autoLoop();
}

function getPrevSlide() {
  clearTimeout(timeoutId);
  const current = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();
  if(current.classList.contains('top')) {
    return;
  }
  current.classList.add('top');
  prev.classList.add('top');
  current.classList.remove('active');
  current.style.transform = 'translateX(100%)';
  prev.classList.add('active');
  prev.style.transform = 'translateX(0)';
  getPosition();
  autoLoop();
}

function pauseTutorial() {
  return;
}

function autoLoop() {
  document.getElementById("play").addEventListener('click', changeColor);
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);
  timeoutId = setTimeout(() => {
    getNextSlide();
  }, 2000)
  console.log(activeIndex)
  console.log(slides.length)
  if (activeIndex === slides.length - 1)
  {
    document.getElementById("play").style.backgroundColor = "blue";
    document.getElementById("pause").style.opacity=0;
    document.getElementById("triangle").style.opacity=1;
    getNextSlide();
  }
  document.getElementById("play").addEventListener('click', pauseTutorial);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('next'))
    {
      document.getElementById("play").style.backgroundColor = "blue";
      document.getElementById("pause").style.opacity=0;
      document.getElementById("triangle").style.opacity=1;
      getNextSlide()
    }
    else if (button.classList.contains('prev'))
    {
      document.getElementById("play").style.backgroundColor = "blue";
      document.getElementById("pause").style.opacity=0;
      document.getElementById("triangle").style.opacity=1;
      getPrevSlide();
    }
  })
})

function changeColor() {
  console.log(this.style.backgroundColor)
  if (this.style.backgroundColor === "red")
  {
     clearTimeout(timeoutId);
    this.style.backgroundColor = "blue";
    document.getElementById("pause").style.opacity=0;
    document.getElementById("triangle").style.opacity=1;
  }
  else {
    this.style.backgroundColor = "red";
    document.getElementById("triangle").style.opacity=0;
    document.getElementById("pause").style.opacity=1;
    autoLoop();
  }
}
document.getElementById("play").addEventListener('click', changeColor);
