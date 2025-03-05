<?php

$dir=$_GET['id'];
$dir_name = "assets/img/SettlerViolation_Pictures/".$dir."/";
$images = glob($dir_name."*.JPG");

echo json_encode($images);
//foreach($images as $image) {
//    echo '<img src="'.$image.'" /><br />';
//}
?>
