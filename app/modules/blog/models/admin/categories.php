<?php

/**
 * Categories form description
 * 
 * @return array
 */
function categories_module_describe () {
    return array(
        'fields' => 'title, url, description',
        'per_page' => 8,
        
        'form' => array(
            'title' => 'input',
            'url' => 'input',
            'description' => 'text',
        )
    );
}

/**
 * Categories form validation rules
 * 
 * @return array
 */
function categories_module_rules () {
    return array(
        'title' => 'required|max_length:40|no_html',
        'url' => 'required|max_length:80|alpha_dash|unique:categories.url',
        'description' => 'required|max_length:500|html'
    );
}