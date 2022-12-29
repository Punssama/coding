
//==========start,get/renderCourse==========
var courseAPI = "http://localhost:3000/courses"
var sub_patchBtn = document.querySelector("#submit");


function start() {
  handleForm();
  getCourses(renderCourses);
}

start();
function resetBox() {
  let resetName = document.querySelector(
    'input[name = "name"]'
  ).value = "";
  let resetDes = document.querySelector(
    'input[name = "description"]'
  ).value = "";
}

function getCourses(callback) {
  fetch(courseAPI)
    .then(function(response) {
      return response.json();
    })

    .then(callback);
}

function renderCourses(course) {
  let coursesList = document.querySelector("#list_courses");
  let htmls = course.map(function(courses) {
    console.log('array:', course)
    console.log('obj:', courses)
    console.log('id', course.indexOf(courses))
    // body...
    return `
        <li class="course-item-${courses.id}">
            <h4>${courses.name}</h4>
            <p>${courses.description}</p>
            <button onclick="removeCourse(${courses.id})">Remove</button>
            <button onclick="onChange(${course.indexOf(courses)},${courses.id})">Change</button>

        </li> `;
  });
  coursesList.innerHTML = htmls.join("");
}

//==========Create course/change course==========
//handle Form
function handleForm(id) {
  //createCourse
  if (sub_patchBtn.innerText === "Submit") {
    sub_patchBtn.onclick = function() {
      let name = document.querySelector('input[name = "name"]').value;
      let description = document.querySelector('input[name = "description"]')
        .value;
      let form_ = {
        name: name,
        description: description
      };
      createCourse(form_);
      resetBox()

      //handleForm();
    };
  } else if (sub_patchBtn.innerText === "Save") {
    //PUT course
    sub_patchBtn.onclick = function(id) {
      let edit_id = window.value;
      let editedName = document.querySelector('input[name = "name"]').value;
      let editedDes = document.querySelector('input[name = "description"]')
        .value;
      let form__ = {
        name: editedName,
        description: editedDes
      };
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form__)
      };

      fetch(courseAPI + "/" + edit_id, options)
        .then(function(response) {
          response.json();
        })

        .then(function() {
          resetBox()
          getCourses(renderCourses);
          sub_patchBtn.innerText = "Submit";
          handleForm();
        });
    };
  }
}

//POST and render course function
function createCourse(data, callback) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(courseAPI, options)
    .then(function(response) {
      response.json();
    })

    .then(function() {
      getCourses(renderCourses);
    });
}

//save button + input value function
function onChange(indexArr, id) {
  // window.value = indexArr + 1;
  // for (let i = indexArr; i <= id; i++) {
  //   window.value = i
  // }
  let patch_id = indexArr;
  let patch_name = document.querySelectorAll(`h4`)[patch_id].textContent;
  let patch_des = document.querySelectorAll(`p`)[patch_id].textContent;
  let inputPatchName = (document.querySelector(
    'input[name = "name"]'
  ).value = patch_name);
  let inputPatchDes = (document.querySelector(
    'input[name = "description"]'
  ).value = patch_des);
  sub_patchBtn.innerText = "Save";
  indexArr = id
  window.value = indexArr
  handleForm();
}

//==========Remove Course==========
function removeCourse(id) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(courseAPI + "/" + id, options)
    .then(function(response) {
      response.json();
    })

    .then(function() {
      let courseItem = document.querySelector("course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    })

    .then(function() {
      getCourses(renderCourses);
      sub_patchBtn.innerText = "Submit";
      handleForm();
    });
}


