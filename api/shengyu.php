<?php
include 'conn.php';

$shop_uid=isset($_GET['shop_uid'])?$_GET['shop_uid']:'';
$use_name=isset($_GET['use_name'])?$_GET['use_name']:'';
$shop_many=isset($_GET['shop_many'])?$_GET['shop_many']:'';


$str="UPDATE dingdan SET shop_many=$shop_many WHERE use_name = '$use_name' AND shop_uid = '$shop_uid'";

$res=$conn->query($str);


//关闭连接，防止资源浪费
$res->close();
$conn->close();

?>