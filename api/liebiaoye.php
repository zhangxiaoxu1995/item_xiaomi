<?php

include 'conn.php';
$order=isset($_GET['order'])?$_GET['order']:'';
$ipage=isset($_GET['ipage'])?$_GET['ipage']:'1';
$num=isset($_GET['num'])?$_GET['num']:'24';
$one=isset($_GET['one'])?$_GET['one']:'0';
$two=isset($_GET['two'])?$_GET['two']:'9999999';
$word=isset($_GET['word'])?$_GET['word']:'';
$mohu=isset($_GET['mohu'])?$_GET['mohu']:'';


  //1.写查询语句
  if(!$mohu&&!$order){//初始进入页面，渲染页码为全部商品/每页商品的数量
    $index=($ipage-1)*$num;
    $checkone2="SELECT * FROM list";
    $checkone="SELECT * FROM ($checkone2)temp where now_price BETWEEN $one AND $two";
    $sql="SELECT * FROM ($checkone2)temp2 limit $index,$num";
  }else if(!$mohu&&$order){//没有模糊搜索，单纯点击升降排序
    $index=($ipage-1)*$num;
    $quanbu="SELECT * FROM list";
    $checkone= "SELECT * FROM ($quanbu)temp3 ORDER BY now_price $order";
    $checktwo="SELECT * FROM ($checkone)temp where now_price BETWEEN $one AND $two";
    $sql="SELECT * FROM ($checktwo)temp1 limit $index,$num";
  }else if($mohu&&$order){//模糊搜索、升降排序都有
    $index=($ipage-1)*$num;
    $checkmohu="SELECT * FROM list where list_name LIKE '%$mohu%'";
    $checkone="SELECT * FROM ($checkmohu)temp where now_price BETWEEN $one AND $two";
    $checktwo= "SELECT * FROM ($checkone)temp1 ORDER BY now_price $order";
    $sql="SELECT * FROM ($checktwo)temp2 limit $index,$num";
  }else if($mohu&&!$order){//有模糊搜索，没有升降排序
    $index=($ipage-1)*$num;
    $checkmohu="SELECT * FROM list where list_name LIKE '%$mohu%'";
    $checkone="SELECT * FROM ($checkmohu)temp where now_price BETWEEN $one AND $two";
    $sql="SELECT * FROM ($checkone)temp2 limit $index,$num";
  };
 




//2.执行语句
$res = $conn->query($sql);//结果集：包含很多信息，其中数据部分就是我想要的，要特意用方法才能提取出来
$res3= $conn->query($checkone);

//3.提取数据
$arr = $res->fetch_all(MYSQLI_ASSOC); //得到一个数组 [{},{},{}]
 
  $data=array(
  'total'=>$res3->num_rows,
  'data' => $arr,
  'page' => $ipage,
  'num' => $num,
  'one'=>$one,
  'two'=>$two,
  'order'=>$order
  );

//4.把数组转成字符串，传给前端,一个接口文件只能有一个输出：echo '[{},{},{}]'
echo json_encode($data,JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义

//防止乱码
$conn->set_charset('utf8');

//关闭连接，防止资源浪费
$res->close();
$conn->close();




?>
