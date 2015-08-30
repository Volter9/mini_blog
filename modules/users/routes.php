<?php

/**
 * Users routes
 * 
 * - Authenticate/Log in
 * - Sign out
 */

$path = module_path('users', 'actions');

route('POST #auth /api/login', "$path/auth");
route('GET #login /api/login', "$path/auth:view");
route('* #signout /signout', "$path/auth:signout");

bind('router:found', function ($route) {
    if (starts_with($route['id'], '#api_') && !users('authorized')) {
        die('You are not authorized!');
    }
});