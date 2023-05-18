// Function to generate the calendar
function generateCalendar(year, month) {
    const daysInWeek = 7;
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
  
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
  
    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';
  
    let date = 1;
  
    // Create calendar rows
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');
  
      // Create calendar cells
      for (let j = 0; j < daysInWeek; j++) {
        const cell = document.createElement('td');
  
        if (i === 0 && j < firstDay) {
          // Display previous month's dates
          cell.classList.add('px-2', 'py-3', 'text-center', 'text-gray-300', 'md:px-3', 'dark:text-gray-500');
          cell.textContent = new Date(year, month, -firstDay + j + 1).getDate();
          cell.style.pointerEvents = 'none';
        } else if (date > lastDay) {
          // Display next month's dates
          cell.classList.add('px-2', 'py-3', 'text-center', 'text-gray-300', 'md:px-3', 'dark:text-gray-500');
          cell.textContent = new Date(year, month + 1, date - lastDay).getDate();
          cell.style.pointerEvents = 'none';
        } else {
          // Display current month's dates
          cell.classList.add('px-2', 'py-3', 'text-center', 'cursor-pointer', 'md:px-3', 'hover:text-blue-500');
          cell.textContent = date;
  
          // Disable selection of previous dates
          if (
            (year === currentYear && month === currentMonth && date < currentDate) ||
            (year === currentYear && month < currentMonth) ||
            year < currentYear
          ) {
            cell.style.pointerEvents = 'none';
          } else {
            // Add click event listener to select the date
            cell.addEventListener('click', () => {
              // Do something with the selected date
              console.log(`Selected date: ${year}-${month + 1}-${date}`);
            });
          }
  
          date++;
        }
  
        row.appendChild(cell);
      }
  
      calendarBody.appendChild(row);
    }
  }
  
  // Get current date and set it as the initial month and year
  const today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  
  // Set the initial month and year in the UI
  const monthYearElement = document.getElementById('month-year');
  monthYearElement.textContent = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(today);
  
  // Generate the calendar for the initial month and year
  generateCalendar(currentYear, currentMonth);
  
  // Event listener for the previous month button
  const prevBtn = document.getElementById('prev-btn');
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    monthYearElement.textContent = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(currentYear, currentMonth));
    generateCalendar(currentYear, currentMonth);
  });
  
  // Event listener for the next month button
  const nextBtn = document.getElementById('next-btn');
  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    monthYearElement.textContent = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(currentYear, currentMonth));
    generateCalendar(currentYear, currentMonth);
  });
  