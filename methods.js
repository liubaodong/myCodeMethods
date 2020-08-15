// 格式化json 加颜色
class FormatJson {
    constructor() {
        this.KEY = 'red';
        this.VALUE = 'green';
        this.NULL = 'magenta';
        this.NUMBER = 'linght-green';
        this.STRING = 'orange';
        this.UNDEFINED = 'purple';
        this.BOOLEAN = 'blue'
    }
    isString = v => Object.prototype.toString.call(v) === '[object String]'
    isObject = v => Object.prototype.toString.call(v) === '[object Object]'
    // 改变json颜色
    changeColor(options) {
        Object.keys(options).forEach(key => {
            this[key] = key
        })
    }
    // 格式化 json
    toJson(data, indent = 2) {
        const { KEY, VALUE, NULL, NUMBER, STRING, UNDEFINED } = this
        let _data = data
        if (!this.isString(_data) && !this.isObject(_data)) throw new Error(`类型不对：${Object.prototype.toString.call(data)}`)
        if (this.isString(_data)) {
            try {
                _data = JSON.parse(_data)
            } catch (err) {
                return data
            }
        }
        if (this.isObject(_data)) {
            _data = { ..._data }
            const d = JSON.stringify(_data, null, indent)
            console.log('_data', d)
            return d.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null|undefined)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                item => {
                    let color = NUMBER;
                    if (/^"/.test(item)) {
                        if (/:$/.test(item)) {
                            color = KEY;
                        } else {
                            color = STRING;
                        }
                    } else if (/true|false/.test(item)) {
                        color = BOOLEAN;
                    } else if (/null/.test(item)) {
                        color = NULL;
                    } else if (/undefined/.test(item)) {
                        color = UNDEFINED
                    }
                    return '<span style="color:' + color + ';">' + item + "</span>";
                }
            );

        }
    }




}
let formatJson = new FormatJson()
export { formatJson }

// 例子
// formatJson.toJson({ a: '' })
// formatJson.changeColor(KEY = 'red')
