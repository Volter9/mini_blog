<?php

/**
 * Save settings
 * 
 * @param string $group
 */
function action_save ($group = 'default') {
    $input = input();
    $settings = settings_get($group);
    
    foreach ($input as $key => $value) {
        $input[$key] = array(
            'exist' => isset($settings[$key]),
            'value' => strip_tags($value)
        );
        
        if (isset($settings[$key]) && $value === $settings[$key]) {
            unset($input[$key]);
        }
    }
    
    echo json_encode(array(
        'status' => settings_save($group, $input) ? 'ok' : 'not_ok'
    ));
}

/**
 * Get settings
 * 
 * @param string $group
 */
function action_get ($group = 'default') {
    $settings = settings_get($group);
    
    echo json_encode(array(
        'status'   => !empty($settings) ? 'ok' : 'not_ok',
        'settings' => $settings
    ));
}