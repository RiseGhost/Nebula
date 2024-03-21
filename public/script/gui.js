const desktop = document.getElementById("desktop")
var desktop_width = desktop.offsetWidth
var desktop_column = []

function Columns(width, per) { return parseInt((desktop_width * per) / width) }

function update_gui() {
    desktop_column.forEach(element => {
        desktop.appendChild(element)
    })
}

function addColumns(width, per) {
    console.log("entrou")
    const column_number = Columns(width, per)
    console.log("column number", column_number)
    for (var index = 0; index < column_number; index++) {
        var column = document.createElement("div")
        column.style.width = width + "px"
        column.id = "column"
        desktop_column.push(column)
    }
    console.log(desktop_column)
    update_gui()
}

window.addEventListener('resize', () => {
    desktop.innerHTML = ''
    desktop_column = []
    desktop_width = desktop.offsetWidth
    console.log(desktop_width, desktop_column)
    addColumns(160, 0.85)
})

addColumns(160, 0.85)