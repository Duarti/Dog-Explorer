import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/pages/Layout';
import { DogsProvider } from '@/context/DogsContext';
import ErrorFallback from '@components/util/GlobalError';
import withSuspense from './components/util/withSuspense';
const NotFound = lazy(() => import('@components/util/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const Details = lazy(() => import('@/pages/Details'));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
        },
    },
});

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <DogsProvider>
                    <QueryClientProvider client={queryClient}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={withSuspense(Home)} />
                                <Route
                                    path="dashboard"
                                    element={withSuspense(Dashboard)}
                                />
                                <Route
                                    path="details/:id"
                                    element={withSuspense(Details)}
                                />
                                <Route
                                    path="*"
                                    element={withSuspense(NotFound)}
                                />
                            </Route>
                        </Routes>
                    </QueryClientProvider>
                </DogsProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;
