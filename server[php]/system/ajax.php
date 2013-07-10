<?php
require 'system/lib/dbpdo.php';

class AjaxController {
    function __construct(){
        $this->db = dbPDO::singleton();
    }

    function actionSupermenu_onlineBots($botIds = ''){
        echo '<h1>Online Bots Checker</h1>';

        if (!empty($botIds)){
            require_once "system/api.php";
            $apiBots = new BotsController();
            $onliners = $apiBots->actionOnline(array_filter(array_map('trim', explode("\n", $botIds)), 'strlen'));

            echo '<table>';
            foreach ($onliners as $botId => $state){
                echo '<tr>';
                echo '<td>', '<img src="theme/images/icons/', $state? 'on' : 'off', 'line.png" /> ', '</td>';
                echo '<td> ', $botId, '</td>';
                echo '</tr>';
            }
            echo '</table>';
        }

        echo '<form id="supermenu-onlinebots" method="POST" action="?m=ajax/supermenu_onlinebots">',
                '<textarea name="botIds" rows="10" cols="60">', $botIds, '</textarea>',
                '<br><input type="submit" value="Check" />',
                '</form>';
    }
}
