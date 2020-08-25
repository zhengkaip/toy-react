
import { createElement, Component, render } from './toyReact'

class MyCom extends Component {
    render () {
        return <div class="component">
            <h1>my component</h1>
            <div class="cao">
                {this.children}
            </div>
        </div>
    }
}

let a = <MyCom id="a" class="c">
    <div class="div">
        <div>aaa</div>
        <div>
            <span>span1</span>
            <span>span2</span>
        </div>
    </div>
</MyCom >

render(a, document.body)