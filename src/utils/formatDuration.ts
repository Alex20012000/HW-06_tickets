export const formatDuration = (duration: number): string => {

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedHours = hours > 0 ? `${hours}ч` : '';
    const formattedMinutes = minutes > 0 ? ` ${minutes}м` : '';

    return `${formattedHours}${formattedMinutes}`;
};
