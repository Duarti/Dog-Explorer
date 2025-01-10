import './App.css';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/GlobalError';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import Layout from './pages/Layout';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Home = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/Details'));

const queryClient = new QueryClient();

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="details/:id" element={<Details />} />
                        </Route>
                    </Routes>
                </Suspense>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
