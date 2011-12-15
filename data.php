<?php
	$query_param = $_GET['param1'];
	$response = "hi there " . $query_param;
	$status = "success";
	$arr = array('result' => $response, 'status' => $status);

	echo json_encode($arr);
?>