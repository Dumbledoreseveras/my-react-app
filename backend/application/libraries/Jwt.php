<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'third_party/firebase/php-jwt/src/JWT.php';
require_once APPPATH . 'third_party/firebase/php-jwt/src/Key.php';

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class Jwt {
    private $key;
    
    public function __construct() {
        $this->key = 'secret key';
        $this->algorithm = 'HS256';
    }
    
    public function encode($data) {
        $payload = [
            'iss' => 'http://localhost:8888',
            'aud' => 'http://localhost:3000',
            'iat' => time(),
            'nbf' => time(),
            'exp' => time() + (60 * 60),
            'data' => $data
        ];
        
        return FirebaseJWT::encode($payload, $this->key, 'HS256');
    }
    
    public function decode($token) {
        try {
            $decoded = FirebaseJWT::decode($token, new Key($this->key, 'HS256'));
            return (array) $decoded->data;
        } catch (Exception $e) {
            return false;
        }
    }
}