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
               'July', 'August', 'September', 'October', 'November','December'];
const startTime = document.getElementById('eventStartTime');
const endTime = document.getElementById('eventEndTime');

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
    loadSelectors(currYear);
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

function loadSelectors(currYear){
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

  if(selYear === '0'){
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

function timeToString(timeVal){
  var hours, minutes, ampm;
  hours = Math.floor(timeVal / 60);
  minutes = timeVal % 60;
  if (minutes < 10){
    minutes = '0' + minutes; // adding leading zero
  }
  ampm = hours % 24 < 12 ? 'AM' : 'PM';
  hours = hours % 12;
  if (hours === 0){
    hours = 12;
  }
  
  var timeString = hours + ':' + minutes + ' ' + ampm;

  return timeString;
}

function populateTime(selector) {
  var select = $(selector);
  for(var i = 0; i <= 1430; i += 30){
      select.append($('<option></option>')
          .attr('value', i)
          .text(timeToString(i))); 
  }
}

function openModal(date) {
  clicked = date;
  const emptyTime = '-1:0-1 AM';
  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    let eventStart = timeToString(parseFloat(eventForDay.start));
    let eventEnd = timeToString(parseFloat(eventForDay.end));

    if(eventStart === emptyTime){
      eventStart = 'None';
      eventEnd = 'None';
    }

    document.getElementById('eventText').innerText = eventForDay.title;
    document.getElementById('eventDesc').innerHTML = eventForDay.desc;
    document.getElementById('eventStart').innerHTML = eventStart;
    document.getElementById('eventEnd').innerHTML = eventEnd;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  startTime.classList.remove('error');
  endTime.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  eventDescInput.value = '';
  startTime.value = '-1';
  endTime.value = '-1';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    if(parseFloat(endTime.value) < parseFloat(startTime.value)){
      startTime.classList.add('error');
      endTime.classList.add('error');
    }
    else{
      eventTitleInput.classList.remove('error');
      startTime.classList.remove('error');
      endTime.classList.remove('error');

      events.push({
        date: clicked,
        title: eventTitleInput.value,
        desc: eventDescInput.value,
        start: startTime.value,
        end: endTime.value
      });
  
      localStorage.setItem('events', JSON.stringify(events));
      closeModal();
    }
  } 
  else {
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
    monthDropdown.value='none';
    yearDropdown.value='none';
    console.log(nav);
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    monthDropdown.value='none';
    yearDropdown.value='none';
    load();
  });
  
  document.getElementById('dateButton').addEventListener('click', changeDate);
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

populateTime(startTime);
populateTime(endTime);
initButtons();
load();
