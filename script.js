//Get DOM Elements

const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI();

let ticketPrice = +movieSelect.value;


//Get data from localstorag and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !==null && selectedSeats.length > 0){
      seats.forEach((seat, index) => {
       if(selectedSeats.indexOf(index) > -1) {
           seat.classList.add('selected');
       }
      })
  };
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if(selectedMovieIndex !==null){
      movieSelect.selectedIndex = selectedMovieIndex; 
  }
}




//Event Listerners
//1.Event listener for container to check for click on seats
function updateSelectCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat=>{
        return[...seats].indexOf(seat) });
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    localStorage.setItem('seletedSeats', JSON.stringify(seatsIndex));
}

//Save the movie data to local storage

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectMovieIndex",movieIndex);
    localStorage.setItem("selectMoviePrice",moviePrice);
}

container.addEventListener('click', (e) => {
    console.log(container);

    if(e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied'))

    {
        e.target.classList.toggle('selected');
        updateSelectCount()

    }
})

//2. Event listener for movie select
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectCount();

})

//Update seatcount and price total
updateSelectCount();
