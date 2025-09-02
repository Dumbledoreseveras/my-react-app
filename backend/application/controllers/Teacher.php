<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teacher extends CI_Controller {
    
    public function __construct() {
        parent::__construct();
        $this->load->model('User_model');
        $this->load->model('Teacher_model');
        $this->load->library('Jwt');
        $this->load->library('form_validation');
        $this->check_token();
    }
    
    private function check_token() {
        $headers = $this->input->request_headers();
        
        if (!isset($headers['Authorization'])) {
            $this->output
                ->set_content_type('application/json')
                ->set_status_header(401)
                ->set_output(json_encode([
                    'status' => 'error',
                    'message' => 'Authorization header missing'
                ]));
            exit;
        }
        
        $auth_header = $headers['Authorization'];
        $token = str_replace('Bearer ', '', $auth_header);
        
        $decoded = $this->jwt->decode($token);
        
        if (!$decoded) {
            $this->output
                ->set_content_type('application/json')
                ->set_status_header(401)
                ->set_output(json_encode([
                    'status' => 'error',
                    'message' => 'Invalid or expired token'
                ]));
            exit;
        }
        
        $this->user_id = $decoded['user_id'];
    }
    
    public function create() {
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email|is_unique[auth_user.email]');
        $this->form_validation->set_rules('first_name', 'First Name', 'required');
        $this->form_validation->set_rules('last_name', 'Last Name', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required|min_length[6]');
        $this->form_validation->set_rules('university_name', 'University Name', 'required');
        $this->form_validation->set_rules('gender', 'Gender', 'required|in_list[male,female,other]');
        $this->form_validation->set_rules('year_joined', 'Year Joined', 'required|numeric|exact_length[4]');
        $this->form_validation->set_rules('department', 'Department', 'required');
        
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            $this->output
                ->set_content_type('application/json')
                ->set_status_header(400)
                ->set_output(json_encode([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $errors
                ]));
            return;
        }
        
        $user_data = array(
            'email' => $this->input->post('email'),
            'first_name' => $this->input->post('first_name'),
            'last_name' => $this->input->post('last_name'),
            'password' => password_hash($this->input->post('password'), PASSWORD_DEFAULT)
        );
        
        $user_id = $this->User_model->create($user_data);
        
        if (!$user_id) {
            $this->output
                ->set_content_type('application/json')
                ->set_status_header(500)
                ->set_output(json_encode([
                    'status' => 'error',
                    'message' => 'Failed to create user'
                ]));
            return;
        }
        
        $teacher_data = array(
            'user_id' => $user_id,
            'university_name' => $this->input->post('university_name'),
            'gender' => $this->input->post('gender'),
            'year_joined' => $this->input->post('year_joined'),
            'department' => $this->input->post('department')
        );
        
        $teacher_id = $this->Teacher_model->create($teacher_data);
        
        if ($teacher_id) {
            $this->output
                ->set_content_type('application/json')
                ->set_status_header(201)
                ->set_output(json_encode([
                    'status' => 'success',
                    'message' => 'Teacher created successfully',
                    'teacher_id' => $teacher_id
                ]));
        } else {
            $this->output
                ->set_content_type('application/json')
                ->set_status_header(500)
                ->set_output(json_encode([
                    'status' => 'error',
                    'message' => 'Failed to create teacher'
                ]));
        }
    }
    
    public function get_all() {
        $teachers = $this->Teacher_model->get_all();
        
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(json_encode([
                'status' => 'success',
                'data' => $teachers
            ]));
    }
}