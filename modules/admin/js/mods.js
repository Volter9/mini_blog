(function () {
    /**
     * Mods
     * 
     * Save and edit mods
     */
    var EditMod = function (editor) {
        this.name = 'edit';
        
        mini_blog.mod.call(this, editor);
    };
    
    EditMod.prototype = Object.create(mini_blog.mod.prototype);
    
    /**
     * Initiate edit mod
     */
    EditMod.prototype.init = function () {
        var self = this;
        
        this.addAction('edit', '<i class="fa fa-pencil fa-fw"></i>', function (node) {
            self.editor.active = true;
            self.editor.disableMods();
            self.editor.enableMods(['save'].concat(node.component.mods || []));
            
            node.component.enable();
        });
    };
    
    var RemoveMod = function (editor) {
        this.name = 'remove';
        
        mini_blog.mod.call(this, editor);
    };
    
    RemoveMod.prototype = Object.create(mini_blog.mod.prototype);
    
    /**
     * Initiate edit mod
     */
    RemoveMod.prototype.init = function () {
        var self = this;
        
        this.addAction('remove', '<i class="fa fa-minus fa-fw"></i>', function (node) {
            node.component.remove();
            
            self.editor.clearCurrent();
        });
    };
    
    /**
     * SaveMod
     * 
     * Sends signal to component to send the data to the server
     * Also has a cancel action to cancel 
     * 
     * @param {mini_blog.editor} editor
     */
    var SaveMod = function (editor) {
        this.name = 'save';
        
        mini_blog.mod.call(this, editor);
    };
    
    SaveMod.prototype = Object.create(mini_blog.mod.prototype);
    
    /**
     * Initiate actions:
     * 
     * - Save action
     * - Cancel action
     */
    SaveMod.prototype.init = function () {
        var self = this;
        
        var callback = function (node) {
            self.editor.active = false;
            self.editor.disableMods();
            self.editor.enableMods(['edit']);
            
            node.component.disable();
        };
        
        this.addAction('save', '<i class="fa fa-save fa-fw"></i>', function (node) {
            node.component.save();
            
            callback(node);
        });
        
        this.addAction('cancel', '<i class="fa fa-times fa-fw"></i>', function (node) {
            node.component.cancel();
            
            callback(node);
            
            if (self.html) {
                node.innerHTML = self.html;
                node.component.setNodes(node);
            }
        });
    };
    
    /**
     * Enable save mod and cache the HTML
     */
    SaveMod.prototype.enable = function () {
        mini_blog.mod.prototype.enable.call(this);
        
        this.html = this.editor.current.innerHTML;
    };
    
    /**
     * WYSIWIG buttons mod
     * 
     * @param {mini_blog.editor} editor
     */
    var WysiwigMod = function (editor) {
        mini_blog.mod.call(this, editor);
    };
    
    WysiwigMod.prototype = Object.create(mini_blog.mod.prototype);
    
    /**
     * Initiate WYSIWIG actions:
     * 
     * - Bold
     * - Italic
     * - Blockquote
     * - Header
     * - Clear formating (paragraph)
     * - Code
     */
    WysiwigMod.prototype.init = function () {
        var self = this;
        
        this.name = 'wysiwig';
        
        this.addAction('bold', '<i class="fa fa-bold fa-fw"></i>', function () {
            document.execCommand('bold');
        });
        
        this.addAction('italic', '<i class="fa fa-italic fa-fw"></i>', function () {
            document.execCommand('italic');
        });
        
        this.addAction('quote', '<i class="fa fa-quote-right fa-fw"></i>', function () {
            document.execCommand('formatBlock', null, 'blockquote');
        });
        
        this.addAction('header', '<i class="fa fa-header fa-fw"></i>', function () {
            document.execCommand('formatBlock', null, 'h1');
        });
        
        this.addAction('paragraph', '<i class="fa fa-paragraph fa-fw"></i>', function () {
            document.execCommand('formatBlock', null, 'p');
            
            var selection = document.getSelection(),
                p = selection.anchorNode.parentNode;
            
            if (p.nodeName !== 'P') {
                p = p.parentNode;
            }
            
            p.innerHTML = p.innerText || p.textContent;
        });
        
        this.addAction('code', '<i class="fa fa-code fa-fw"></i>', function () {
            document.execCommand('formatBlock', null, 'pre');
        });
        
        this.addAction('terminal', '<i class="fa fa-terminal fa-fw"></i>', function () {
            document.execCommand('insertHTML', null, '<code>' + document.getSelection() + '</code>');
        });
    };
    
    /**
     * Register all mods and enable edit mod **only**
     */
    mini_blog.editor.addMod('edit', new EditMod(mini_blog.editor));
    mini_blog.editor.addMod('save', new SaveMod(mini_blog.editor));
    mini_blog.editor.addMod('wysiwig', new WysiwigMod(mini_blog.editor));
    mini_blog.editor.addMod('remove', new RemoveMod(mini_blog.editor));
    
    mini_blog.editor.disableMods();
    mini_blog.editor.enableMods(['edit']);
})();