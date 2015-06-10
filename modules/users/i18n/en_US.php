<?php

return array(
    'users' => array(
        'title'  => 'Users',
        'add'    => 'Add a user',
        'edit'   => 'Edit the user',
        'remove' => 'Remove the user',
        
        'denied' => array(
            'title'       => 'Access denied',
            'description' => 'Unfortunately, you cannot access this page or action.'
        ),
        
        'fields' => array(
            'username' => 'User name',
            'password' => 'Password',
            'mail'     => 'Email',
            'group_id' => 'User group'
        ),
    
        'tooltips' => array(
            'username' => 'User name (login)',
            'password' => 'User\'s password',
            'mail'     => 'User\'s e-mail',
            'group_id' => 'User\'s permission group'
        )
    ),
    
    'groups' => array(
        'title'  => 'Groups',
        'add'    => 'Add a group',
        'edit'   => 'Edit a group',
        'remove' => 'Remove a group',
        'privileges' => 'Priveleges',
        
        'fields' => array(
            'name'       => 'Name',
            'privileges' => 'Privileges'
        ),
        
        'permissions' => array(
            'all' => 'All privileges'
        )
    )
);