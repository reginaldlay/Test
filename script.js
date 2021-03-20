let nav = 0;
let clicked = null;
let loadedSelectors = false;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const monthDropdown = document.getElementById('monthSelector');
const yearDropdown = document.getElementById('yearSelector');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months =['January', 'February', 'March', 'April', 'May', 'June',  
               'July', 'August', 'September', 'October', 'November','December']

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function getDateVar(name, useNav){
  const dt = new Date();

  if (nav !== 0 && useNav) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  switch(name){
    case 'dt': return dt;
    case 'day': return dt.getDate();
    case 'month': return dt.getMonth();
    case 'year': return dt.getFullYear();
  }
}

function load() {
  const dt = getDateVar('dt', true);
  const day = getDateVar('day', true);
  const month = getDateVar('month', true);
  const year = getDateVar('year', true);
  
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  
  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  const currMonth = `${dt.toLocaleDateString('en-us', { month: 'long' })}`;
  const currYear = `${year}`;

  if(loadedSelectors === false){
    loadSelectors(currMonth, currYear);
  }

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function loadSelectors(currMonth, currYear){
  loadedSelectors = true;
  var monthValue = 0;
  months.forEach(m =>{
    var option = document.createElement('option');
    option.text = m;
    option.value = monthValue;
    monthValue++;
    monthDropdown.add(option);
  })

  for(let years = -5; years <= 5; years++){
    optionYear = parseFloat(currYear) + parseFloat(years);
    var option = document.createElement('option');
    option.text = optionYear;
    option.value = optionYear;
    yearDropdown.add(option);
  }
}

function changeDate(){
  const selMonth = monthDropdown.value;
  const selYear = yearDropdown.value;

  if(selYear !== '' && selMonth !== ''){
    monthDropdown.classList.remove('error');
    yearDropdown.classList.remove('error');

    let yearDiff = 0;
    let navtemp = nav;
    const currMonth = getDateVar('month', false);
    const currYear = getDateVar('year', false);
  
    console.log(selYear);
    console.log(currYear);
    
    nav = (selMonth-currMonth) + (selYear-currYear)*12;
    load();
  }
  else{
    monthDropdown.classList.add('error');
    yearDropdown.classList.add('error');
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    $("span.monthDiv select").val('-');
    $("span.yearDiv select").val('-');
    console.log(nav);
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    $("span.monthDiv select").val('-');
    $("span.yearDiv select").val('-');
    load();
  });
  
  document.getElementById('dateButton').addEventListener('click', changeDate);
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
