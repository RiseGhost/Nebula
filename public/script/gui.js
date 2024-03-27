/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 41:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gui_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _gui_window__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gui_window__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gui_notify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);




function addHoverEffect(Node, HoverColor, DefaultColor) {
    Node.addEventListener('mouseover', (e) => Node.style.backgroundColor = HoverColor)
    Node.addEventListener('mouseout', (e) => Node.style.backgroundColor = DefaultColor)
}

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById("contex-menu-file")
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) menu.style.display = "none"
    })
    document.addEventListener('keydown', (e) => {
        if (!menu.contains(e.target)) menu.style.display = "none"
    })
})


function ShowContextMenuFile(e, node) {
    const menu = document.getElementById("contex-menu-file")
    menu.style.color = "#" + _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.text_color
    menu.style.backgroundColor = "rgb" + _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.primary_color
    menu.childNodes.forEach(child => {
        addHoverEffect(child, "rgb" + _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.second_color, "rgb" + _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.primary_color)
    })
    const opc_rename = document.getElementById("OPC_Rename")
    menu.style.display = "block"
    menu.style.left = e.pageX + "px"
    menu.style.top = e.pageY + "px"
    menu.style.zIndex = "400"
    opc_rename.addEventListener('click', (event_rename) => {
        enableEdit(node)
    })
}

function enableEdit(label) {
    const father = label.parentNode
    if (!father) return
    const FileName = label.innerHTML
    const path = label.value + label.innerHTML
    const input = document.createElement("input")
    input.type = "text"
    input.value = FileName
    input.style.width = label.offsetWidth + "px"
    father.replaceChild(input, label)
    input.focus()
    input.addEventListener('keydown', (e) => {
        const new_name = input.value
        if (e.key == "Enter") {
            label.innerHTML = input.value
            father.replaceChild(label, input)
            father.name = new_name
            if (FileName != new_name) {
                const json_path = JSON.stringify({ path: path, name: path.replace(FileName, new_name) })
                fetch('/renamefile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json_path
                }).then(response => response.json()).then(res => {
                    const nofity = new _gui_notify__WEBPACK_IMPORTED_MODULE_1__["default"](180, 55, undefined, 10, "#50ba5d", "./imgs/check.png", res.msg)
                    setTimeout(() => nofity.close(), 3000)
                })
            }
        }
    })
    input.addEventListener('focusout', (e) => { father.replaceChild(label, input) })
}

class Explorer extends _gui_window__WEBPACK_IMPORTED_MODULE_0__.GUI_Window {
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

    create_path_bar() {
        const path_bar = (0,_gui_window__WEBPACK_IMPORTED_MODULE_0__.createNode)("div", "path_bar")
        const btn_back = document.createElement("button")
        const label = document.createElement("label")
        btn_back.innerHTML = "←"
        btn_back.style.backgroundColor = "rgb" + _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.second_color
        label.id = "path_label"
        label.innerHTML = this.path
        label.style.color = _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.text_color
        label.style.backgroundColor = "rgb" + _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.second_color
        this.label_path = label
        btn_back.addEventListener('click', (e) => {
            const current_path = this.path.split('/')
            var new_path = ""
            for (var index = 0; index < current_path.length - 2; index++) {
                new_path += current_path[index] + "/"
            }
            (new_path == "") ? this.update_path("/") : this.update_path(new_path)
        })
        path_bar.appendChild(btn_back)
        path_bar.appendChild(label)
        path_bar.style.height = this.path_bar_heigth + "px"
        return path_bar
    }

    update_path_bar() {
        this.label_path.innerHTML = this.path
    }

    create_explorer_body() {
        const explorer_body = (0,_gui_window__WEBPACK_IMPORTED_MODULE_0__.createNode)("div", "explorer_body")
        explorer_body.style.height = (parseInt(this.height) - parseInt(_gui_window__WEBPACK_IMPORTED_MODULE_0__.tittle_bar_height)) + "px"
        explorer_body.appendChild(this.path_bar)
        explorer_body.appendChild(this.files_body)
        return explorer_body
    }

    create_files_body() {
        const files = (0,_gui_window__WEBPACK_IMPORTED_MODULE_0__.createNode)("div", "explorer_files")
        files.style.height = (this.height - (parseInt(_gui_window__WEBPACK_IMPORTED_MODULE_0__.tittle_bar_height) + this.path_bar_heigth) - 10) + "px"
        return files
    }

