const loadUsersBtn = document.querySelector("#load-users");
const currentStatus = document.querySelector("#status");
const usersList = document.querySelector("#users");

let users = [];
const searchInput = document.querySelector("#search");

const renderUsers = (data) => {
  usersList.replaceChildren();

  data.forEach((user) => {
    const userElement = document.createElement("p");
    const userDeleteBtn = document.createElement("button");

    userDeleteBtn.textContent = "Delete";
    userDeleteBtn.style.background = "#ff474c";
    userDeleteBtn.style.padding = "7px";
    userDeleteBtn.style.border = "none";
    userDeleteBtn.style.borderRadius = "5px";
    userDeleteBtn.style.color = "white";
    userDeleteBtn.style.cursor = "pointer";
    userDeleteBtn.dataset.id = user.id;
    userDeleteBtn.classList.add("delete-user");

    userElement.textContent = `${user.name} - ${user.email}`;
    userElement.style.fontWeight = "bold";

    usersList.append(userElement, userDeleteBtn);
  });
};

const loadUsersData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    users = data;
    renderUsers(users);

    currentStatus.textContent = "";
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
  detailsDiv.classList.toggle("hidden");
};

showDetails.addEventListener("click", seeHideDetail);

const filterSearch = () => {
  const query = searchInput.value;

  const filterUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()),
  );

  return filterUsers;
};

searchInput.addEventListener("input", () => {
  const filteredData = filterSearch();

  usersList.replaceChildren();

  renderUsers(filteredData);
});

usersList.addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("delete-user")) {
    return;
  }

  const userId = Number(target.dataset.id);
  deletedUserArray = users.filter((u) => u.id !== userId);
  renderUsers(deletedUserArray);
});
