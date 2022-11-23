<?php

$params = json_decode(file_get_contents("php://input"), true);

$manufacturer = $params['manufacturer'];
$model = $params['model'];
$cost = $params['cost'];  // Number
$amount = $params['amount']; // Number

$item = implode(' :: ', [$manufacturer, $model, $cost, $amount]);


if (file_exists('products.txt')) {
    $products = json_decode(file_get_contents('products.txt'), true);

    // array_splice($products, $index, 1);
    // array_filter($products,function($string) use ($item) {

    //     return $string == $item; 
    // });

    $key = array_search($item, $products);
    
    if($key !== false) {
        array_splice($products, $key, 1);
        if (file_put_contents('products.txt', json_encode($products), LOCK_EX) == false) {
            echo 'govno';
        } else {
            echo 'ok';
        }
    }

    // echo print_r($products, true);

}
