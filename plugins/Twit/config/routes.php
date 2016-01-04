<?php
use Cake\Routing\Router;

Router::plugin('Twit', function ($routes) {
    $routes->fallbacks('DashedRoute');
});
