<?php
include 'conn.php';

$use_name=isset($_GET['use_name'])?$_GET['use_name']:'';
$shop_uid=isset($_GET['shop_uid'])?$_GET['shop_uid']:'';

$checkid=" DELETE FROM dingdan WHERE use_name = '$use_name' AND shop_uid='$shop_uid'";

$res=$conn->query($checkid);
$arr = $res->fetch_all(MYSQLI_ASSOC); 

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();

?>