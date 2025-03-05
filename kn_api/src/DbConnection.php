<?php
namespace slim4geonames;

class DbConnection {
    public static function getConnection() {
        $options = [
            // PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
            // PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
        ];
        $conn_str = "pgsql:host=" . getenv("dbhost") . ";port=" . getenv("dbport") . ";dbname=" . getenv("dbname");
        $username = getenv("dbuser");
        $pass = getenv("dbpass");
        return new \PDO($conn_str, $username, $pass, $options);
    }
}