function updateUTCTime() {
    const utcTimeElement = document.getElementById("utcTime")
    const now = new Date()
    const utcTimeString = now.toUTCString()
    utcTimeElement.textContent = utcTimeString
  }
  
  // Update the time immediately and then every second
  updateUTCTime()
  setInterval(updateUTCTime, 1000)
  
  