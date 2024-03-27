class Task_icon{
    constructor(width,name,IconURL,HTMLNode,window){
        this.width = width
        this.height = width
        this.name = name
        this.IconURL = IconURL
        this.HTMLNode = HTMLNode
        this.window = window
        this.btn = this.create_task_button()
        this.add_task_bar()
    }
    create_task_button(){
        const btn_container = document.createElement("div")
        btn_container.id = "btn_container"
        btn_container.style.width = this.width + "px"
        btn_container.style.height = this.height + "px"
        const btn_img = document.createElement("img")
        if (this.IconURL) btn_img.src = this.IconURL
        btn_img.style.width = (this.width * 0.9) + "px"
        btn_img.style.height = (this.height * 0.9) + "px"
        const label_name = document.createElement("label")
        label_name.innerHTML = this.name
        label_name.style.fontSize = "10px"
        btn_container.appendChild(btn_img)
        btn_container.appendChild(label_name)
        btn_container.addEventListener('click',(e) => {
            if(this.window.visible) this.window.hidden()
            else                    this.window.unhidden()
        })
        return btn_container
    }
    add_task_bar(){
        this.HTMLNode.appendChild(this.btn)
    }
    remove_task_bar(){
        this.HTMLNode.removeChild(this.btn)
    }
}

export default Task_icon