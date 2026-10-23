/**
 * Apps Script para la planilla "Preteco · Blog (CMS)".
 * Agrega el menú "Preteco → Publicar cambios" para ver los cambios en el sitio al instante
 * (si no, el sitio los toma solo en hasta 5 minutos).
 *
 * Instalación: Extensiones → Apps Script → pegar este archivo → Guardar.
 * En Configuración del proyecto → Propiedades del script:
 *   SITE_URL          = https://preteco-web.vercel.app   (o el dominio final)
 *   REVALIDATE_SECRET = la misma clave que REVALIDATE_SECRET en Vercel
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Preteco")
    .addItem("Publicar cambios", "publicar")
    .addItem("Ver el blog", "verBlog")
    .addToUi();
}

function publicar() {
  var props = PropertiesService.getScriptProperties();
  var url = props.getProperty("SITE_URL") + "/api/revalidate?secret=" + encodeURIComponent(props.getProperty("REVALIDATE_SECRET"));
  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var ui = SpreadsheetApp.getUi();
  if (res.getResponseCode() === 200) ui.alert("Listo: los cambios ya están publicados en el sitio.");
  else ui.alert("No se pudo publicar (" + res.getResponseCode() + "). Revisá SITE_URL y REVALIDATE_SECRET.");
}

function verBlog() {
  var url = PropertiesService.getScriptProperties().getProperty("SITE_URL") + "/blogs";
  var html = HtmlService.createHtmlOutput('<script>window.open("' + url + '","_blank");google.script.host.close();</script>');
  SpreadsheetApp.getUi().showModalDialog(html, "Abriendo el blog…");
}
