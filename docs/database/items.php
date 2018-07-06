<?php
header('Content-Type: text/html; charset=utf-8');

/**
 * Created by PhpStorm.
 * User: Niko
 * Date: 03.07.2018
 * Time: 17:13
 * usage: php items.php > items.json
 */
class Adder
{
    public $items = [];

    public function addItem($name)
    {
        $item = ['id' => count($this->items), 'name' => $name];
        array_push($this->items, $item);
    }
}

$adder = new Adder();
$adder->addItem("ღორის ხორცი");
$adder->addItem("საქონლის ხორცი");
$adder->addItem("ხახვი");
$adder->addItem("ფქვილი, პურის");
$adder->addItem("წიწაკა, წითელი, დაფქული");
$adder->addItem("მარილი");
$adder->addItem("ძირა");
$adder->addItem("ძირა");


echo json_encode($adder->items, JSON_UNESCAPED_UNICODE);