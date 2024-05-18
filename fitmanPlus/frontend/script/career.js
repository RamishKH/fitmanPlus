let boxContainer = document.querySelector(".services .content ");

document.addEventListener("DOMContentLoaded", () => {
  fetchData(document.querySelector(".child.btn.active"));
});


async function fetchData(element) {
  try {
    showLoading();


    const response = await fetch("http://localhost:5050/career"); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    displayCareerData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



function showLoading(){
  console.log("show loading");
  var html ="<div class='box-container s'><img style='display: block !important;' src='images/loading.gif'></div>";
  boxContainer.innerHTML = "";
  boxContainer.innerHTML=html;
}

function displayCareerData(data) {

  boxContainer.innerHTML = "";
  boxContainer.innerHTML = `
   
    ${data
      .map((elem) => {
        return `
        <div class="box-container">
        <div class="box">
            <span>${elem.role}</span>
            <h3>${elem.title}</h3>
            <p>${elem.description}</p>
            <a href="${elem.form}" target="_blank" class="btn-inverted">Apply Now</a>
        </div>

    </div>
        `;
      })
      .join("")}`;
}


