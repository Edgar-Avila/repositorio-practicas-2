export const base64ImgToUrl = (base64?: string) => {
  if (!base64 || base64 === "0x") {
    return "";
  }
  let fileType = "";
  if (base64.charAt(0) === "/") {
    fileType = "jpeg";
  }
  if (base64.charAt(0) === "i") {
    fileType = "png";
  }

  if (fileType === "") {
    return "";
  }

  return `data:image/${fileType};base64,${base64}`;
};
