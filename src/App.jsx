import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './sign_up/sign_up'
import NavBar from './components/navbar';
import SignIn from './sign_in/sign_in';
import CourseForm from './course_form/course_form';
import ShowCourse from './show_course/show_course';

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/course_form" element={<CourseForm />} />
          <Route path="/show_course" element={<ShowCourse />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
