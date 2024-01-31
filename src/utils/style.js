export default function getStyle(style, filter = []) {
    const needUnit = [
        'fontSize',
        'width',
        'height',
        'top',
        'left',
        'minHeight',
        'borderWidth',
        'letterSpacing',
        'borderRadius',
        "marginLeft",
        "marginBottom",
        "borderWidth",
        "marginTop",
        "marginRight",
    ]

    const result = {}
    Object.keys(style).forEach(key => {
        if (!filter.includes(key)) {
            if (key != 'rotate') {
                result[key] = style[key]
                if (needUnit.includes(key)) {
                 result[key] += 'px'
                    // if(result[key]&&!String(result[key]).includes('%')){
                    // }
                }
            } else {
                result.transform = key + '(' + style[key] + 'deg)'
            }
        }
    })

    return result
}