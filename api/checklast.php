<?php

include 'conn.php';//链接数据库

$yanzhengma2=isset($_GET['yanzhengma2'])?$_GET['yanzhengma2']:'';
$phone_number4=isset($_GET['phone_number4'])?$_GET['phone_number4']:'';


$str="SELECT * FROM uesrname WHERE userphone=$phone_number4 AND yanzhengma=$yanzhengma2";

$res=$conn->query($str);//执行语句
if($res->num_rows == 1 ){
    echo 1;
}else{
echo 0;
}

$conn->set_charset('utf8');
?>
