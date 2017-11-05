/*
* @Author: lshgdut
* @Date:   2017-11-03 00:17:37
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-05 23:23:00
*/
(function(){
    let data = TASK_DATA
    let canvas = document.getElementById('canvas')

    let numaTaskPool = new TaskPool(canvas, data.numa_task_list, data.host)
    let mcoreTaskPool = new TaskPool(canvas, data.mcore_task_list, data.host)

    numaTaskPool.run()
    mcoreTaskPool.run()
})()