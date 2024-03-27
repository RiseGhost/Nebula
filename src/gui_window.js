const tittle_bar_height = "20px"
const opacity = 0.6
const desktop = document.getElementById("desktop")

const UserTheme = {
  primary_color: "(255,255,255)",
  second_color: "(125,190,150)",
  env_color: "",
  text_color: "000000",
}

function createNode(NodeType,id){
  const node = document.createElement(NodeType)
  node.id = id
  return node
}

function rgb_add_opacity(rgb, opacity) {
  const color = rgb.replace(')', '')
  return color + "," + opacity + ")"
}

function create_body(height) {
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
    const tittle = createNode("div","tittle_bar")
    const label_name = document.createElement("label")
    label_name.innerHTML = this.name
    const trafic_ligth = createNode("div","trafic_ligth")
    const btn_close = createNode("div","btn_close")
    btn_close.addEventListener('click', (e) => desktop.removeChild(this.window))
    const btn_minimize = createNode("div","btn_minimize")
    trafic_ligth.appendChild(btn_close)
    trafic_ligth.appendChild(btn_minimize)
    tittle.appendChild(trafic_ligth)
    tittle.appendChild(label_name)
    tittle.style.width = this.width + "px"
    tittle.style.height = tittle_bar_height
    tittle.style.backgroundColor = "rgb" + UserTheme.primary_color
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
  addBody(div) {
    this.body.appendChild(div)
  }
  show() {
    desktop.appendChild(this.window)
  }
  reload_window(new_window) {
    desktop.replaceChild(new_window, this.window)
    this.window = new_window
  }
  update_window(body) {
    this.window.replaceChild(body, this.body)
    this.body = body
  }
}

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

module.exports = {UserTheme,rgb_add_opacity,create_body,desktop,GUI_Window,createNode,tittle_bar_height}