export const datePostedAgo = (date: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) {
    return 'just now';
  }
  
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  
  if (hours < 24) {
    return `${hours}h`;
  }
  
  const days = Math.floor(hours / 24);
  return `${days}d`;
}