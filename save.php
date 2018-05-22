<?php
	$con = mysqli_connect("localhost","root","root","game");
	if (!$con) 
	{ 
    	die("连接错误: " . mysqli_connect_error()); 
	} 
	$time = time();
	date_default_timezone_set('Asia/Shanghai'); 

	if(isset($_POST['username']) && $_POST['username'] != '' ){
		$user  = $_POST['username'];
		$score = $_POST['score'];	 

		$query = mysqli_query($con,"SELECT username,id,score FROM user WHERE username='{$user}'");//mysql_query() 函数执行一条 MySQL 查询。
		
		if(mysqli_num_rows($query)){
			//更新
			$res = mysqli_fetch_all($query,MYSQLI_ASSOC);//返回的是关联数组(以数据表中的字段为键),之后就可以遍历数组。

			if($res[0]['score'] < $score){
				$query = mysqli_query($con,"UPDATE user SET score={$score} WHERE id={$res[0]['id']}");
			}
		}else{
			//添加
			$query = mysqli_query($con,"INSERT INTO user (username,score,createtime) VALUES ('{$user}',{$score},{$time})");
		}
		

	}
	
	$query = mysqli_query($con,"SELECT username,score FROM user  ORDER BY score DESC LIMIT 10");

	if($query){
		$res = mysqli_fetch_all($query,MYSQLI_ASSOC);
		echo json_encode($res);//将数值转换成json数据存储格式。
	}


	
	
	
	mysqli_close($con);
?>