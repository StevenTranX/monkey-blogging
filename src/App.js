import { Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes></Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
