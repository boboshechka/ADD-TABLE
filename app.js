const btn = document.querySelector('.btn');
const container = document.querySelector('.container')
const form = document.getElementById('form');
const tableCreated = false;
const tableBox = document.querySelector('.table__box');
// const deleteAll = document.querySelector('.btn_delete');
const del = document.querySelectorAll('.delete')

function createTable() {
  tableBox.innerHTML = `
  <table class="products">
    <thead>
      <tr>
        <th>Производитель</th>
        <th>Наименование</th>
        <th>Цена</th>
        <th>Количество</th>
      </tr>
    </thead>
    <tbody ></tbody> 
  </table>
  `;

}


document.addEventListener('DOMContentLoaded', async function () {

  createTable();

  // ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА
  try {
    let response = await fetch('http://attempt2/get.php');
    if (response.ok) {  //ПРОВЕРЯЕМ СОСТОЯНИЕ ОТВЕТА
      let result = await response.json();

      const tbody = document.querySelector('.table__box tbody');

      for (let i = 0; i < result.length; i++) {
        const fields = ['manufacturer', 'model', 'cost', 'amount'];
        const row = document.createElement('tr');
        row.className = 'row';

        for (let j = 0; j < fields.length; j++) {
          const cell = document.createElement('td');
          const fieldName = fields[j];
          const value = result[i][fieldName];
          cell.innerText = value;

          row.appendChild(cell);
        }

        const cell = document.createElement('td');
        cell.innerText = 'x';
        cell.onclick = function () { deleteRow(result[i], row) };
        row.appendChild(cell);

        tbody.appendChild(row);
      }

      
      // let html = '';
      // const table = document.querySelector('.table__box tbody');
      // let tr = document.createElement('tr');
      // tr.className('row');
      // let html = '';
      // console.log(result)
      // for (let i = 0; i < result.length; i++) {
      //   html += `
      //   <tr class = "row">
      //     <td>${result[i].manufacturer}</td>
      //     <td>${result[i].model}</td>
      //     <td>${result[i].cost}</td>
      //     <td>${result[i].amount}</td>
      //     <td class="delete" onclick = "deleteRow(${result[i]})">✖</td>
      //   </tr>`;
      // }
      // table.innerHTML = html;
    }
  }
  catch (error) {
    console.log(error);
  }

  // ПЫТАЕМСЯ В СОРТИРОВКУ
  const getSort = ({ target }) => {
    const tbody = document.querySelector('.table__box tbody');
    const rows = Array.from(document.querySelectorAll('.products .row'));
    target.dataset.order = -(target.dataset.order || -1)
    // 
    // const comparator = (order) => (r1, r2) => {
    //   return order * (r1.childNodes[3].textContent - r2.childNodes[3].textContent);
    // };

    
    rows.sort((r1, r2) => {
      return target.dataset.order * (r1.childNodes[3].textContent - r2.childNodes[3].textContent);
    });
    // rows.sort(comparator(target.dataset.order))
    for (let i = 0; i < rows.length; i++) {
      tbody.appendChild(rows[i])
    }
    console.log('target', target)



    // const index = [...target.parentNode.cells].indexOf(target);
    // const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    // const comparator = (index, order) => (a, b) => order * collator.compare(
    //   a.children[index].innerHTML,
    //   b.children[index].innerHTML
    // );

    // for (const tBody of target.closest('table').tBodies)
    //   tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    // for (const cell of target.parentNode.cells)
    //   cell.classList.toggle('sorted', cell === target);
  };

  document.querySelectorAll('.products thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

})



const deleteRow = async (item, row) => {
  // const row = target.closest('.row');
  // const rows = document.querySelectorAll('.products .row');
  // const index = [...rows].indexOf(row);


  try {
    let response = await fetch('http://attempt2/deleteRow.php', {
      method: 'DELETE',
      body: JSON.stringify(item)
    });
    if (response.ok) {

      row.remove();
    }
  }
  catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  // if (!tableCreated) {
  //   createTable()
  // }

  const item = addToBasket()

  sendToServer(item)
})

function addToBasket() {
  // поля формы
  const fields = document.querySelectorAll('select , input')
  values = {}; // собираем полученные значения из формы


  fields.forEach(field => {
    const { name, value } = field

    values[name] = value
  });


  return values;


  // items.push(values);
  // addToTable(values)
  // console.log(items)
};

// ОТПРАВКА НА СЕРВЕР
const sendToServer = async (item) => {
  try {
    let response = await fetch('http://attempt2/post.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(item)
    });
    // console.log('GOPGOGOGO', item)
    // console.log('response', response)
  }
  catch (error) {
    console.log(error);
  }
}

const deleteAll = async () => {
  try {
    let response = await fetch('http://attempt2/deleteAll.php')
    if (response.ok) {
      let result = await response.json();
      // body.removeChild('table')
      console.log(response)
    }

  } catch (error) {
    console.log(error)
  }
}

document.querySelector('.btn_delete').addEventListener('click', deleteAll)


