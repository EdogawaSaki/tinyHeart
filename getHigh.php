<?php
    $con = mysqli_connect("localhost","root","root","game");
    if (!$con) 
    { 
        die("连接错误: " . mysqli_connect_error()); 
    } 
    // $username = 'swh';
    // $query = mysqli_query($con,"SELECT score FROM user WHERE username='{$username}'");
    // if($query){
    //     $res = mysqli_fetch_all($query,MYSQLI_ASSOC);
    //     echo json_encode($res[0]);
    // }

    if(isset($_POST['username'])){
        $username = $_POST['username'];
        $query = mysqli_query($con,"SELECT score FROM user WHERE username='{$username}'");
        if($query){
            $res = mysqli_fetch_all($query,MYSQLI_ASSOC);
            echo json_encode($res[0]);
        }

    }
  
?>
