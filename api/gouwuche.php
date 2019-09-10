<?php

include 'conn.php';//链接数据库

$use_name=isset($_GET['use_name'])?$_GET['use_name']:'';

$str="SELECT * FROM dingdan WHERE use_name='$use_name'";
$res=$conn->query($str);//执行语句

$arr = $res->fetch_all(MYSQLI_ASSOC); 

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();
?>
