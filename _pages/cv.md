---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
hide_title: true
redirect_from:
  - /resume
---

{% assign cv_pdf_url = "https://raw.githubusercontent.com/Tariolle/curriculum-vitae/master/main.pdf" %}

<div class="cv-pdf-viewer">
  <iframe id="cv-pdf-frame" class="cv-pdf-frame" title="Florent Tariolle CV"></iframe>
  <p class="cv-pdf-fallback" hidden>
    The embedded CV could not be loaded. <a href="{{ cv_pdf_url }}">Open the PDF directly</a>.
  </p>
</div>

<script>
  (() => {
    const cvPdfUrl = "{{ cv_pdf_url }}";
    const frame = document.getElementById("cv-pdf-frame");
    const fallback = document.querySelector(".cv-pdf-fallback");

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

        frame.src = objectUrl;
        window.addEventListener("pagehide", () => URL.revokeObjectURL(objectUrl), { once: true });
      })
      .catch(() => {
        frame.remove();
        if (fallback) fallback.hidden = false;
      });
  })();
</script>
