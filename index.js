import pkgJson from './package.json'
import { actionMixin, registerComponent, registerTemplate } from 'maka'
import { Controlled as CodeMirror } from 'react-codemirror2'
import './style.less'
import "codemirror/theme/material.css"
import "codemirror/lib/codemirror.css"
import * as htmlparser from './htmlparser'

const name = pkgJson.name

registerComponent('CodeMirror', CodeMirror)
registerTemplate('html', (props) => {
    const json = htmlparser.HTMLtoJSON(props.html || props.children)
    console.log(json)
    return JSON.parse(json)
})


const state = {
    data: {
        html: `
<div>
    <a href="https://makajs.org" style="color:red;font-size:12px">
        {{data.content}}
    </a>
    <button data-person='{name:"tom",age:10}' onClick='{{$Hello}}'>
        hello
    </button>
</div>
    `,
        json: ''
    }
}

@actionMixin('base')
class action {
    constructor(option) {
        Object.assign(this, option.mixins)
    }

    onChange = (a, b, v) => {
        this.base.setState({
            'data.html': v
        })
    }

    parseJson = (data) => (e) => { 
        var str = htmlparser.HTMLtoJSON(data.html)
        this.base.setState({ 'data.json': str })
    }
}
 
const view = {
    component:'div',
    style:{height:'100%'},
    children:[{ 
        component: 'html',
        html: ` 
<div class='lsg-tool-html2json' >        
    <div class='lsg-tool-html2json-left'>
        <CodeMirror options="{mode:'json',theme:'material',lineNumbers:true}" lineNumbers=true value='{{data.html}}' onBeforeChange='{{$onChange}}'/>
        <div class='lsg-tool-html2json-left-function'> 
            <button type='button' onClick='{{$parseJson(data)}}'>parseJson</button>
        </div>
    </div>
    <div class='lsg-tool-html2json-center'></div>
    <div class='lsg-tool-html2json-right'>
        <CodeMirror options="{mode:'json',theme:'material',lineNumbers:true}" lineNumbers=true value='{{data.json}}'/>
    </div> 
<div>    
`
    }]
}
 
/*
const view = {
    component: 'div',
    className: 'lsg-tool-html2json',
    children: [{
        component: 'div',
        className: 'lsg-tool-html2json-left',
        children: [{
            component: 'CodeMirror',
            options: {
                mode: 'html',
                theme: 'material',
                lineNumbers: true
            },
            value: '{{data.html}}',
            onBeforeChange: '{{$onChange}}'
        }, {
            component: 'div',
            className: 'lsg-tool-html2json-left-function',
            children: [{
                component: 'button',
                type: 'button',
                children: 'parseJson',
                onClick: '{{$parseJson(data)}}'
            }]
        }]
    }, {
        component: 'div',
        className: 'lsg-tool-html2json-center',
    }, {
        component: 'div',
        className: 'lsg-tool-html2json-right',
        children: {
            component: 'CodeMirror',
            options: {
                mode: 'json',theme: 'material',lineNumbers: true
            },
            value: '{{data.json}}'
        }
    }]
}
// */

export {
    name,
    state,
    action,
    view
}