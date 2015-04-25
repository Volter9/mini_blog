<?php

/**
 * Blog module initialize
 */
function blog_module_init () {
    load_language('app', module_path('blog', 'i18n/site'));
}

/**
 * Initialize admin section module
 */
function blog_module_admin_init () {
    load_language('admin', module_path('blog', 'i18n/admin'));
    
    foreach (array('posts', 'categories') as $module) {
        load_php(module_path('blog', "models/admin/$module"));
        
        menu_add_item(
            $module, 
            lang("admin.$module.title"), 
            url('#admin_view', array($module))
        );

        
        menu_add_subitem(
            $module, 
            lang("admin.$module.add"), 
            url('#admin_add', array($module))
        );
    }
}