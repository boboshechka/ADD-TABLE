const btn = document.querySelector('.btn');
const container = document.querySelector('.container')
const form = document.getElementById('form');
// const items = [];
const tableCreated = false;
const tableBox = document.querySelector('.table__box');



document.addEventListener('DOMContentLoaded', async function () {

  createTable()

  // ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА
  try {
    let response = await fetch('http://attempt2/get.php');
    if (response.ok) {  //ПРОВЕРЯЕМ СОСТОЯНИЕ ОТВЕТА
      let result = await response.json();
      const table = document.querySelector('.table__box tbody');
      let html = '';
      console.log(result)
      for (let i = 0; i < result.length; i++) {
        html += `<tr><td>${result[i].manufacturer}</td><td>${result[i].model}</td><td>${result[i].cost}</td><td>${result[i].amount}</td></tr>`;
      }
      table.innerHTML = html;
    }
  }
  catch (error) {
    console.log(error);
  }

// ПЫТАЕМСЯ В СОРТИРОВКУ
  const getSort = ({ target }) => {
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
    );
    
    for(const tBody of target.closest('table').tBodies)
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    for(const cell of target.parentNode.cells)
        cell.classList.toggle('sorted', cell === target);
};

document.querySelectorAll('.products thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));


})


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

//   for (let i = 0; i < item.length[key]; i++) {
//     let products = document.querySelector('.products');
//     // let row = document.createElement('tr');
//     products.innerHTML = `
//           <td>${item[key][i][0]}</td>
//           <td>${item[key][i][1]}</td>
//           <td>${item[key][i][2]}</td>
//         `
//   }
// }
//   // tableCreated = true;
// }



