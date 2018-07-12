const UNFINISHED = 'UNFINISHED'
const FINISHED = 'FINISHED'
const COLOR_DEFAULT = 'default'
const COLOR_PRIMARY = 'primary'
const COLOR_SUCCESS = 'success'
const COLOR_INFO = 'info'
const COLOR_WARNING = 'warning'
const COLOR_DANGER = 'danger'

module.exports.STATUS_DEFAULT = UNFINISHED
module.exports.UNFINISHED = UNFINISHED
module.exports.FINISHED = FINISHED
module.exports.STATUS = new Set([UNFINISHED, FINISHED])
module.exports.COLORS_DEFAULT = COLOR_DEFAULT
module.exports.COLORS = new Set([COLOR_DEFAULT, COLOR_PRIMARY, COLOR_SUCCESS, COLOR_INFO, COLOR_WARNING, COLOR_DANGER])
