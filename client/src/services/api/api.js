import axios from 'axios';

class API {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://arjcrs-two.vercel.app',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': localStorage.getItem('token')
      }
    });
  }

  signUp = (role, data) => this.instance.post(`/api/user/signup/${role}`, data);

  logIn = (role, data) => this.instance.post(`/api/user/login/${role}`, data);

  getCompanies = () => this.instance.get('/api/companies');

  getCompany = id => this.instance.get(`/api/companies/${id}`);

  deleteCompany = id => this.instance.delete(`/api/companies/${id}`);

  getStudents = () => this.instance.get('/api/students');

  getStudent = id => this.instance.get(`/api/students/${id}`);

  deleteStudent = id => this.instance.delete(`/api/students/${id}`);

  getJobs = () => this.instance.get('/api/jobs');

  getJob = id => this.instance.get(`/api/jobs/${id}`);

  postJob = data => this.instance.post('/api/jobs', data);

  applyToJob = id => this.instance.patch(`/api/jobs/${id}/apply`);

  deleteJob = id => this.instance.delete(`/api/jobs/${id}`);

  getProfile = () => this.instance.get('/api/profile');

  getProfileById = id => this.instance.get(`/api/profile/${id}`);

  updateProfile = data => this.instance.patch(`/api/profile`, data);
}

export default API;
