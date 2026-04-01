let bookings = [];

const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

function scrollToForm() {
    document.getElementById("travelForm").scrollIntoView({
        behavior: "smooth"
    });
}
const form = document.getElementById("travelForm");
const tableBody = document.getElementById("tableBody");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const pkg = document.getElementById("package").value;
    const editIndex = document.getElementById("editIndex").value;

    const booking = { name, destination, date, pkg };

    if (editIndex === "") {
        bookings.push(booking); 
    } else {
        bookings[editIndex] = booking; 
        document.getElementById("editIndex").value = "";
    }

    form.reset();
    displayBookings();
});

function displayBookings() {
    tableBody.innerHTML = "";

    bookings.forEach((b, index) => {
        let row = `
            <tr>
                <td>${b.name}</td>
                <td>${b.destination}</td>
                <td>${b.date}</td>
                <td>${b.pkg}</td>
                <td>
                    <button class="edit" onclick="editBooking(${index})">Edit</button>
                    <button class="delete" onclick="deleteBooking(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editBooking(index) {
    const booking = bookings[index];

    document.getElementById("name").value = booking.name;
    document.getElementById("destination").value = booking.destination;
    document.getElementById("date").value = booking.date;
    document.getElementById("package").value = booking.pkg;
    document.getElementById("editIndex").value = index;
}

function deleteBooking(index) {
    bookings.splice(index, 1); 
    displayBookings();
}