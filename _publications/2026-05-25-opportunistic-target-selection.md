---
title: "Opportunistic Target Selection: Early Directional Commitment for Query-Efficient Black-Box Adversarial Attacks"
collection: publications
category: conferences
permalink: /publication/2026-05-25-opportunistic-target-selection
excerpt: "A lightweight wrapper that switches score-based black-box adversarial attacks from untargeted exploration to early targeted commitment, reducing class drift in random-search attacks."
date: 2026-05-25
venue: "CAp 2026 (Conférence sur l'Apprentissage automatique)"
publication_status: "Accepted at"
presentation: "poster presentation"
paperurl: "https://arxiv.org/pdf/2605.25663"
codeurl: "https://github.com/Tariolle/opportunistic-target-selection"
citation: "F. Tariolle and F. Yger. &quot;Opportunistic Target Selection: Early Directional Commitment for Query-Efficient Black-Box Adversarial Attacks.&quot; Accepted at CAp 2026."
---

Black-box adversarial attacks that minimize only the ground-truth confidence can suffer from class drift: perturbations make diffuse progress without committing to a specific adversarial class. Opportunistic Target Selection (OTS) first lets an attack explore in untargeted mode, then switches to a targeted objective against the leading non-true class.

The method requires no architectural modification, gradient access, or prior target-class knowledge. Across three score-based attacks and five ImageNet classifiers, OTS improves drift-prone random-search attacks by up to 27 percentage points in success rate and reduces censored-mean iterations by 43% on ResNet-50.
