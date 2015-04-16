<?php

/**
 * App's config
 */

return array(
    'database' => array(
        'autoload' => true,
        'default'  => array(
            'host'     => 'localhost',
            'user'     => 'root',
            'name'     => 'mini_blog',
            'password' => '',
            'charset'  => 'utf8'
        )
    ),
    
    'templates' => array(
        'directory' => MF_BASEPATH . 'templates/',
        'template'  => 'minimalism'
    ),
    
    'routing' => array(
        'base_url' => 'http://php.sandbox/',
        'symbols' => array(
            '/:any' => '/?([\d\w\-_]+)',
            '/:num' => '/?(\d+)'
        )
    ),
    
    'hooks' => array(
        MF_APP_DIR . 'bootstrap'
    ),
    
    'autoload' => array(
        'models' => array('users'),
        'files'  => array(
            'app/components/loader',
            'app/components/admin',
            'app/components/modules'
        )
    ),
    
    'i18n' => array(
        'default' => 'ru_RU'
    ),
    
    'validation' => array(
        'validators' => 'validators'
    )
);