import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from  "izitoast";
import  "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("button[data-start]")
const day = document.querySelector("span[data-days]")
const hourse = document.querySelector("span[data-hours]")
const min = document.querySelector("span[data-minutes]")
const sec = document.querySelector("span[data-seconds]")

startBtn.classList.add("is-not-active")
startBtn.disabled = true

let userSelectedDate = null
let timerId = null

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    const isPast = pickedDate < new Date()
  
    if(isPast){
        iziToast.error({
          id: "date-error",
          class: "toast-error",
          backgroundColor: "red",
          messageColor: "#fff",
          position: "topRight",
          timeout: false,
          close: true,
          message: "Please choose a date in the future"
        })
      startBtn.classList.add("is-not-active")
      startBtn.disabled = true
      userSelectedDate = null
      
    } else {
      const errorToast = document.querySelector("#date-error")
      if (errorToast) {
        iziToast.hide({}, errorToast)
      }
      startBtn.classList.remove("is-not-active")
      startBtn.disabled = false
      userSelectedDate = pickedDate
    }
  },
};

flatpickr("#datetime-picker", options)

startBtn.addEventListener("click", handleStart)

function handleStart(){
  if(!userSelectedDate || timerId)return
 
  input.classList.add("is-not-active")
  input.disabled = true
  startBtn.classList.add("is-not-active")
  startBtn.disabled = true
  
  updateTime()
  timerId = setInterval(updateTime, 1000)
  
}

function updateTime(){
  const diff = userSelectedDate.getTime() - Date.now()

  if(diff <= 0){
    clearInterval(timerId)
    timerId = null
    day.textContent = "00"
    hourse.textContent = "00"
    min.textContent = "00"
    sec.textContent = "00"
    input.classList.remove("is-not-active")
    input.disabled = false
    startBtn.classList.add("is-not-active")
    startBtn.disabled = true
    return
  }

  const {days, hours, minutes, seconds} = convertMs(diff)
  day.textContent = addLeadingZero(days)
  hourse.textContent = addLeadingZero(hours)
  min.textContent = addLeadingZero(minutes)
  sec.textContent = addLeadingZero(seconds)
        
} 

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value){
  return String(value).padStart(2, "0")
}





