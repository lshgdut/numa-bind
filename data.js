/*
* @Author: lshgdut
* @Date:   2017-10-31 23:56:53
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-11-01 00:01:08
*/
var TASK_DATA = {
	host : {
		cores: 1,	// 每插槽核数
		sockets: 4  // cpu核数
	},

	numa_task_list: [
        {id: '1', name: 'mcf',      recv_time: '09:00:00', start_time: '09:00:00', end_time: '09:04:26', core: "1", socket: "1"},
        {id: '2', name: 'milc',     recv_time: '09:00:00', start_time: '09:00:20', end_time: '09:07:48', core: "3", socket: "1"},
        {id: '3', name: 'leslie3d', recv_time: '09:00:00', start_time: '09:00:40', end_time: '09:06:11', core: "2", socket: "1"},
        {id: '4', name: 'namd',     recv_time: '09:00:00', start_time: '09:01:00', end_time: '09:08:37', core: "4", socket: "1"},
        {id: '5', name: 'bzip2',    recv_time: '09:00:00', start_time: '09:04:26', end_time: '09:14:48', core: "1", socket: "1"},
        {id: '6', name: 'gobmk',    recv_time: '09:00:00', start_time: '09:06:11', end_time: '09:15:51', core: "2", socket: "1"},
    ],

    mcore_task_list: [
        {id: '1', name: 'mcf',      recv_time: '09:00:00', start_time: '09:00:00', end_time: '09:04:46', core: "1", socket: "1"},
        {id: '2', name: 'milc',     recv_time: '09:00:00', start_time: '09:00:20', end_time: '09:08:28', core: "2", socket: "1"},
        {id: '3', name: 'leslie3d', recv_time: '09:00:00', start_time: '09:00:40', end_time: '09:06:07', core: "3", socket: "1"},
        {id: '4', name: 'namd',     recv_time: '09:00:00', start_time: '09:01:00', end_time: '09:08:37', core: "4", socket: "1"},
        {id: '5', name: 'bzip2',    recv_time: '09:00:00', start_time: '09:04:46', end_time: '09:15:06', core: "1", socket: "1"},
        {id: '6', name: 'gobmk',    recv_time: '09:00:00', start_time: '09:06:07', end_time: '09:15:56', core: "3", socket: "1"},
    ]
}
