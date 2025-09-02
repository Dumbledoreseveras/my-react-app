<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// Auth routes
$route['api/register'] = 'auth/register';
$route['api/login'] = 'auth/login';
$route['api/verify'] = 'auth/verify_token';

// Teacher routes
$route['api/teachers'] = 'teacher/get_all';
$route['api/teachers/create'] = 'teacher/create';