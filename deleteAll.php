<?php

$row_number = 0;    //номер строки которую удаляем
$file_out = file("products.txt"); // Считываем весь файл в массив
 
echo $file_out;

// записываем нужную строку  в файл
file_put_contents("products.txt", $file_out[$row_number], FILE_APPEND);
 
// echo "$file_out[$row_number]"; 
//удаляем записаную строчку
unset($file_out[$row_number]);
 
// //записали остачу в файл
file_put_contents("products.txt", implode("", $file_out));

// require ('index.html');

?>