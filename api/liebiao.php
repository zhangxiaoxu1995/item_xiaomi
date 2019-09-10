<?php

include 'conn.php';

  //1.写查询语句
$list1="SELECT * FROM list";

//2.执行语句
$res = $conn->query($list1);//结果集：包含很多信息，其中数据部分就是我想要的，要特意用方法才能提取出来

//3.提取数据
$arr = $res->fetch_all(MYSQLI_ASSOC); //得到一个数组 [{},{},{}]


//4.把数组转成字符串，传给前端,一个接口文件只能有一个输出：echo '[{},{},{}]'
echo json_encode($arr,JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义

//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();




?>
