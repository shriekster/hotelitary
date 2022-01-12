/**
 * 
 * @param {Object} options
 * @returns the current date or date and time, depending on the configured options
 */
const customDate = (options) => {

    let hours, minutes, seconds, milliseconds, timezoneOffset;

    if (options) {

        hours = !!options.hours;
        minutes = !!options.minutes;
        seconds = !!options.seconds;
        milliseconds = !!options.milliseconds;
        timezoneOffset = !!options.timezoneOffset; 

    }

    // Get local time as ISO string with offset at the end
    var now = new Date();
    var tzo = -now.getTimezoneOffset();
    var dif = tzo >= 0 ? '+' : '-';
    var pad = function(n, width) {
        width = width || 2;
 
        n = Math.abs(Math.floor(n)) + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
 
    };

    let date = now.getFullYear() + '-' + pad(now.getMonth()+1) + '-' + pad(now.getDate());

    if (hours)          date += ' ' + pad(now.getHours());

    if (minutes)        date += ':' + pad(now.getMinutes());

    if (seconds)        date += ':' + pad(now.getSeconds());

    if (milliseconds)   date += '.' + pad(now.getMilliseconds(),3);

    if (timezoneOffset) date += dif + pad(tzo / 60) + ':' + pad(tzo % 60);
 
    return date;
 
 }

 module.exports = customDate;