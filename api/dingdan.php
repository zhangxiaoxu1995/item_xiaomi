<?php

include 'conn.php';//链接数据库

$use_name=isset($_GET['use_name'])?$_GET['use_name']:'';//获取传入的变量
$shop_uid=isset($_GET['shop_uid'])?$_GET['shop_uid']:'';

$str="SELECT * FROM dingdan WHERE use_name='$use_name' AND shop_uid=$shop_uid";//查询原有的数据库里是否含有商品和用户名
$res=$conn->query($str);//执行语句

$res1=$res->num_rows;//结果集

if($res1 > 0 ){ //如果大于0，就是已经含有，把对应的数量提取，并+1，再返回
 $arr2 = $res->fetch_all(MYSQLI_ASSOC)[0]['shop_many']+1;
$str4="UPDATE dingdan SET shop_many=$arr2 WHERE use_name = '$use_name' AND shop_uid = '$shop_uid'";
$res3=$conn->query($str4);
}else{//如果小于0.就表示没有该商品，直接可以添加1
$str9="INSERT INTO dingdan(use_name,shop_uid,shop_many) VALUES('$use_name',$shop_uid,1)";
$res9=$conn->query($str9);//执行语句
}

$conn->set_charset('utf8');
?>

