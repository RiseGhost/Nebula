const desktop = document.getElementById("desktop")
var desktop_width = desktop.offsetWidth
var desktop_column = []

const UserTheme = {
    primary_color: "ffffff",
    second_color: "000000",
    env_color: "",
    text_color: "ffffff",
}

class GUI_Window {
  constructor(width, height, z_index) {
    this.width = width
    this.height = height
    this.z_index = z_index
    this.window = this.create()
    desktop.appendChild(this.window)
  }
  create_tittle_bar() {
      const tittle = document.createElement("div")
      const trafic_ligth = document.createElement("div")
      trafic_ligth.id = "trafic_ligth"
      const btn_close = document.createElement("div")
      btn_close.id = "btn_close"
      btn_close.addEventListener('click',(e) => desktop.removeChild(this.window))
      const btn_minimize = document.createElement("div")
      btn_minimize.id = "btn_minimize"
      trafic_ligth.appendChild(btn_close)
      trafic_ligth.appendChild(btn_minimize)
      tittle.appendChild(trafic_ligth)
      tittle.style.width = this.width + "px"
      tittle.style.height = "20px"
      tittle.style.backgroundColor = "#" + UserTheme.second_color
      tittle.id = "tittle_bar"
      return tittle
  }
  create() {
      const gui_window = document.createElement("div")
      gui_window.style.width = this.width + "px"
      gui_window.style.height = this.height + "px"
      gui_window.style.backgroundColor = "#" + UserTheme.primary_color
      gui_window.appendChild(this.create_tittle_bar())
      gui_window.id = "gui_window"
      dragElement(gui_window)
      return gui_window
  }
}

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
  desktop_column.forEach(c => {
    desktop.removeChild(c)
  })
  desktop_column = []
  desktop_width = desktop.offsetWidth
  console.log(desktop_width, desktop_column)
  addColumns(160, 0.85)
})

const gui = new GUI_Window(300, 300, 90)
new GUI_Window(350, 300, 80)


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

addColumns(160, 0.85)