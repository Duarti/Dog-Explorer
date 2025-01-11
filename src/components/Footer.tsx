import { theme } from '../styles/theme';

const Footer: React.FC = () => (
    <footer className={`bg-${theme.colors.secondary} text-${theme.colors.white} py-${theme.spacing.xs} text-center`}>
        <p>&copy; 2025 React Dashboard. All rights reserved.</p>
    </footer>
);

export default Footer;
