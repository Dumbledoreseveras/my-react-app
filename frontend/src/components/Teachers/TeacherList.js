import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import teacherService from "../../services/teacher";


const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchTeachers();
  }, []);
  
  const fetchTeachers = async () => {
    try {
      const response = await teacherService.getAll();
      
      if (response.status === 'success') {
        setTeachers(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }
  
  return (
    <Container className="mt-4">
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h2>Teacher List</h2>
        </Col>
        <Col className="text-end">
          <Link to="/add-teacher">
            <Button variant="primary">Add New Teacher</Button>
          </Link>
        </Col>
      </Row>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card>
        <Card.Body>
          {teachers.length === 0 ? (
            <div className="text-center py-4">
              <p>No teachers found.</p>
              <Link to="/add-teacher">
                <Button variant="primary">Add the first teacher</Button>
              </Link>
            </div>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>University</th>
                  <th>Department</th>
                  <th>Gender</th>
                  <th>Year Joined</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.first_name} {teacher.last_name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.university_name}</td>
                    <td>{teacher.department}</td>
                    <td>{teacher.gender}</td>
                    <td>{teacher.year_joined}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TeacherList;