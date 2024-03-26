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
        const notify_window = createNode("div","notify_window")
        const close_bar = createNode("div","close_bar")
        const btn_close = document.createElement("img")
        btn_close.src = "./imgs/close.png"
        btn_close.addEventListener('click',(e) => {this.close()})
        const notify_body = createNode("div","notify_body")
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
        console.log("notify close")
        desktop.removeChild(this.window)
    }
}