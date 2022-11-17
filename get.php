<?php

// ОТПРАВЛЯЕМ НА ФРОНТ
$output = [];

if (file_exists('products.txt')) {
  $products = json_decode(file_get_contents('products.txt'), true);

  $output = array_map(function($value){
    $a = explode(' :: ', $value);
    return array(
    'manufacturer' => $a[0],
    'model' => $a[1],
    'cost' => $a[2],
    'amount' => $a[3],);
  }, $products);
};

echo json_encode($output);


?>