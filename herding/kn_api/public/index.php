<?php

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;
use \Dotenv\Dotenv;
use Psr\Http\Message\UploadedFileInterface;

require __DIR__ . '/../vendor/autoload.php';
Dotenv::createImmutable(__DIR__ . '/../')->load();

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";



$app = AppFactory::create();

$middlewares = require __DIR__ . '/../src/middlewares.php';
$middlewares($app);

$public_routes = require __DIR__ . '/../src/routes/public/p_routes.php';
$public_routes($app);
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
    throw new HttpNotFoundException($request);
});
$app->run();
