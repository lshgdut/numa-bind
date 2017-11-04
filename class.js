/*
* @Author: lshgdut
* @Date:   2017-10-31 23:46:35
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-05 00:02:43
*/

class Task{
    constructor(ctx, cfg){
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
        let x = (colIndex + 1) * GLOBALS.GRID_LINE_WIDTH + colIndex * this.getSize()

        let rowIndex = this.rowIndex
        let y = (rowIndex + 1) * GLOBALS.GRID_LINE_WIDTH + rowIndex * this.getSize()

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
    constructor(tasklist, host) {
        this.pool = []

        let baseTime = Number.MAX_VALUE
        tasklist.forEach((x)=>{
            x.recv_time = utils.convert_time(x.recv_time)
            x.start_time = utils.convert_time(x.start_time)
            x.end_time = utils.convert_time(x.end_time)

            baseTime = Math.min(baseTime, x.recv_time)
        })
        this.baseTime = baseTime

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
        task.recv_time = this._parseTime(task.recv_time, this.baseTime)
        task.start_time = this._parseTime(task.start_time, this.baseTime)
        task.end_time = this._parseTime(task.end_time, this.baseTime)
        return task
    }

    _parseTime(time) {
        return Math.ceil((time - baseTime) / GLOBALS.SPEED_UP)
    }

    run() {

    }

}


class Host() {
    constructor(el, cfg) {
        this.id = cfg.id
        // cpu 插槽数
        this.sockets = cfg.sockets
        // cpu 核数
        this.cores = cfg.cores
        // 任务池
        this.taskPool = cfg.pool

        this.render(el)
    },

    render(el) {
        let canvas = document.createElement('canvas')
        let cols = GLOBALS.GRID_MAP[this.sockets]
        let rows = Math.ceil(this.sockets / cols)
        let size = cols * GLOBALS.SIZE_PER_SOCKET + (cols+1) * GLOBALS.GRID_LINE_WIDTH
        canvas.width = canvas.height = size

        el.appendChild(canvas)
        cvs = canvas.getContext('2d')

        this.canvas = canvas
        this.cvs = cvs
    }

    getContext() {
        return this.ctx
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

    drawTasks() {
        task_pool = task_pool.filter(task => {
            task.draw()
            return !task.isExpired()
        })

        return task_pool.length
    }

    repaint() {
        let canvas = this.canvas
        let ctx = this.ctx

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawGridLine()
        this.drawTasks()
    }
}
