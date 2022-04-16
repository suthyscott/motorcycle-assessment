document.getElementById("complimentButton").onclick = function () {
  axios.get("http://localhost:4000/api/compliment/").then(function (response) {
    const data = response.data
    alert(data)
  })
}

document.getElementById("fortuneButton").addEventListener('click', () => {
  axios.get("http://localhost:4000/api/fortune/").then(function (response) {
    const data = response.data
    alert(data)
  })
})

//   moto logic
const motoDisplay = document.getElementById("moto-display")
const editZone = document.getElementById("edit-zone")
const addForm = document.getElementById("add-form")

const handleDisplay = arr => {
  while (motoDisplay.childNodes.length > 0) {
    motoDisplay.removeChild(motoDisplay.lastChild)
  }

  for (let i = 0; i < arr.length; i++) {
    displayMotorcycles(arr[i])
  }
}

// this function takes in a motorcycle object
const displayMotorcycles = moto => {
    console.log('DM', moto.id)

    // creating a div for the motorcycle, then adding the motorcycle's information within that div's innerHTML
  let motoContainer = document.createElement("div")
  motoContainer.className = "moto-container"
  motoContainer.innerHTML = `<h2>Make:</h2> <p>${moto.make}</p>
        <h2>Model:</h2> <p> ${moto.model}</p>
        <h2>Year:</h2> <p> ${moto.year}</p>
        <h2>Color:</h2> <p> ${moto.color}</p>
        <button id='edit-id-${moto.id}'>Edit</button>
        <button id='delete-id-${moto.id}'>Delete</button>
    `

  motoDisplay.appendChild(motoContainer)

    document.getElementById(`edit-id-${moto.id}`).addEventListener("click", e => {
      editMotorcycle(moto)
    })


    console.log(document.getElementById(`delete-id-${moto.id}`))
    document.getElementById(`delete-id-${moto.id}`).addEventListener("click", e => {
      console.log('event listener')
      deleteMotorcycle(moto.id)
    })

}

const getMotorcycles = () => {
  axios
    .get("http://localhost:4000/api/motorcycles")
    .then(res => {
      handleDisplay(res.data)
    })
    .catch(err => console.log(err))
}

const addMotorcycle = e => {
  e.preventDefault()

  const newMotorcycle = {
    make: document.getElementById("new-make").value,
    model: document.getElementById("new-model").value,
    year: document.getElementById("new-year").value,
    color: document.getElementById("new-color").value
  }
  axios
    .post(`http://localhost:4000/api/motorcycle`, newMotorcycle)
    .then(res => {
      handleDisplay(res.data)
    })
    .catch(err => console.log(err))

  document.getElementById("new-make").value = ""
  document.getElementById("new-model").value = ""
  document.getElementById("new-year").value = ""
  document.getElementById("new-color").value = ""
}

addForm.addEventListener("submit", addMotorcycle)

const editMotorcycle = moto => {
  console.log("hit")
  const editForm = document.createElement("form")
  editForm.className = 'edit-form'
  editForm.innerHTML = `
            <input id='make-input' placeholder="Make" class="form-input" value="${moto.make}"/>
            <input id='model-input' placeholder="Model" class="form-input" value="${moto.model}"/>
            <input id='year-input' placeholder="Year" class="form-input" value="${moto.year}"/>
            <input id='color-input' placeholder="Color" class="form-input" value="${moto.color}"/>
            <button>save changes</button>
    `

  editZone.appendChild(editForm)

  editForm.addEventListener("submit", e => {
    e.preventDefault()

    let updates = {
      make: document.getElementById("make-input").value,
      model: document.getElementById("model-input").value,
      year: document.getElementById("year-input").value,
      color: document.getElementById("color-input").value
    }

    axios
      .put(`http://localhost:4000/api/motorcycle/${moto.id}`, updates)
      .then(res => {
        handleDisplay(res.data)
        editForm.remove()
      })
      .catch(err => console.log(err))
  })
}

const deleteMotorcycle = id => {
  console.log('hit delete')
  axios
    .delete(`http://localhost:4000/api/motorcycle/${id}`)
    .then(res => {
      console.log(res)
      handleDisplay(res.data)
    })
    .catch(err => console.log(err))
}

getMotorcycles()
