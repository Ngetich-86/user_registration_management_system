const form = document.querySelector('form');
const tableData = document.getElementById('table-data');
const successMessage = document.getElementById('success-message');
const viewTableBtn = document.getElementById('view-table-btn');
const userTable = document.getElementById('user-table');
const userInfoHeading = document.getElementById('user-info-heading');

let currentRow = null;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('name').value;
  const userId = document.getElementById('id').value;
  const country = document.getElementById('country').value;
  const language = document.getElementById('languages').value;
  const password = document.getElementById('pass').value;
  document.getElementById('pass').type = 'text';

  if (currentRow) {
    // update the current row
    currentRow.cells[0].textContent = username;
    currentRow.cells[1].textContent = userId;
    currentRow.cells[2].textContent = country;
    currentRow.cells[3].textContent = language;
    currentRow.cells[4].textContent = password;
    currentRow = null;
    successMessage.textContent = "Successfully updated your data.";
  } else {
    // add a new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${username}</td>
      <td>${userId}</td>
      <td>${country}</td>
      <td>${language}</td>
      <td>${password}</td>
      <td><button class="edit-btn">Edit</button></td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    const editBtn = newRow.querySelector('.edit-btn');
    const deleteBtn = newRow.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
      // populate the form with the current row's data
      document.getElementById('name').value = newRow.cells[0].textContent;
      document.getElementById('id').value = newRow.cells[1].textContent;
      document.getElementById('country').value = newRow.cells[2].textContent;
      document.getElementById('languages').value = newRow.cells[3].textContent;
      document.getElementById('pass').value = newRow.cells[4].textContent;
      document.getElementById('pass').type = 'text';
      currentRow = newRow;
    });

    deleteBtn.addEventListener('click', () => {
      // delete the current row
      newRow.remove();
      successMessage.textContent = "Successfully deleted the row.";
    });

    tableData.appendChild(newRow);
    successMessage.textContent = "Successfully added your data.";
    viewTableBtn.style.display = "block";
    userInfoHeading.style.display = "block";
  }

  form.reset();
});

viewTableBtn.addEventListener('click', () => {
  userTable.style.display = "table";
  window.location.href = "#user-table";
});
