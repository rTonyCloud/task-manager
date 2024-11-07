<?php

return [

    'paths' => ['*'], // Adjust this to match your API routes

    'allowed_methods' => ['*'], // Allow all methods (GET, POST, etc.)

    'allowed_origins' => ['*'], // Allow all origins (you can specify your frontend URL here)

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Set to true if you need to send cookies or HTTP authentication

];
