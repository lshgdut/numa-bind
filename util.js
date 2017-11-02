/*
* @Author: lshgdut
* @Date:   2017-10-31 23:45:56
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-03 00:17:18
*/
var utils = {}

utils.each_ctx_rows = (fn, ctx) => {
	let height = ctx.height
	let span = GLOBALS.SIZE_PER_SOCKET + GLOBALS.GRID_LINE_WIDTH
    for (let i=0; i<height; i += span) {
        fn(i + 0.5)
    }
}

utils.each_ctx_cols = (fn, ctx) => {
	let width = ctx.width
	let span = GLOBALS.SIZE_PER_SOCKET + GLOBALS.GRID_LINE_WIDTH
    for (let i=0; i<width; i+=span) {
        fn(i + 0.5)
    }
}

utils.convert_time = (time) => {
    let times = time.match(/^(\d\d):(\d\d):(\d\d)$/).slice(1,4).map(Number)
    return (times[0] * 3600 + times[1] * 60 + times[2]) * 1000
}