    update_path(path) {
        this.path = path
        const json_path = JSON.stringify({ path: this.path })
        fetch('/dir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json_path
        }).then(response => response.json()).then(Storage => {
            this.files_body.innerHTML = ""
            Object.entries(Storage).forEach(element => {
                const storage_element = (0,_gui_window__WEBPACK_IMPORTED_MODULE_0__.createNode)("div", "storage_element")
                const Label_name = document.createElement("label")
                Label_name.value = this.path
                Label_name.className = "Label_name_explorer"
                Label_name.innerHTML = element[1].name
                Label_name.style.text_color = _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.text_color
                Label_name.addEventListener('contextmenu', (e) => {
                    e.preventDefault()
                    ShowContextMenuFile(e, e.target)
                })
                const icons = document.createElement("img")
                if (element[1].type == "dir") {
                    icons.src = "./imgs/dir.png"
                    storage_element.addEventListener('click', (e) => { this.update_path(this.path + storage_element.name + "/") })
                }
                else {
                    icons.src = "./imgs/file.png"
                }
                addHoverEffect(storage_element, "rgb" + _gui_window__WEBPACK_IMPORTED_MODULE_0__.UserTheme.second_color, "rgba(0,0,0,0)")
                storage_element.name = element[1].name
                storage_element.appendChild(icons)
                storage_element.appendChild(Label_name)
                this.files_body.appendChild(storage_element)
            })
            this.update_path_bar()
        })
    }

    update_explorer_body(body) {
        this.explorer_body.replaceChild(body, this.files_body)
        this.files_body = body
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Explorer);

/***/ }),

/***/ 42:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gui_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _gui_window__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gui_window__WEBPACK_IMPORTED_MODULE_0__);

const desktop = document.getElementById("desktop")

class Notify{
    constructor(width,height,X,Y,backgroundcolor,icon_url,msg){
        this.width = width
        this.height = height
        this.x = X
        this.y = Y
        this.backgroundcolor = backgroundcolor
        this.icon_url = icon_url
        this.msg = msg
        this.window = this.create()
        this.show()
    }

    create(){
        const notify_window = (0,_gui_window__WEBPACK_IMPORTED_MODULE_0__.createNode)("div","notify_window")
        const close_bar = (0,_gui_window__WEBPACK_IMPORTED_MODULE_0__.createNode)("div","close_bar")
        const btn_close = document.createElement("img")
        btn_close.src = "./imgs/close.png"
        btn_close.addEventListener('click',(e) => {this.close()})
        const notify_body = (0,_gui_window__WEBPACK_IMPORTED_MODULE_0__.createNode)("div","notify_body")
        const notify_icon = document.createElement("img")
        if (this.icon_url) notify_icon.src = this.icon_url
        const notify_label = document.createElement("Label")
        notify_label.style.color = "#000"
        notify_label.innerHTML = this.msg
        close_bar.appendChild(btn_close)
        notify_body.appendChild(notify_icon)
        notify_body.appendChild(notify_label)
        notify_window.appendChild(close_bar)
        notify_window.appendChild(notify_body)
        if (this.x != undefined) notify_window.style.left = this.x + "px"
        if (this.y != undefined) notify_window.style.top = this.y + "px"
        notify_window.style.width = this.width + "px"
        notify_window.style.height = this.height + "px"
        notify_window.style.backgroundColor = this.backgroundcolor
        return notify_window
    }

    show(){
        desktop.appendChild(this.window)
    }

    close(){
        desktop.removeChild(this.window)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notify);

/***/ }),

/***/ 40:
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gui_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _gui_window__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gui_window__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gui_explorer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);



var desktop_width = _gui_window__WEBPACK_IMPORTED_MODULE_0__.desktop.offsetWidth
var desktop_column = []


function Columns(width, per) { return parseInt((desktop_width * per) / width) }

function update_gui() {
  desktop_column.forEach(element => {
    _gui_window__WEBPACK_IMPORTED_MODULE_0__.desktop.appendChild(element)
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
    _gui_window__WEBPACK_IMPORTED_MODULE_0__.desktop.removeChild(c)
  })
  desktop_column = []
  desktop_width = _gui_window__WEBPACK_IMPORTED_MODULE_0__.desktop.offsetWidth
  console.log(desktop_width, desktop_column)
  addColumns(160, 0.85)
})

const gui = new _gui_window__WEBPACK_IMPORTED_MODULE_0__.GUI_Window(300, 300, 90)
gui.show()
const ss = new _gui_window__WEBPACK_IMPORTED_MODULE_0__.GUI_Window(350, 300, 80)
ss.show()

new _gui_explorer__WEBPACK_IMPORTED_MODULE_1__["default"](400, 300, 90, "Explorer")

console.log(document.cookie.split("="))

addColumns(160, 0.85)
})();

/******/ })()
;