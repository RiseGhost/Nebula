const desktop = document.getElementById("desktop")
var desktop_width = desktop.offsetWidth
var desktop_column = []
const tittle_bar_height = "20px"
const opacity = 0.6

const UserTheme = {
  primary_color: "(255,255,255)",
  second_color: "(125,190,150)",
  env_color: "",
  text_color: "000000",
}

function rgb_add_opacity(rgb, opacity) {
  const color = rgb.replace(')', '')
  return color + "," + opacity + ")"
}

function create_body(height){
  const body = document.createElement("div")
  body.id = "window_body"
  body.style.width = "100%"
  body.style.height = (height - parseInt(tittle_bar_height)) + "px"
  return body
}

class GUI_Window {
  constructor(width, height, z_index, name) {
    (!name) ? this.name = "Window" : this.name = name
    this.width = width
    this.height = height
    this.z_index = z_index
    this.body = create_body(height)
    this.window = this.create()
  }
  create_tittle_bar() {
    const tittle = document.createElement("div")
    const label_name = document.createElement("label")
    label_name.innerHTML = this.name
    const trafic_ligth = document.createElement("div")
    trafic_ligth.id = "trafic_ligth"
    const btn_close = document.createElement("div")
    btn_close.id = "btn_close"
    btn_close.addEventListener('click', (e) => desktop.removeChild(this.window))
    const btn_minimize = document.createElement("div")
    btn_minimize.id = "btn_minimize"
    trafic_ligth.appendChild(btn_close)
    trafic_ligth.appendChild(btn_minimize)
    tittle.appendChild(trafic_ligth)
    tittle.appendChild(label_name)
    tittle.style.width = this.width + "px"
    tittle.style.height = tittle_bar_height
    tittle.style.backgroundColor = "rgb" + UserTheme.primary_color
    tittle.id = "tittle_bar"
    return tittle
  }
  create() {
    const gui_window = document.createElement("div")
    gui_window.style.width = this.width + "px"
    gui_window.style.height = this.height + "px"
    gui_window.style.backgroundColor = "rgba" + rgb_add_opacity(UserTheme.primary_color, opacity)
    gui_window.appendChild(this.create_tittle_bar())
    gui_window.id = "gui_window"
    gui_window.appendChild(this.body)
    dragElement(gui_window)
    return gui_window
  }
  addBody(div){
    this.body.appendChild(div)
  }
  show() {
    desktop.appendChild(this.window)
  }
  reload_window(new_window) {
    desktop.replaceChild(new_window,this.window)
    this.window = new_window
  }
  update_window(body){
    this.window.replaceChild(body,this.body)
    this.body = body
  }
}

class Explorer extends GUI_Window {
  constructor(width, height, z_index, name) {
    super(width, height, z_index, name)
    this.path_bar_heigth = 20
    this.path_bar = this.create_path_bar()
    this.files_body = this.create_files_body()
    this.explorer_body = this.create_explorer_body()
    this.update_window(this.explorer_body)
    this.update_path("/")
    this.show()
  }

  create_path_bar(){
    const path_bar = document.createElement("div")
    const btn_back = document.createElement("button")
    const label = document.createElement("label")
    label.id = "path_label"
    label.innerHTML = this.path
    label.style.color = UserTheme.text_color
    label.style.backgroundColor = "rgb" + UserTheme.second_color
    this.label_path = label
    path_bar.appendChild(btn_back)
    path_bar.appendChild(label)
    path_bar.style.height = this.path_bar_heigth + "px"
    path_bar.id = "path_bar"
    return path_bar
  }

  update_path_bar(){
    this.label_path.innerHTML = this.path
  }

  create_explorer_body(){
    const explorer_body = document.createElement("div")
    explorer_body.id = "explorer_body"
    explorer_body.style.height = (parseInt(this.height) - parseInt(tittle_bar_height)) + "px"
    explorer_body.appendChild(this.path_bar)
    explorer_body.appendChild(this.files_body)
    return explorer_body
  }

  create_files_body(){
    const files = document.createElement("div")
    files.id = "explorer_files"
    files.style.height = (this.height - (parseInt(tittle_bar_height) + this.path_bar_heigth) - 10) + "px"
    return files
  }

  update_path(path) {
    this.path = path
    const json_path = JSON.stringify({path: this.path})
    fetch('/dir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json_path
    }).then(response => response.json()).then(Storage => {
      this.files_body.innerHTML = ""
      Object.entries(Storage).forEach(element => {
        const storage_element = document.createElement("div")
        storage_element.id = "storage_element"
        const Label_name = document.createElement("label")
        Label_name.innerHTML = element[1].name
        Label_name.style.text_color = UserTheme.text_color
        const icons = document.createElement("img")
        if (element[1].type == "dir") {
          icons.src = "./imgs/dir.png"
          icons.id = "dir"
          storage_element.addEventListener('click', (e) => { this.update_path(this.path + storage_element.name + "/") })
        }
        else {
          icons.src = "./imgs/file.png"
          icons.id = "file"
        }
        storage_element.addEventListener('mouseover', (e) => storage_element.style.backgroundColor = "rgb" + UserTheme.second_color)
        storage_element.addEventListener('mouseout', (e) => storage_element.style.backgroundColor = "rgba(0,0,0,0)")
        storage_element.name = element[1].name
        storage_element.appendChild(icons)
        storage_element.appendChild(Label_name)
        this.files_body.appendChild(storage_element)
      })
      this.update_path_bar()
    })
  }

  update_explorer_body(body){
    this.explorer_body.replaceChild(body,this.files_body)
    this.files_body = body
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
gui.show()
const ss = new GUI_Window(350, 300, 80)
ss.show()

new Explorer(400, 300, 90, "Explorer")


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