<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function create($data) {
        $this->db->insert('auth_user', $data);
        return $this->db->insert_id();
    }
    
    public function get_by_email($email) {
        return $this->db->get_where('auth_user', array('email' => $email))->row();
    }
    
    public function get_by_id($id) {
        return $this->db->get_where('auth_user', array('id' => $id))->row();
    }
}