let employees = JSON.parse(localStorage.getItem("employees")) || [];

const form = document.getElementById("employeeForm");
const tableBody = document.querySelector("#employeeTable tbody");

function displayEmployees() {
    tableBody.innerHTML = "";

    employees.forEach((emp, index) => {
        let row = `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.password}</td>
                <td>
                    <button class="edit" onclick="editEmployee(${index})">Edit</button>
                    <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    localStorage.setItem("employees", JSON.stringify(employees));
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        employees.push({ name, email, password });
    } else {
        employees[editIndex] = { name, email, password };
        document.getElementById("editIndex").value = "";
    }

    form.reset();
    displayEmployees();
});

function editEmployee(index) {
    const emp = employees[index];

    document.getElementById("name").value = emp.name;
    document.getElementById("email").value = emp.email;
    document.getElementById("password").value = emp.password;
    document.getElementById("editIndex").value = index;
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    displayEmployees();
}

displayEmployees();