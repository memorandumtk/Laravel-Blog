### Install
curl -s "https://laravel.build/blog?with=mysql" | bash
sail up -d
sail npm --version
sail artisan --version
sail php --version
sail composer --version
sail composer require laravel/breeze --dev
sail php artisan breeze:install react
sail php artisan migrate


### Version
kosuke@Kousuke:~/f-answer/blog$ sail npm --version
10.3.0
kosuke@Kousuke:~/f-answer/blog$ sail artisan --version
Laravel Framework 10.41.0
kosuke@Kousuke:~/f-answer/blog$ sail php --version
PHP 8.3.1 (cli) (built: Dec 21 2023 20:12:13) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.3.1, Copyright (c) Zend Technologies
with Zend OPcache v8.3.1, Copyright (c), by Zend Technologies
with Xdebug v3.3.0, Copyright (c) 2002-2023, by Derick Rethans
kosuke@Kousuke:~/f-answer/blog$
kosuke@Kousuke:~/f-answer/blog$ sail composer --version
Composer version 2.6.6 2023-12-08 18:32:26
kosuke@Kousuke:~/f-answer/blog$
----
