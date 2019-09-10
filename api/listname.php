<?php

include 'conn.php';//链接数据库


$str="SELECT name FROM listname";//查询语句

$res=$conn->query($str);//执行语句
$arr = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>