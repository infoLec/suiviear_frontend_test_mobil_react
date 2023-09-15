export const dateFormate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
};
