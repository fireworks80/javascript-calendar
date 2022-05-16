const dayLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const displayDayLabel = () => {
  const thead = document.querySelector('thead');
  const labels =
    dayLabel.reduce((acc, label) => {
      acc += `<td>${label}</td>`;
      return acc;
    }, '<tr>') + '</tr>';

  thead.innerHTML = labels;
};

const calcCalendar = ({ year, month }) => {
  // 첫날요일 구하기
  const date = new Date(year, month, 1);
  const day = date.getDay(); // 0 ~ 6 (sun ~ sat);
  const dayInMonth = new Date(year, month + 1, 0).getDate(); // 마지막 일

  // 전달 마지막일 구하기
  const prevDayInMonth = new Date(year, month, 0).getDate();
  return {
    year,
    month,
    day,
    dayInMonth,
    prevDayInMonth,
  };
};

const txtDay = {
  day: 1,
  nextDay: 1,
  prevDay: 1,
  table: {
    true: () => '',
    false: () => (txtDay.day += 1),
  },
  insert(val) {
    return this.table[val]?.();
  },
};

const displayView = (date) => {
  const monthAndYear = document.querySelector('.month-and-year');
  const tbody = document.querySelector('tbody');

  tbody.innerHTML = '';

  monthAndYear.textContent = `${date.year}년 ${date.month + 1}월`;

  for (let row = 0; row < 6; row += 1) {
    const tr = document.createElement('tr');

    for (let col = 0; col < dayLabel.length; col += 1) {
      const td = document.createElement('td');

      if (row === 0 && col < date.day) {
        td.textContent = date.prevDayInMonth - date.day + txtDay.prevDay;
        txtDay.prevDay += 1;
      }
      if (row !== 0 || (col >= date.day && txtDay.day < date.dayInMonth)) {
        td.textContent = txtDay.day;
        txtDay.day += 1;
      }

      if (txtDay.day > date.dayInMonth + 1) {
        td.textContent = txtDay.nextDay;
        txtDay.nextDay += 1;
      }

      tr.appendChild(td);
    } // for

    tbody.appendChild(tr);
  } // for
};

const date = {
  today: new Date(),
  table: {
    prev: () => {
      date.today = new Date(date.today.getFullYear(), date.today.getMonth() - 1, date.today.getDate());
      return { year: date.today.getFullYear(), month: date.today.getMonth() };
    },
    today: () => ({ year: date.today.getFullYear(), month: date.today.getMonth() }),
    next: () => {
      date.today = new Date(date.today.getFullYear(), date.today.getMonth() + 1, date.today.getDate());
      return { year: date.today.getFullYear(), month: date.today.getMonth() };
    },
  },
  set(type) {
    return this.table[type]?.();
  },
};

document.querySelector('.btns').addEventListener('click', (e) => {
  const target = e.target.className;
  txtDay.day = 1;
  txtDay.prevDay = 1;
  txtDay.nextDay = 1;
  displayView(calcCalendar(date.set(target)));
});

displayDayLabel();
displayView(calcCalendar(date.set('today')));
