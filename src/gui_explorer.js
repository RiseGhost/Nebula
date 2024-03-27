import { UserTheme, rgb_add_opacity, create_body, desktop, GUI_Window, createNode, tittle_bar_height } from './gui_window'
import Notify from './gui_notify'
import { aes_cipher, aes_decipher } from './aes'

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

function decipher_Storage(Storage) {
    const private_key = document.cookie.split("=")[1]
    return JSON.parse(aes_decipher(Storage, private_key))
}

function cipher_data(data){
    const private_key = document.cookie.split("=")[1]
    return aes_cipher(data,private_key)
}

function ShowContextMenuFile(e, node) {
    const menu = document.getElementById("contex-menu-file")
    menu.style.color = "#" + UserTheme.text_color
    menu.style.backgroundColor = "rgb" + UserTheme.primary_color
    menu.childNodes.forEach(child => {
        addHoverEffect(child, "rgb" + UserTheme.second_color, "rgb" + UserTheme.primary_color)
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
                    const nofity = new Notify(180, 55, undefined, 10, "#50ba5d", "./imgs/check.png", res.msg)
                    setTimeout(() => nofity.close(), 3000)
                })
            }
        }
    })
    input.addEventListener('focusout', (e) => { father.replaceChild(label, input) })
}

class Explorer extends GUI_Window {
    constructor(width, height, z_index, name) {
        super(width, height, z_index, name,"./imgs/explorer.png")
        this.path_bar_heigth = 20
        this.path_bar = this.create_path_bar()
        this.files_body = this.create_files_body()
        this.explorer_body = this.create_explorer_body()
        this.update_window(this.explorer_body)
        this.update_path("/")
        this.show()
    }

    create_path_bar() {
        const path_bar = createNode("div", "path_bar")
        const btn_back = document.createElement("button")
        const label = document.createElement("label")
        btn_back.innerHTML = "←"
        btn_back.style.backgroundColor = "rgb" + UserTheme.second_color
        label.id = "path_label"
        label.innerHTML = this.path
        label.style.color = UserTheme.text_color
        label.style.backgroundColor = "rgb" + UserTheme.second_color
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
        const explorer_body = createNode("div", "explorer_body")
        explorer_body.style.height = (parseInt(this.height) - parseInt(tittle_bar_height)) + "px"
        explorer_body.appendChild(this.path_bar)
        explorer_body.appendChild(this.files_body)
        return explorer_body
    }

    create_files_body() {
        const files = createNode("div", "explorer_files")
        files.style.height = (this.height - (parseInt(tittle_bar_height) + this.path_bar_heigth) - 10) + "px"
        return files
    }

    update_path(path) {
        this.path = path
        const json_path = JSON.stringify({ path: cipher_data(this.path) })
        fetch('/dir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json_path
        }).then(response => response.json()).then(StorageCipher => {
            this.files_body.innerHTML = ""
            Object.entries(decipher_Storage(StorageCipher)).forEach(element => {
                const storage_element = createNode("div", "storage_element")
                const Label_name = document.createElement("label")
                Label_name.value = this.path
                Label_name.className = "Label_name_explorer"
                Label_name.innerHTML = element[1].name
                Label_name.style.text_color = UserTheme.text_color
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
                addHoverEffect(storage_element, "rgb" + UserTheme.second_color, "rgba(0,0,0,0)")
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

export default Explorer