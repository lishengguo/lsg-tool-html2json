
lsg-tool-html2json is an application for registering the html template component and Html to Json tool.

## Usage
Your application can use html template component by add lsg-tool-html2json dependency.

1. Add dependency
```bash
$ maka add lsg-tool-html2json
```

2. Modify the view
```javascript
const view = { 
    component: 'html',
    children: `
        <div>
            <button onClick='{{$SayHello}}'>hello</button>
                world
        </div>
    ` 
}
```

3. Modify the index.html
```html
<script>
    window.main = function (maka) {
        maka.load(['lsg-tool-html2json']).then(()=>{
            maka.render('yourApp','app')
        })
    }
<script>
```

## Download and run

1. Download
2. Decompress
3. Enter decompress directory
4. Run
```bash
$ yarn start
```

## License

MIT
