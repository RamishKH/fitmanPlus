let url = "https://good-tan-jay.cyclic.app/";

let boxContainer = document.querySelector(".services .content ");

document.addEventListener("DOMContentLoaded", () => {
  fetchData(document.querySelector(".child.btn.active"));
});

const tagMappings = ["mental health", "Physical health", "nutritional health"]; // Add more mappings as needed

async function fetchData(element) {
  try {
    showLoading();


    const response = await fetch("http://localhost:5050/experts/page/1"); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const buttons = document.querySelectorAll('.box-container .btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    console.log(element);
    // Add "active" class to the clicked button
    element.classList.add('active');

    const data = await response.json();
    console.log(data);
    displayExpertData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function filterByCategory(element,category) {
  try {
    showLoading();

    const response = await fetch("http://localhost:5050/experts/"+category+"/page/1"); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const buttons = document.querySelectorAll('.box-container .btn');
    buttons.forEach(btn => btn.classList.remove('active'));
        
    // Add "active" class to the clicked button
    element.classList.add('active');

    const data = await response.json();
    console.log(data);
    displayExpertData(data);
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

function displayExpertData(data) {

  boxContainer.innerHTML = "";
  boxContainer.innerHTML = `
   
    ${data
      .map((elem) => {
        const encodedPictureUrl = encodeURI(elem.picture).replace(/\//g, '&#x2f;');
        return `
        <div class="box-container">
        <div class="box">
            <img src=${elem.picture} alt="">
            <div class="expert expert1" style=background:url('${encodedPictureUrl}');background-position:center;background-size:cover !important;">
                <div class="presentation icon">
                    <a href="${elem.videolink}" target="_blank">
                        <span>watch Presentation</span>
                        <i class="fas fa-play"></i>
                    </a>
                </div>
            </div>

        </div>
        <div class="box">
            <img src="${elem.picture}" alt="">

            <span>${elem.experience} Years of Experience </span>
            <h3>${elem.name}</h3>
            <div class="categories">
            ${elem.tags.map(tag => `<a class="btn">${tagMappings[tag-1]}</a>`).join("")}
            </div>
            <p>${elem.description}</p>
            <a href='${elem.booking}' target='_blank' class="btn-inverted">BOOK NOW </a>
            <a href='${elem.videolink}' target='_blank' class="rounded"><i class="fas fa-play"></i> presentation</a>
        </div>
        </div>

        `;
      })
      .join("")}`;
}



// var prevScrollpos = window.pageYOffset;
// window.onscroll = function () {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("navbar").style.top = "0";
//   } else {
//     document.getElementById("navbar").style.top = "-100px";
//   }
//   prevScrollpos = currentScrollPos;
// };

// async function getTrainerData() {
//   try {
//     let res = await fetch(`${url}/trainer`);
//     let data = await res.json();
//     displayTrainerData(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// getTrainerData();

// function displayTrainerData(data) {
//   boxContainer.innerHTML = "";
//   boxContainer.innerHTML = `
     
//       ${data
//         .map((elem) => {
//           return `
//         <div class="box">
//             <img src=${elem.image} alt="">
//             <div class="content">
//                 <span>expert trainer</span>
//                 <h3>${elem.name}</h3>
//                 <a href="./appointment.html" class="btn" data-id=${elem._id}>Book Appointment</a>
//                 <div class="share">
//                     <a href="#" class="fab fa-facebook-f"></a>
//                     <a href="#" class="fab fa-twitter"></a>
//                     <a href="#" class="fab fa-pinterest"></a>
//                     <a href="#" class="fab fa-linkedin"></a>
//                 </div>
//             </div>
//        </div>
//           `;
//         })
//         .join("")}`;

//   let appointmentBtns = document.querySelectorAll(".btn");

//   for (let appointmentBtn of appointmentBtns) {
//     appointmentBtn.addEventListener("click", (e) => {
//       let id = e.target.dataset.id;
//       sessionStorage.setItem("trainerId", id);
//     });
//   }
// }
