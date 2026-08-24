const loadUsersBtn = document.querySelector("#load-users");
const currentStatus = document.querySelector("#status");
const usersList = document.querySelector("#users");

const loadUsersData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    currentStatus.textContent = "";

    usersList.replaceChildren();

    data.forEach((user) => {
      const userElement = document.createElement("p");

      userElement.textContent = `${user.name} - ${user.email}`;
      userElement.style.fontWeight = "bold";

      usersList.append(userElement);
    });
  } catch (e) {
    currentStatus.textContent = "Произошла ошибка при запросе данных.";
    console.error(e);
  }
};

loadUsersBtn.addEventListener("click", () => {
  currentStatus.textContent = "Loading...";
  loadUsersData();
});

const showDetails = document.querySelector("#show-details");
const detailsDiv = document.querySelector("#details");

const seeHideDetail = () => {
  detailsDiv.classList.contains("hidden")
    ? (showDetails.textContent = "Hide details")
    : (showDetails.textContent = "Show details");
};

showDetails.addEventListener("click", () => seeHideDetail());
