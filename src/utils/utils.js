const moment = require("moment");

export const formatDate = () => {
  return moment().format("DDMMYYYYmmHHss");
};

export const fileNameFormat = (file) => {
  const fname = file.name;
  let filename = fname.replace(/[\s()]/g, "");
  const fileArr = filename.split(".");
  const modifiedName = fileArr[0] + "_" + formatDate() + "." + fileArr[1];
  return modifiedName;
};

export const openUrl = (url) => {
  return window.open(url);
};
