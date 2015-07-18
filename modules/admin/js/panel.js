// @todo refactor all that shit!!! or better
//       port this shit to backbone or maybe 
//       even write my own MV* framework

/**
 * Admin panel
 */
mini_blog.panel = (function () {
    /**
     * @param {Node} node
     */
    function Panel (node) {
        this.node = node;
    }
    
    return new Panel(document.getElementById('mini_panel'));
})();

mini_blog.panel.add = (function () {
    /**
     * @param {Node} node
     */
    var Button = function (node) {
        this.node = node;
        
        mini_blog.mod.call(this, { container: node.querySelector('.dropdown') });
    };
    
    Button.prototype = Object.create(mini_blog.mod.prototype);
    
    /**
     * Initiate buttons
     */
    Button.prototype.init = function () {
        var self   = this,
            editor = this.editor.container;
        
        this.node.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (mini_blog.editor.active) {
                return;
            }
            
            var keys = Object.keys(self.actions);
            
            if (keys.length > 1) {
                editor.classList.toggle('hidden', !editor.classList.contains('hidden'));
            }
            else {
                self.trigger(keys.pop());
            }
        });
        
        this.addAction('posts', '<i class="fa fa-fw fa-newspaper-o"></i> Post', function () {
            var empty = document.querySelector('.posts .empty');
        
            if (empty) {
                empty.parentNode.removeChild(empty);
            }
            
            self.createNode(document.querySelector('.posts'));
        });
    };
    
    /**
     * Create a node from template requested via AJAX
     * 
     * @param {String} item
     * @param {Node} destination
     */
    Button.prototype.createNode = function (destination) {
        var url = ['admin', 'template', 'posts'],
            self = this;
        
        var callback = function (xhr, data) {
            self.addNode(data, destination);
        };
        
        mini_blog.ajax.post(url)
                      .success(callback)
                      .send();
    };
    
    /**
     * Add a node, this function serves as callback
     * 
     * @param {XMLHttpRequest} xhr
     * @param {Object} data
     */
    Button.prototype.addNode = function (data, destination) {
        var fragment = document.createElement('div');
        
        fragment.innerHTML = data.html;
    
        var div = fragment.children[0];
    
        div.removeAttribute('data-id');    
        
        destination.insertBefore(div, destination.children[0]);
        
        mini_blog.createComponent(div);
        mini_blog.editor.setCurrent(div);
        mini_blog.editor.mods.edit.trigger('edit', div);
        
        div.component.data = data.data;
    };
    
    return new Button(document.getElementById('mini_panel').querySelector('.add'));
})();

mini_blog.panel.status = (function () {
    var Bar = function (node) {
        node.style.display = 'none';
        
        this.node = node;
        this.icon = node.querySelector('.fa');
        this.label = node.querySelector('.label');
    };
    
    Bar.prototype.note = function (text) {
        this.node.style.display = 'block';
        
        this.node.className = 'status-bar';
        this.icon.className = 'fa fa-meh-o';
        
        this.label.innerText = this.label.textContent = text;
    };
    
    Bar.prototype.error = function (text) {
        this.node.style.display = 'block';
        
        this.node.className = 'status-bar failure';
        this.icon.className = 'fa fa-exclamation-circle';
        
        this.label.innerText = this.label.textContent = text;
    };
    
    Bar.prototype.success = function (text) {
        this.node.style.display = 'block';
        
        this.node.className = 'status-bar success';
        this.icon.className = 'fa fa-check-circle';
        
        this.label.innerText = this.label.textContent = text;
    };
    
    return new Bar(document.getElementById('mini_panel').querySelector('.status-bar'));
})();

mini_blog.panel.more = (function () {
    /**
     * More (three bars) button
     * 
     * @param {Node} node
     */
    var Button = function (node) {
        var self = this;
        
        this.node = node.querySelector('.fa');
        this.container = node.querySelector('.dropdown');
        this.buttons = node.querySelector('.buttons');
        this.pages = [];
        
        this.node.addEventListener('click', function (e) {
            e.preventDefault();
            
            self.toggleMenu();
        });
    };
    
    /**
     * The action that toggles the menu
     */
    Button.prototype.toggleMenu = function () {
        this.container.classList.toggle(
            'hidden', !this.container.classList.contains('hidden')
        );
    };
    
    /**
     * Add a page
     * 
     * @param {mini_blog.page} page
     */
    Button.prototype.addPage = function (page) {
        page.setContainer(this.container);
        
        this.pages.push(page);
        this.addButton(page);
    };
    
    /**
     * Add a button
     * 
     * @param {mini_blog.page} page
     */
    Button.prototype.addButton = function (page) {
        var button = document.createElement('button');
        
        button.className = 'button';
        button.innerHTML = page.name;
        button.page = page;
        button.addEventListener('click', function () {
            this.page.activate();
        });
        
        this.buttons.appendChild(button);
    };
    
    return new Button(document.getElementById('mini_panel').querySelector('.more'));
})();

mini_blog.page = (function () {
    /**
     * Page constructor
     * 
     * @param {String} name
     */
    var Page = function (name) {
        this.name = name;
    };
    
    /**
     * Set container and populate it with information
     * 
     * @param {Node} container
     */
    Page.prototype.setContainer = function (container) {
        this.container = document.createElement('div');
        
        container.appendChild(this.container);
    };
    
    Page.prototype.activate = function () {
        this.container.style.display = 'block';
    };
    
    Page.prototype.deactivate = function () {
        this.container.style.display = 'none';
    };
    
    return Page;
})();