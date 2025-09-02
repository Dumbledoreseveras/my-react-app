<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teacher_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function create($data) {
        $this->db->insert('teachers', $data);
        return $this->db->insert_id();
    }
    
    public function get_all() {
        $this->db->select('teachers.*, auth_user.email, auth_user.first_name, auth_user.last_name');
        $this->db->from('teachers');
        $this->db->join('auth_user', 'auth_user.id = teachers.user_id');
        return $this->db->get()->result();
    }
    
    public function get_by_user_id($user_id) {
        return $this->db->get_where('teachers', array('user_id' => $user_id))->row();
    }
}