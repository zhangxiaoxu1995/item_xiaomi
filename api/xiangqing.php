<?php
include 'conn.php';

$uid=isset($_GET['uid'])?$_GET['uid']:'-1';

$checkid="SELECT * FROM list where uid=$uid";

$res=$conn->query($checkid);
$arr = $res->fetch_all(MYSQLI_ASSOC); 

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();

?>