<?php
namespace slim4geonames\helpers;

use \slim4geonames\DbConnection;
use Psr\Http\Message\UploadedFileInterface;
class DbHelper
{
    public static function getDataArray($sql, $allParamsForm = array()) {
        $dbconn = DbConnection::getConnection();
        $stmt = $dbconn->prepare($sql);
        if(!empty($allParamsForm)){
            for ($i = 0; $i < count($allParamsForm); $i++) {
                $stmt->bindValue($i + 1, array_values($allParamsForm)[$i]);
            }
        }
        $stmt->execute();
        $data_arr = array();
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            array_push($data_arr, $row);
        }
        $dbconn = null;
        return $data_arr;
    }

    public static function getRowCount($sql, $allParamsForm = array()) {
        $dbconn = DbConnection::getConnection();
        $stmt = $dbconn->prepare($sql);
        if(!empty($allParamsForm)){
            for ($i = 0; $i < count($allParamsForm); $i++) {
                $stmt->bindValue($i + 1, array_values($allParamsForm)[$i]);
            }
        }
        $stmt->execute();
        $data_arr = array();
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            array_push($data_arr, $row);
        }
        $dbconn = null;
        return $data_arr[0]['count'];
    }

    public static function insertData($sql, $allParamsForm = array()) {
        $dbconn = DbConnection::getConnection();
        $stmt = $dbconn->prepare($sql);
        if(!empty($allParamsForm)){
            for ($i = 0; $i < count($allParamsForm); $i++) {
                $stmt->bindValue($i + 1, array_values($allParamsForm)[$i]);
            }
        }
        $stmt->execute();
        $data_arr = $stmt->fetch(\PDO::FETCH_ASSOC);
        $dbconn = null;
        return $data_arr;
    }

    public static function updateData($sql, $allParamsForm = array()) {
        $dbconn = DbConnection::getConnection();
        $stmt = $dbconn->prepare($sql);
        if(!empty($allParamsForm)){
            for ($i = 0; $i < count($allParamsForm); $i++) {
                $stmt->bindValue($i + 1, array_values($allParamsForm)[$i]);
            }
        }
        $result = $stmt->execute();
        $dbconn = null;
        return $result;
    }

    public static function deleteData($sql, $allParamsForm = array()) {
        $dbconn = DbConnection::getConnection();
        $stmt = $dbconn->prepare($sql);
        if(!empty($allParamsForm)){
            for ($i = 0; $i < count($allParamsForm); $i++) {
                $stmt->bindValue($i + 1, array_values($allParamsForm)[$i]);
            }
        }
        $stmt->execute();
        $count = $stmt->rowCount();
        $dbconn = null;
        return $count;
    }
    public static function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile)
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        // see http://php.net/manual/en/function.random-bytes.php
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }
}
