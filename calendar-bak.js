const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const monthAndYear = document.querySelector('.month-and-year');

const showCalendar = (month, year) => {
  // 0 ~ 6, 0 = sun return 요일
  let firstDay = new Date(year, month).getDay();

  // 달의 날짜를 반환 (마지막 날짜)
  let dayInMonth = 32 - new Date(year, month, 32).getDate();

  const tbody = document.querySelector('.calendar tbody');
  tbody.innerHTML = '';

  monthAndYear.textContent = `${year}년 ${month + 1}월`;

  // create cell
  let date = 1;

  for (let i = 0; i < 6; i += 1) {
    let row = document.createElement('tr');

    for (let j = 0; j < 7; j += 1) {
      if (date > dayInMonth) break;

      let cell = document.createElement('td');
      if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
        cell.classList.add('today');
      }

      cell.textContent = i === 0 && j < firstDay ? '' : date;

      row.appendChild(cell);
      date += 1;
    }

    tbody.appendChild(row);
  } // for
};

showCalendar(currentMonth, currentYear);
