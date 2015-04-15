<?php

/**
 * Users form description
 * 
 * @return array
 */
function users_module_describe () {
    return array(
        'fields' => 'username, mail',
        'per_page' => 10,
        'form' => array(
            'username' => 'input',
            'password' => 'password',
            'mail' => 'input',
            'group_id' => 'select:groups',
        )
    );
}

/**
 * Users form validation rules
 * 
 * @return array
 */
function users_module_rules () {
    return array(
        'username' => 'required|max_length:20|min_length:6|alpha_dash|unique:users.username',
        'password' => 'required|min_length:6|alpha_dash',
        'mail' => 'required|valid_mail|max_length:40|unique:users.mail',
        'group_id' => 'required|is_numeric'
    );
}

function users_module_filter (array $data) {
    $data['password'] = md5($data['password']);
    
    return $data;
}