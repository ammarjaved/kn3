<?php
namespace slim4geonames\helpers;

class whereClauseParser {
    public static function gen_ilike_with_two_percent($arr) {
        $q = '';
        for ($i=0; $i < count($arr); $i++) {
            if($i==0){
                $q = $q . ' "' . $arr[$i] . '" ilike \'%\' || ? || \'%\'';
            }
            else {
                $q = $q . ' AND "' . $arr[$i] . '" ilike \'%\' || ? || \'%\'';
            }
        }
        return $q;
    }

    public static function gen_ilike_with_first_percent($arr) {
        $q = '';
        for ($i=0; $i < count($arr); $i++) {
            if($i==0){
                $q = $q . ' "' . $arr[$i] . '" ilike \'%\' || ? || \'\'';
            }
            else {
                $q = $q . ' AND "' . $arr[$i] . '" ilike \'%\' || ? || \'\'';
            }
        }
        return $q;
    }

    public static function gen_ilike_with_last_percent($arr) {
        $q = '';
        for ($i=0; $i < count($arr); $i++) {
            if($i==0){
                $q = $q . ' "' . $arr[$i] . '" ilike \'\' || ? || \'%\'';
            }
            else {
                $q = $q . ' AND "' . $arr[$i] . '" ilike \'\' || ? || \'%\'';
            }
        }
        return $q;
    }

    
    public static function gen_ilike_with_two_percent_with_val($arr, $val, $and_or) {
        $q = '';
        for ($i=0; $i < count($arr); $i++) {
            if($i==0){
                $q = $q . ' ' . $arr[$i] . ' ilike \'%\' || \'' . $val . '\' || \'%\'';
            }
            else {
                $q = $q . ' ' . $and_or . ' ' . $arr[$i] . ' ilike \'%\' || \'' . $val . '\' || \'%\'';
            }
        }
        return $q;
    }
    public static function gen_ilike_with_first_percent_with_val($arr, $val, $and_or) {
        $q = '';
        for ($i=0; $i < count($arr); $i++) {
            if($i==0){
                $q = $q . ' ' . $arr[$i] . ' ilike \'%\' || \'' . $val . '\' || \'\'';
            }
            else {
                $q = $q . ' ' . $and_or . ' ' . $arr[$i] . ' ilike \'%\' || \'' . $val . '\' || \'\'';
            }
        }
        return $q;
    }
    public static function gen_ilike_with_last_percent_with_val($arr, $val, $and_or) {
        $q = '';
        for ($i=0; $i < count($arr); $i++) {
            if($i==0){
                $q = $q . ' ' . $arr[$i] . ' ilike \'\' || \'' . $val . '\' || \'%\'';
            }
            else {
                $q = $q . ' ' . $and_or . ' ' . $arr[$i] . ' ilike \'\' || \'' . $val . '\' || \'%\'';
            }
        }
        return $q;
    }
}