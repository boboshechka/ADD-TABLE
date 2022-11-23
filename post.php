<?php


$params = json_decode(file_get_contents("php://input"), true);


// ПРИНИМАЕМ С ФРОНТА
$result = ['result' => 'success', 'error' => []];

$manufacturer = $params['manufacturer'];
$model = $params['model'];
$cost = $params['cost'];  // Number
$amount = $params['amount']; // Number

if (!$manufacturer) {
  $result['result'] = 'error';
  $result['error']['manufacturer'] = 'Не указан производитель';
}

if ($amount == 0 || !$amount) {
  $result['result'] = 'error';
  $result['error']['amount'] = 'Неверное кол-во товара';
}

$data = [];

if (file_exists('products.txt')) {
  $products = file_get_contents('products.txt');
  if ($products) {
    $data = json_decode($products, true);
  }
} 


if ($result['result'] == 'success') {
  array_push($data, implode(' :: ', [$manufacturer, $model, $cost, $amount]));

  if (file_put_contents('products.txt', json_encode($data), LOCK_EX) == false) {
    $result['result'] = 'error';
  }
}

echo json_encode($result);
