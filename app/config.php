<?php

/**
 * App's config
 * 
 * @package mini_blog
 */

return array(
    /**
     * Database configuration
     * 
     * - autoload - automatically connect on boot to database
     */
    'database' => array(
        'autoload' => true,
        'default'  => array(
            'name'     => 'mini_blog',
            'host'     => 'localhost',
            'user'     => 'root',
            'password' => '',
            'charset'  => 'utf8'
        )
    ),
    
    /**
     * Themes configuration
     * 
     * - directory - where themes are living
     * - template - which theme is chosen
     * - layout - name of layout in current theme
     */
    'templates' => array(
        'directory' => base_path('themes'),
        'template'  => 'minimalism',
        'layout'    => 'main'
    ),
    
    /**
     * Routing
     * 
     * - base_url - full http:// link to your website 
     *              (not really used, it used with `url` function)
     * - symbols - readable way to capture parameters in URL's
     */
    'routing' => array(
        'symbols' => array(
            '/:any' => '/?([\d\w\-_]+)',
            '/:num' => '/?(\d+)'
        )
    ),
    
    /**
     * Hooks - they're are loaded before routing and after autoload 
     *         (autoload.files)
     */
    'hooks' => array(
        app_path('bootstrap')
    ),
    
    /**
     * Autoload resources
     * 
     * - models - autoload models
     * - files - autoload any PHP files
     */
    'autoload' => array(
        'models' => array(),
        'files'  => array(
            'app/components/loader',
            'app/components/modules',
            'app/components/menu'
        )
    ),
    
    /**
     * i18n - Internationalization
     * 
     * - default - default language
     */
    'i18n' => array(
        'default' => 'ru_RU'
    ),
    
    /**
     * Validation
     * 
     * - validators - path to validators
     */
    'validation' => array(
        'validators' => 'validators'
    ),
    
    /**
     * Custom mini_blog fields
     */
    'mini_blog' => array(
        /**
         * Modules which should be loaded
         */
        'modules' => array(
            'settings',
            'admin', 
            'users',
            'blog',
            'landing',
            'templates'
        ),
        
        /**
         * Default timezone
         */
        'timezone' => 'America/Los_Angeles'
    )
);