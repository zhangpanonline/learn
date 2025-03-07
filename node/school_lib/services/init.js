const validate = require('validate.js');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

validate.extend(validate.validators.datetime, {
    /**
     * 该函数会自动用于用于日期格式转换
     * 它会在验证时自动触发，它需要将任何数据转换为时间戳返回
     * 如果无法返回，则返回NaN
     */
    parse: function(value, options) {
        let format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
        return dayjs.utc(value, format).valueOf();
    },
    /**
     * 用于显示错误消息时，使用的显示字符串
     */
    format: function(value, options) {
        let format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
        return dayjs.utc(value).format(format);
    }
})