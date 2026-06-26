/**
 * Creates a UTC ISO string from a date and selected time
 */
export const createUtcTimestamp = (selectedTime: Date): string => {
  const now = new Date();
  
  const utcDate = new Date(Date.UTC(
    now.getFullYear(), 
    now.getMonth(), 
    now.getDate(), 
    selectedTime.getHours(), 
    selectedTime.getMinutes()
  ));

  return utcDate.toISOString();
};

/**
 * Creates a new date with time set to start of day (00:00:00)
 */
export const getStartOfDay = (): Date => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};