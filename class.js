/*
* @Author: lshgdut
* @Date:   2017-10-31 23:46:35
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-05 23:23:50
*/

class Task{
    constructor(cfg){
        cfg = cfg || {}
        this.core = cfg.core * 1
        this.id = cfg.id
        this.name = cfg.name
        this.color = this.get_color()
        this.recv_time = cfg.recv_time
        this.start_time = cfg.start_time
        this.end_time = cfg.end_time

        this.colIndex = cfg.colIndex
        this.rowIndex = cfg.rowIndex
        console.log('%s, %s, %s, %s', this.name, this.colIndex, this.rowIndex, this.core)
    }

    getXY() {
        let colIndex = this.colIndex
        let x = (colIndex + 1) * GLOBALS.GRID_LINE_WIDTH + colIndex * this.getSize()

        let rowIndex = this.rowIndex
        let y = (rowIndex + 1) * GLOBALS.GRID_LINE_WIDTH + rowIndex * this.getSize()

        return [x, y]
    }

    getSize() {
        return GLOBALS.CORE_SIZE
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

    draw(ctx){
        if (!this.isRunning()) {
            return false
        }

        ctx.save()
        ctx.fillStyle = this.color

        let xy = this.getXY()
        let size = this.getSize()
        ctx.fillRect(xy[0], xy[1], size, size)

        ctx.restore()

        // console.log('draw %s at %s', this.name, xy.join(','))
        return true
    }

}


class Host{
    constructor(el, cfg) {
        this.id = cfg.id
        // cpu 核数
        this.cores = cfg.cores

        this.render(el)
    }

    render(el) {
        let canvas = document.createElement('canvas')
        let cols = GLOBALS.GRID_MAP[this.cores]
        let rows = Math.ceil(this.cores / cols)
        let size = cols * GLOBALS.CORE_SIZE + (cols+1) * GLOBALS.GRID_LINE_WIDTH
        canvas.width = canvas.height = size

        el.appendChild(canvas)
        let ctx = canvas.getContext('2d')

        this.cols = cols
        this.rows = rows
        this.canvas = canvas
        this.ctx = ctx
    }

    drawGridLine() {
        let canvas = this.canvas
        let ctx = this.ctx

        ctx.save()
        ctx.strokeStyle = GLOBALS.GRID_LINE_COLOR
        
        // draw ver lines
        utils.each_ctx_cols((i) => {
            ctx.moveTo(i, 0)
            ctx.lineTo(i, canvas.height)
            ctx.stroke()
        }, ctx)

        // draw hoz lines
        utils.each_ctx_rows((i) => {
            ctx.moveTo(0, i)
            ctx.lineTo(canvas.height, i)
            ctx.stroke()
        }, ctx)

        ctx.restore()
    }

    repaint(taskPool) {
        let canvas = this.canvas
        let ctx = this.ctx

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawGridLine()
    }
}

class TaskPool{
    constructor(el, tasklist, host) {
        this.pool = []

        let baseTime = Number.MAX_VALUE
        tasklist.forEach((x)=>{
            x.recv_time = utils.convert_time(x.recv_time)
            x.start_time = utils.convert_time(x.start_time)
            x.end_time = utils.convert_time(x.end_time)

            baseTime = Math.min(baseTime, x.recv_time)
        })
        this.baseTime = baseTime

        this.host = new Host(el, host)
        tasklist.forEach(task=>{
            this.addTask(task)
        })
    }

    addTask(task) {
        this.pool.push(this.parseTask(task))
    }

    delTask(id) {
        this.pool.forEach((task, index) => {
            if (task.id === id) {
                this.pool.splice(index, 1)
                return true
            }
        })
    }

    parseTask (task) {
        // task = Object.assign({}, task)
        task.recv_time = this._parseTime(task.recv_time)
        task.start_time = this._parseTime(task.start_time)
        task.end_time = this._parseTime(task.end_time)

        task.rowIndex = (task.core - 1) % this.host.cols
        task.colIndex = Math.floor((task.core - 1) / this.host.rows)
        return new Task(task)
    }

    _parseTime(time) {
        return Math.ceil((time - this.baseTime) / GLOBALS.SPEED_UP)
    }

    length() {
        return this.pool.length
    }

    run() {
        this.host.repaint()
        let pool = this.pool.filter(task=>{
            task.draw(this.host.ctx)
            return !task.isExpired()
        })
        this.pool = pool

        if (this.length() > 0) {
            requestAnimationFrame(this.run.bind(this))
        }
    }

}


