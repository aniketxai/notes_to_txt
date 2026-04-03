import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ProcessingPage from './pages/ProcessingPage';
import ResultPage from './pages/ResultPage';
import DemoPage from './pages/DemoPage';
import HistorySidebar from './components/HistorySidebar';
import FloatingUploadButton from './components/FloatingUploadButton';

const Layout = ({ children }) => {
  const location = useLocation();
  const showFloatingButton = location.pathname === '/' || location.pathname === '/result';

  return (
    <>
      <HistorySidebar />
      {children}
      {showFloatingButton && <FloatingUploadButton />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
