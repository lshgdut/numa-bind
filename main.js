/*
* @Author: lshgdut
* @Date:   2017-11-03 00:17:37
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-03 00:23:03
*/
(function(){
    const SPEED_UP = GLOBALS.SPEED_UP
    let data = TASK_DATA

    let tasks_base_time = Number.MAX_VALUE
    numa_task_list.forEach((x)=>{
        x.recv_time = _convert_time(x.recv_time)
        x.start_time = _convert_time(x.start_time)
        x.end_time = _convert_time(x.end_time)

        tasks_base_time = Math.min(tasks_base_time, x.recv_time)
    })
    GLOBALS['TASK_BASE_TIME'] = tasks_base_time
    
    let parseTaskList = (x)=>{
        x.recv_time = Math.ceil((x.recv_time - tasks_base_time) / SPEED_UP)
        x.start_time = Math.ceil((x.start_time - tasks_base_time) / SPEED_UP)
        x.end_time = Math.ceil((x.end_time - tasks_base_time) / SPEED_UP)
    }
    data.numa_task_list.forEach(parseTaskList)
    data.mcore_task_list.forEach(parseTaskList)



})()