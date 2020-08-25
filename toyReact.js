

class ElementWrap {
    constructor(type) {
        this.root = document.createElement(type)
    }
    setAttr (key, value) {
        this.root.setAttribute(key, value)
    }
    appendChild (fragment) {
        this.root.appendChild(fragment)
    }
}

class CreateTextNode {
    constructor(type) {
        this.root = document.createTextNode(type)
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
        this._root = null
    }
    setAttr (name, value) {
        this.props[name] = value
    }
    appendChild (component) {
        this.children.push(component)
    }
    get root () {
        if (!this._root) {
            this._root = this.render().root
        }
        return this._root
    }
}


export function createElement (el, attr, ...children) {
    new Error('报错了')
    let elDome
    if (typeof el === 'string') {
        elDome = new ElementWrap(el)
    } else {
        elDome = new el
    }
    if (attr) {
        for (let key in attr) {
            elDome.setAttr(key, attr[key])
        }
    }
    let fragment
    let flatChildren = (children) => {
        for (let child of children) {
            if (child instanceof Array) {
                flatChildren(child)
            } else {
                if (typeof child == 'string') {
                    child = new CreateTextNode(child)
                }
                // elDome.appendChild(child)
                if (elDome instanceof ElementWrap) {
                    fragment = fragment || document.createDocumentFragment()
                    fragment.appendChild(child.root)
                } else {
                    elDome.appendChild(child)
                }
            }
        }
    }
    flatChildren(children)
    fragment && elDome.appendChild(fragment)
    return elDome
}

export function render (child, parentDemo) {
    parentDemo.appendChild(child.root)
}