/*
* @Author: lshgdut
* @Date:   2017-11-03 00:17:37
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-03 23:39:18
*/
(function(){
    let data = TASK_DATA

    let numaTaskPool = new TaskPool(data.numa_task_list)
    let mcoreTaskPool = new TaskPool(data.mcore_task_list)

    let numaHost = new Host({
        cores: data.host.cores,
        sockets: data.host.sockets,
        pool: numaTaskPool
    })

    let mcoreHost = new Host({
        cores: data.host.cores,
        sockets: data.host.sockets,
        pool: mcoreTaskPool
    })

})()