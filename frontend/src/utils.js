export const convertDateFormat = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

export const htmlToPlainText = (htmlContent) => {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  return tempDiv.textContent || tempDiv.innerText || "";
};
