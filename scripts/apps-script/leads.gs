/**
 * Apps Script para la planilla "Preteco · Leads del sitio".
 * Recibe los formularios del sitio y agrega una fila por lead.
 *
 * Instalación (una sola vez): ver docs/CMS-Y-LEADS.md
 *   1. Extensiones → Apps Script → pegar este archivo.
 *   2. Configuración del proyecto → Propiedades del script:
 *        SECRET        = la misma clave que LEADS_WEBHOOK_SECRET en Vercel
 *        NOTIFY_EMAIL  = (opcional) mails que reciben aviso, separados por coma
 *   3. Implementar → Nueva implementación → Aplicación web
 *        Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario
 *   4. Copiar la URL /exec en LEADS_WEBHOOK_URL de Vercel.
 */

var COLUMNS = ["fecha", "origen", "nombre", "email", "telefono", "empresa", "interes", "linkedin", "area", "tema", "mensaje", "pagina", "estado", "notas"];

var ORIGEN = { contact: "Contacto", careers: "Trabajá con nosotros", blog: "Propuesta de post", compliance: "Compliance" };

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    if (!data.secret || data.secret !== props.getProperty("SECRET")) {
      return json_({ ok: false, error: "unauthorized" });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);

      var row = COLUMNS.map(function (c) {
        if (c === "fecha") return new Date(data.fecha || new Date());
        if (c === "origen") return ORIGEN[data.origen] || data.origen || "";
        if (c === "estado") return "Nuevo";
        var v = data[c] || "";
        // Evita que un texto que empieza con =, +, - o @ se interprete como fórmula.
        return /^[=+\-@]/.test(v) ? "'" + v : v;
      });
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    var notify = props.getProperty("NOTIFY_EMAIL");
    if (notify) {
      MailApp.sendEmail({
        to: notify,
        subject: "Nuevo lead (" + (ORIGEN[data.origen] || "sitio") + "): " + data.nombre,
        body:
          "Nombre: " + data.nombre + "\nEmail: " + data.email +
          (data.telefono ? "\nTeléfono: " + data.telefono : "") +
          (data.empresa ? "\nEmpresa: " + data.empresa : "") +
          (data.interes ? "\nInterés: " + data.interes : "") +
          (data.mensaje ? "\n\nMensaje:\n" + data.mensaje : "") +
          "\n\nVer todos: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
        replyTo: data.email,
      });
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
