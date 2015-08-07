var editor = require('./editor'),
    dom    = require('../helpers/dom');

/**
 * Components
 * 
 * This object is a holder for application components and its children,
 * within mini_blog
 */
var Components = {
    components: {}
};

/**
 * Register component
 * 
 * @param {String} name
 * @param {Function} constructor
 */
Components.register = function (name, constructor) {
    this.components[name] = {
        constructor: constructor
    };
};

/**
 * Create an instance of component
 * 
 * @param {String} name
 * @param {Node} node
 * @return {mini_blog.component}
 */
Components.create = function (name, node) {
    if (!this.components[name]) {
        return false;
    }
    
    return new this.components[name].constructor(node);
};

/**
 * Create a component
 * 
 * @param {Node} node
 */
Components.createComponent = function (node) {
    if (node.component || node.dataset.ignore) {
        return;
    }
    
    var name       = node.dataset.component,
        component  = Components.create(name, node);
    
    if (!component) {
        return console.warn('Component "' + name + '" does not exists!');
    }
    
    var view = new editor.view(null, {
        node:      node,
        component: component
    });
    
    node.component = component;
    node.editor    = view;
    node.appendChild(view.node);
};

module.exports = Components;