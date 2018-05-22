<?php

	// header("Access-Control-Allow-Origin: *");
	
	$con = mysqli_connect("localhost","root","root","game");
	if (!$con) 
	{ 
    	die("连接错误: " . mysqli_connect_error()); 
	} 
	$time = time();
	date_default_timezone_set('Asia/Shanghai'); 

	// $query = mysqli_query($con,"INSERT INTO user (username,score,createtime) VALUES('syt',100,{$time})");
	
	$query = mysqli_query($con,"SELECT username,score FROM user  ORDER BY score DESC LIMIT 10");
		
	if($query){
		$res = mysqli_fetch_all($query,MYSQLI_ASSOC);
		echo json_encode($res);
	}


	// var_dump($res[0]);
	 // $res[0]['createtime'] = date('Y-m-d H:i:s',$res[0]['createtime']);
	 // var_dump($res[0]);
	

	// date()
	
	// $res = mysqli_fetch_all($query);
	// var_dump($res);
	
	mysqli_close($con);

?>