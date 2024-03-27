import {UserTheme,rgb_add_opacity,create_body,desktop,GUI_Window,tittle_bar_height} from './gui_window'
import Explorer from './gui_explorer'

var desktop_width = desktop.offsetWidth
var desktop_column = []


function Columns(width, per) { return parseInt((desktop_width * per) / width) }

function update_gui() {
  desktop_column.forEach(element => {
    desktop.appendChild(element)
  })
}

function addColumns(width, per) {
  const column_number = Columns(width, per)
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
  desktop_column.forEach(c => {
    desktop.removeChild(c)
  })
  desktop_column = []
  desktop_width = desktop.offsetWidth
  console.log(desktop_width, desktop_column)
  addColumns(160, 0.85)
})

const gui = new GUI_Window(300, 300, 90)
gui.show()
const ss = new GUI_Window(350, 300, 80)
ss.show()

new Explorer(400, 300, 90, "Explorer")

addColumns(160, 0.85)