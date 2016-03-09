<?php

$curl = 'curl -X GET --insecure --user 02b1be0d48924c327124732726097157:d82dfc75133de24ef61c35cfd5fd9fd4 -H "Accept: application/json" -H "Content-Type: application/json" "https://suite.int03.achievers.com/api/v3/recognition?limit=1" -v';
$result = shell_exec($curl);

$temp = json_decode($result);
echo print_r($temp->{'content'});

function read($array)
{
    foreach ((array)$array as $key => $value) {
        if (is_array($value)) {
            read($array);
        }
        echo "$key = $value\n";
    }
}

foreach ($temp->{'content'} as $spot) {
    read($spot);
}


$output = shell_exec('ls -lart');
echo "<pre>$output</pre>";

?>

