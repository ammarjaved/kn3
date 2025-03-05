<?php

use Slim\App;
use \slim4geonames\HttpErrorHandler;

return function (App $app) {
    // Add Routing Middleware
    $app->addRoutingMiddleware();
    /**
     * Add Error Handling Middleware
     *
     * @param bool $displayErrorDetails -> Should be set to false in production
     * @param bool $logErrors -> Parameter is passed to the default ErrorHandler
     * @param bool $logErrorDetails -> Display error details in error log
     * which can be replaced by a callable of your choice.
 
     * Note: This middleware should be added last. It will not handle any exceptions/errors
     * for middleware added after it.
     */
    $errorMiddleware = $app->addErrorMiddleware(true, true, true);
    $callableResolver = $app->getCallableResolver();
    $responseFactory = $app->getResponseFactory();
    $errorMiddleware->setDefaultErrorHandler(new HttpErrorHandler($callableResolver, $responseFactory));
};
