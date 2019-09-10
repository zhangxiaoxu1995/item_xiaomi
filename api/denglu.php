<?php

include 'conn.php';//链接数据库

$name=isset($_REQUEST['name'])?$_REQUEST['name']:'';//接收数据
$psw=isset($_REQUEST['psw'])?$_REQUEST['psw']:'';

$str="SELECT * FROM uesrname WHERE name='$name' AND PASSWORD='$psw'";//查询语句

$res=$conn->query($str);//执行语句

if($res->num_rows){
    echo 'yes';//匹配成功
}else{
    echo 'no';//密码错误
}
?>