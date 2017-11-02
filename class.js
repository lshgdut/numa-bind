/*
* @Author: lshgdut
* @Date:   2017-10-31 23:46:35
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-03 00:16:09
*/

class Task{
    constructor(ctx, cfg, baseTime){
        cfg = cfg || {}
        this.core = cfg.core * 1
        this.socket = cfg.socket * 1
        this.id = cfg.id
        this.name = cfg.name
        this.color = this.get_color()
        this.recv_time = cfg.recv_time
        this.start_time = cfg.start_time
        this.end_time = cfg.end_time

        this.colIndex = Math.floor((this.socket - 1) / rows)
        this.rowIndex = (this.socket - 1) % cols
        console.log('%s, %s, %s, %s', this.name, this.colIndex, this.rowIndex, this.socket)
        this.ctx = ctx
    }

    getXY() {
        let colIndex = this.colIndex
        let x = (colIndex + 1) * GRID_LINE_WIDTH + colIndex * this.getSize()

        let rowIndex = this.rowIndex
        let y = (rowIndex + 1) * GRID_LINE_WIDTH + rowIndex * this.getSize()

        return [x, y]
    }

    getSize() {
        return GLOBALS.SIZE_PER_SOCKET
    }

    get_color(){
        return GLOBALS.COLORS[ (this.id - 1) % GLOBALS.COLORS.length]
    }

    isExpired() {
        let now = Date.now() - GLOBALS.BASE_TIME
        let isExpired = this.end_time < now
        return isExpired
    }

    isRunning() {
        let now = Date.now() - GLOBALS.BASE_TIME
        let isRunning = this.end_time >= now && now >= this.start_time
        return isRunning
    }

    draw(){
        if (!this.isRunning()) {
            return false
        }

        this.ctx.save()
        this.ctx.fillStyle = this.color

        let xy = this.getXY()
        let size = this.getSize()
        this.ctx.fillRect(xy[0], xy[1], size, size)

        this.ctx.restore()

        // console.log('draw %s at %s', this.name, xy.join(','))
        return true
    }

}

class TaskPool() {
	constructor() {
		this.pool = []
	}

	addTask(task) {

	}

	delTask(task) {

	}

	run() {

	}

}

class Host() {
	constructor(cfg) {
		// cpu 插槽数
		this.sockets = cfg.sockets
		// cpu 核数
		this.cores = cfg.cores

		this.canvas = null
		this.ctx = null
	},

	getContext() {
		return this.ctx
	}

	render(node) {

	}

	repaint() {

	}
}