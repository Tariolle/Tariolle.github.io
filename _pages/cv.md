---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% assign cv_pdf_url = "https://raw.githubusercontent.com/Tariolle/curriculum-vitae/master/main.pdf" %}
{% assign cv_pdf_preview_url = "https://github.com/Tariolle/curriculum-vitae/blob/master/main.pdf" %}

<p class="cv-actions">
  <a id="cv-open-pdf" class="btn" href="{{ cv_pdf_preview_url }}" target="_blank" rel="noopener">Open PDF</a>
  <a id="cv-download-pdf" class="btn" href="{{ cv_pdf_url }}" download="Florent_Tariolle_CV.pdf">Download CV</a>
</p>

<div class="cv-pdf-viewer">
  <iframe id="cv-pdf-frame" class="cv-pdf-frame" title="Florent Tariolle CV"></iframe>
  <p class="cv-pdf-fallback" hidden>
    The embedded CV could not be loaded. <a href="{{ cv_pdf_preview_url }}">Open the PDF on GitHub</a>.
  </p>
  <noscript>
    <p class="cv-pdf-fallback">
      JavaScript is required to embed the CV. <a href="{{ cv_pdf_preview_url }}">Open the PDF on GitHub</a>.
    </p>
  </noscript>
</div>

<script>
  (() => {
    const cvPdfUrl = "{{ cv_pdf_url }}";
    const frame = document.getElementById("cv-pdf-frame");
    const fallback = document.querySelector(".cv-pdf-fallback");
    const openPdfLink = document.getElementById("cv-open-pdf");
    const downloadPdfLink = document.getElementById("cv-download-pdf");

    if (!frame || !window.fetch || !window.URL || !window.URL.createObjectURL) {
      if (fallback) fallback.hidden = false;
      return;
    }

    fetch(cvPdfUrl, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("CV PDF fetch failed");
        }
        return response.blob();
      })
      .then((blob) => {
        const pdfBlob = blob.type === "application/pdf"
          ? blob
          : new Blob([blob], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(pdfBlob);
        const viewerHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>CV - Florent Tariolle</title>
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }

      body {
        background: #525659;
      }

      iframe {
        border: 0;
        display: block;
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <iframe src="${objectUrl}" title="CV - Florent Tariolle"></iframe>
  </body>
</html>`;
        const viewerUrl = URL.createObjectURL(new Blob([viewerHtml], { type: "text/html" }));

        frame.src = objectUrl;
        if (openPdfLink) openPdfLink.href = viewerUrl;
        if (downloadPdfLink) downloadPdfLink.href = objectUrl;
        window.addEventListener("pagehide", () => {
          URL.revokeObjectURL(objectUrl);
          URL.revokeObjectURL(viewerUrl);
        }, { once: true });
      })
      .catch(() => {
        frame.remove();
        if (fallback) fallback.hidden = false;
      });
  })();
</script>
