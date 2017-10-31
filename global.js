/*
* @Author: lshgdut
* @Date:   2017-10-30 23:51:41
* @Last Modified by:   lshgdut
* @Last Modified time: 2017-10-31 23:54:00
*/
var GLOBALS = {}

GLOBALS['SPEED_UP'] = 60
GLOBALS['SOCKET_CNT'] = 4
GLOBALS['CORE_PER_SOCKET'] = 1
GLOBALS['SIZE_PER_SOCKET'] = 100
GLOBALS['GRID_LINE_WIDTH'] = 1
GLOBALS['GRID_LINE_COLOR'] = '#999'
GLOBALS['GRID_MAP'] = {
    "1" : 1,
    "2" : 2,
    "4" : 2,
    "8" : 4,
    "16" : 4,
    "32" : 8
}

GLOBALS['COLORS'] = [
	'#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', 
	'#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']

GLOBALS['BASE_TIME'] = Date.now()
