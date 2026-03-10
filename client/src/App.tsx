import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewAll from './pages/ViewAll';
import AddTodo from './pages/AddTodo';
import TodoDetail from './pages/TodoDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<ViewAll />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
