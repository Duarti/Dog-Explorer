import { Suspense, ComponentType, ReactNode } from 'react';
import Loading from '../shared/Loading';

/**
 * Wraps a component with Suspense and a fallback UI.
 *
 * @param {ComponentType<any>} Component - The component to wrap.
 * @returns {ReactNode} A wrapped component with Suspense.
 *
 * @example
 * const Dashboard = lazy(() => import('@/pages/Dashboard'));
 * <Route path="dashboard" element={withSuspense(Dashboard)} />;
 */
const withSuspense = (Component: ComponentType<any>): ReactNode => {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
};

export default withSuspense;
