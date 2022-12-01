import { apiInitializer } from "discourse/lib/api";

function loadCssCode(code) {
  var style = document.createElement('style');
  style.rel = 'stylesheet';
  style.id = 'gray-filter'
  //for Chrome Firefox Opera Safari
  style.appendChild(document.createTextNode(code));
  //for IE
  //style.styleSheet.cssText = code;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
}

function addGray() {
  loadCssCode("html { filter: grayscale(1) }")
}

function removeGray() {
  const style = document.getElementById('gray-filter');
  if (style) { style.remove() }
}

export default apiInitializer("0.11.1", api => {
  api.onPageChange((url, title) => {

    removeGray();
    if (url == "/" || url.startsWith("/?") || url.startsWith("/latest") || url.startsWith("/categories") || url.startsWith("/top")) {
      addGray();
      return;
    }

    var res = url.match(/\/t\/(.*?)\/(\w+)/);
    if (res && res[2] > 0) {
      const ids = settings.special_topic_ids.split("|");
      const id = res[2];
      if (ids.includes(id)) {
        addGray();
        return;
      }
    }
  });
});
