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