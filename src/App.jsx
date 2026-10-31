import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './motion/SmoothScroll.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';

function AppError() {
  return (
    <section className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-4xl">Something went wrong</h1>
      <p className="mt-4 text-ink-soft">The page could not be displayed. Reloading usually fixes it.</p>
      <button onClick={() => window.location.reload()} className="mt-8 rounded-full bg-ink px-7 py-3 text-porcelain">
        Reload the page
      </button>
    </section>
  );
}

export default function App() {
  return (
    <ErrorBoundary fallback={<AppError />}>
      <SmoothScroll>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </ErrorBoundary>
  );
}