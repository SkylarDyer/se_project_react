export const formatDate = () => {
  const date = new Date();
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const checkIsDay = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const formattedHour = currentHour.toString().padStart(2, "0");
  const formattedMinutes = currentMinutes.toString().padStart(2, "0");

  if (formattedHour >= 18 || formattedHour <= 6) {
    return false;
  } else if (formattedHour > 6 && formattedHour < 18) {
    return true;
  }
};
