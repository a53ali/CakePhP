# CakePHP Application

[![Build Status](https://api.travis-ci.org/cakephp/app.png)](https://travis-ci.org/cakephp/app)
[![License](https://poser.pugx.org/cakephp/app/license.svg)](https://packagist.org/packages/cakephp/app)

An example for creating applications with [CakePHP](http://cakephp.org) 3.x.

The framework source skeleton code can be found here: [cakephp/cakephp](https://github.com/cakephp/cakephp).

## Installation

1. Run CakePhP\Database Migration Setup\migrate_10_Oct_2015.sql via MySQL
2. Read and edit `config/app.php` and setup the 'Datasources' and any other
configuration relevant for your application.
3. Run cake bin\cake server

You should now be able to visit the web application at http://localhost:8765/

Issues that you might face after installing

1. Database driver Cake\Database\Driver\Mysql cannot be used due to a missing PHP
    extension or unmet dependency
    The above error will be displayed on browser, if Mysql database driver couldn't be used by app or
     is missing. Type the following command in terminal :
     sudo apt-get install php5-mysql
     Now restart mysql using command service mysql restart then restart Apache using command
     service apache2 restart
     Refresh the browser now, the above error would have disappeared.


Notes:

To start server in Linux, user needs to insert relative path.

root@adil:/home/adil/CakePhP/bin# cake -app /home/adil/CakePhP server


To kill process using port 80:

fuser -k 80/tcp
