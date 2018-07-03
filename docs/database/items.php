<?php
header('Content-Type: text/html; charset=utf-8');

/**
 * Created by PhpStorm.
 * User: Niko
 * Date: 03.07.2018
 * Time: 17:13
 * usage: php items.php > items.json
 */
$items = [];
function addItem(&$items, $name)
{
    $item = ['id' => count($items), 'name' => $name];
    array_push($items, $item);
}

addItem($items, "ხახვი");
addItem($items, "ნიორი");
addItem($items, "წიწაკა, მწვანე");


echo json_encode($items, JSON_UNESCAPED_UNICODE);