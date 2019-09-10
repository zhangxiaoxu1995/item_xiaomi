<?php

include 'conn.php';//链接数据库

$userphone=isset($_GET['userphone'])?$_GET['userphone']:'';
$yanzhengma=isset($_GET['yanzhengma'])?$_GET['yanzhengma']:'';


$str="SELECT * FROM uesrname where userphone=$userphone";

$res=$conn->query($str);//执行语句

if($res->num_rows == 0 ){//通过手机号查找数据库，如果没有该手机号，则把当前手机号和验证码输入到数据库
$chuangjian="INSERT INTO uesrname(userphone,yanzhengma)VALUES($userphone,$yanzhengma)";
$res1=$conn->query($chuangjian);
}
else if($res->num_rows == 1){//如果有该条手机号，则将验证码输入或添加到高条手机号对应的验证码;
$chuangjian2="UPDATE uesrname SET yanzhengma=$yanzhengma WHERE userphone = $userphone";
$res2=$conn->query($chuangjian2);
}


// $arr = $res->fetch_all(MYSQLI_ASSOC);


// echo json_encode($arr,JSON_UNESCAPED_UNICODE);
// $conn->set_charset('utf8');
?>
