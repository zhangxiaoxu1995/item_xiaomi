<?php

include 'conn.php';//链接数据库

$page=isset($_GET['page'])?$_GET['page']:'0';

$index=($page-1)*6;

$str="SELECT * FROM center_list LIMIT $index,8";

$res=$conn->query($str);//执行语句

$arr = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
$conn->set_charset('utf8');
?>

