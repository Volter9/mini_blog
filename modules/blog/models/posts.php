<?php

/**
 * @const int POSTS_PER_PAGE The name is self-explanatory
 */
define('POSTS_PER_PAGE', 5);

/**
 * Initiate Posts model
 */
function posts_init () {
    load_api('pagination');
}

/**
 * Get all posts
 * 
 * @return array|bool
 */
function posts_all ($page = 1, $pages = POSTS_PER_PAGE) {
    return paginate_query('
        SELECT
            p.id, p.title, p.url, p.text, p.description, 
            p.user_id, p.category_id, p.date, 
            u.username, 
            c.title as category, c.url as category_url
        FROM posts p
            LEFT JOIN users u ON (p.user_id = u.id)
            LEFT JOIN categories c ON (p.category_id = c.id)
        ORDER BY p.id DESC, p.date DESC',
        array(), $pages, $page
    );
}

/**
 * Get posts by category id
 * 
 * @param int $id
 * @return array|bool
 */
function posts_by_category ($id, $page = 1, $pages = POSTS_PER_PAGE) {
    return paginate_query('
        SELECT 
            p.id, p.title, p.url, p.text, p.description, 
            p.user_id, p.category_id, p.date, 
            u.username, 
            c.title as category, c.url as category_url
        FROM posts p
            LEFT JOIN users u ON (p.user_id = u.id)
            LEFT JOIN categories c ON (p.category_id = c.id)
        WHERE p.category_id = ?
        ORDER BY p.id DESC, p.date DESC',
        array($id), $pages, $page
    );
}

/**
 * Get posts by url
 * 
 * @param string $url
 * @return array|bool
 */
function post_by_url ($url) {
    return db_select('
        SELECT
            p.id, p.title, p.text, p.description, 
            p.user_id, p.category_id, p.date, 
            u.username, 
            c.title as category, c.url as category_url
        FROM posts p
            LEFT JOIN users u ON (p.user_id = u.id)
            LEFT JOIN categories c ON (p.category_id = c.id)
        WHERE p.url = ?', 
        array($url), true
    );
}