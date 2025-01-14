import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/pages/Layout';
import { DogsProvider } from '@/context/DogsContext';
import ErrorFallback from '@components/util/GlobalError';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import NotFound from '@components/util/NotFound';
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const Details = lazy(() => import('@/pages/Details'));

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <DogsProvider>
                    <QueryClientProvider client={queryClient}>
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route
                                        path="dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="details/:id"
                                        element={<Details />}
                                    />
                                    <Route path="*" element={<NotFound />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </QueryClientProvider>
                </DogsProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;
