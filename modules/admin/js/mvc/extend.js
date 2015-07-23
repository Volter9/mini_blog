/**
 * Helper function to make it easily extend other prototypes
 * 
 * @param {Function} proto
 * @return {Function}
 */
var extend = function (proto) {
    /**
     * Closure
     * 
     * @param {Object} options
     * @return {Function}
     */
    return function (options) {
        var F = function () {
            proto.apply(this, mini_blog.toArray(arguments));
        };
        
        F.prototype = Object.create(proto.prototype);
        
        mini_blog.each(options, function (value, key) {
            F.prototype[key] = value;
        });
    
        return F;
    };
};

module.exports = extend;