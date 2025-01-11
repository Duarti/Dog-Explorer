import { theme } from '../styles/theme';

const Header: React.FC = () => (
    <header className={`bg-${theme.colors.primary} text-${theme.colors.white} py-${theme.spacing.sm} text-center`}>
        <h1 className="text-3xl font-bold test">React Dashboard</h1>
    </header>
);

export default Header;
