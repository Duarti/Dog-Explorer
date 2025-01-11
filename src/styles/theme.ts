export const theme = {
    colors: {
        primary: 'blue-500',
        secondary: 'gray-600',
        danger: 'red-500',
        white: 'gray-100',
        disabled: 'gray-500',
        dark: 'gray-900',
        accent: 'cyan-500',
        success: 'green-500',
        warning: 'yellow-500',
        background: 'gray-800',
    },
    spacing: {
        xs: '2',
        sm: '4',
        md: '8',
        lg: '12',
        xl: '16',
    },
    rounded: {
        default: 'rounded',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
    },
    animation: {
        spin: 'animate-spin',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce',
    },
};

export const buttonStyles = {
    base: `px-4 py-2 font-medium shadow-lg transition-all duration-200 ${theme.rounded.lg}`,
    primary: `bg-${theme.colors.primary} text-${theme.colors.white} hover:bg-blue-400`,
    disabled: `bg-${theme.colors.disabled} text-${theme.colors.white} cursor-not-allowed`,
    secondary: `bg-${theme.colors.secondary} text-${theme.colors.white} hover:bg-gray-500`,
    danger: `bg-${theme.colors.danger} text-${theme.colors.white} hover:bg-red-400`,
};

export const containerStyles = {
    card: `bg-${theme.colors.dark} border border-${theme.colors.secondary} ${theme.rounded.xl} p-6 shadow-xl`,
    grid: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
    centerFlex: 'flex items-center justify-center',
    glassmorphic: `backdrop-blur-lg bg-gray-700/70 border border-gray-600 ${theme.rounded.xl}`,
};
