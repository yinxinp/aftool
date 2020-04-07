/**
 * 导出指定的Json数据
 * @param {Json} data 下载的数据
 * @param {String} filename 文件名称
 */
export function saveJSON(data: any, filename: string) {
  if (!data) {
    alert("保存的数据为空");
    return;
  }
  if (!filename) filename = "json.json";
  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4);
  }
  let blob = new Blob([data], { type: "text/json" }),
    e = document.createEvent("MouseEvents"),
    a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}
