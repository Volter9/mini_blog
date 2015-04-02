<?php

return [
    'posts' => [
        'title'  => 'Записи',
        'add'    => 'Добавить запись',
        'edit'   => 'Редактировать запись',
        'remove' => 'Удалить запись',
        
        'fields' => [
            'title'       => 'Заголовок',
            'url'         => 'URL фрагмент',
            'description' => 'Описание',
            'text'        => 'Содержание',
            'user_id'     => 'Автор',
            'category_id' => 'Категория'
        ],
        
        'tooltips' => [
            'title'       => 'Заголовок вашей записи',
            'url'         => 'URL фрагмент записи в адресной строке',
            'description' => 'Описание записи',
            'text'        => 'Содержание записи, можно использовать HTML или <a href="http://rukeba.com/by-the-way/markdown-sintaksis-po-russki/" target="_blank">Markdown</a>',
            'user_id'     => 'Автор записи',
            'category_id' => 'Категория записи'
        ]
    ],
    
    'categories' => [
        'title'  => 'Категории',
        'add'    => 'Добавить категорию',
        'edit'   => 'Редактировать категорию',
        'remove' => 'Удалить категорию',
        
        'fields' => [
            'title'       => 'Заголовок',
            'url'         => 'URL фрагмент',
            'description' => 'Описание',
        ],
        
        'tooltips' => [
            'title'       => 'Заголовок вашей категории',
            'url'         => 'URL фрагмент категории в адресной строке',
            'description' => 'Описание категории',
        ],
    ],
    
    'users' => [
        'title'  => 'Пользователи',
        'add'    => 'Добавить пользователя',
        'edit'   => 'Редактировать пользователя',
        'remove' => 'Удалить пользователя',
        
        'fields' => [
            'username' => 'Имя пользователя',
            'password' => 'Пароль',
            'mail'     => 'Элекронный адрес почты',
            'group_id' => 'Группа пользователя'
        ],
        
        'tooltips' => [
            'username' => 'Имя пользователя (логин)',
            'mail'     => 'Почтовый ящик пользователя',
            'group_id' => 'Группа пользователя'
        ]
    ]
];