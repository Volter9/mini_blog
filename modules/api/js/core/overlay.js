var dom = require('../helpers/dom');

module.exports = {
    element: null,
    
    /**
     * Show overlay
     */
    show: function () {
        if (!this.element) {
            this.element = dom.node('<div class="m-hidden m-overlay"></div>');
            
            document.body.appendChild(this.element);
        }
        
        this.element.classList.remove('m-hidden');
    },
    
    /**
     * Hide overlay
     */
    hide: function () {
        if (!this.element) {
            return;
        }
        
        this.element.classList.add('m-hidden');
    }
};