const bookingForm = document.querySelector("#booking-form");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(bookingForm);
  const formattedData = Object.fromEntries(data);

  formattedData.guests = Number(formattedData.guests);

  const errorElement = document.querySelector("#form-error");

  if (!formattedData.name.trim()) {
    errorElement.textContent = "ОШИБКА: Введите имя";
    return;
  } else if (!formattedData.phone.trim()) {
    errorElement.textContent = "ОШИБКА: Введите номер телефона";
    return;
  } else if (0 >= formattedData.guests || formattedData.guests >= 10) {
    errorElement.textContent =
      "ОШИБКА: Кол-во гостей не может меньше 0 и больше 10";
    return;
  } else {
    errorElement.textContent = "";
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();

  console.log(result);
});
