# mini_blog CMS

[![Join the chat at https://gitter.im/volter9/mini_blog](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/volter9/mini_blog?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

mini_blog это простая легкая бложная CMS написанная на процедурном PHP5 на базе [mini_framework](https://github.com/Volter9/mini_framework).

## Требования

Для работы с mini_blog требуется PHP5.3+, PDO и pdo_mysql, и MySQL база данных.

## Особенности

mini_blog очень прост, легок и быстрый. 

## Как установить

Чтобы установить mini_blog, Вам нужно скачать архив в [релизах](https://github.com/Volter9/mini_blog/releases) и распаковать данный архив на своем сайте (веб сервере).

После распаковки, Вам следует установить `777` права на папку `install` и файл `app/config.php`.

Далее, зайдите на свой сайт в браузере и следуйте инструкциям инсталятора.

После инсталяции mini_blog, не забудьте удалить папку `install`.

### Ручная сборка

Если Вы хотите установить mini_blog руками, следуйте данной инструкции.

Для начала Вам нужно склонировать данный репозиторий:

```sh
git clone --recursive https://github.com/Volter9/mini_blog.git
```

Далее Вам нужно установить зависимости проекта через composer:

```sh
composer install
```

После этого можно запустить инсталятор и следовать его инстуркциям, или же...

#### Залить дамп и поправить `app/config.php`

Возьмите дамп из `install/install/resources/dump.sql` и залейте его в БД.

После этого отредактируйте данные о подключение `app/config/database.php`:

```php
return array(
    'autoload' => true,
    'default'  => array(
        // Имя базы данных
        'name'     => 'mini_blog',
        // Хост БД
        'host'     => 'localhost',
        // Пользователь БД
        'user'     => 'root',
        // Пароль пользователя БД
        'password' => '',
        // Кодировка
        'charset'  => 'utf8'
    )
);
```

И, если нужна установка другого языка то, поправьте `app/config/i18n.php`.

### Код инсталятора

         ______    \|/
        /* /   \   -*-
        __/ /|\ \  /|\
       /  \o..o/|__ |
      / /  \/\/ |__|=|
     / /_/  \/  |   |
    /____/\___/\|  /|\
    
    [=====>--] 75%/100%

Код инсталятора находится в данном [репозиторие](https://github.com/Volter9/mini_blog_install).
