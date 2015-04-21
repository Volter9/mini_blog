<?php

/**
 * Blog routes.
 * Here are routes to:
 * 
 * Index page
 * Blog posts
 * Blog categories
 */
function site_module_init () {
    $path = module_path('site');
    
    load_language('app', module_path('site', 'i18n'));
    load_model('users', module_path('site', 'models', true));
    
    route('GET #index /', "{$path}actions/index");
    route('GET #posts /blog/all/:num?', "{$path}actions/blog:list");
    route('GET #post /blog/:any', "{$path}actions/blog:view");
    route('GET #category /categories/:any/:num?', "{$path}actions/categories:view");
}