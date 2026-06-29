---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

## Geometry-Aware Joint-Embedding EEG

[Code](https://github.com/Tariolle/hello-worlds) / [Deck](https://github.com/Tariolle/hello-worlds/blob/main/presentation/main.pdf)

Finalist at Hack the World(s), a 24-hour hackathon on JEPAs and world models sponsored by Yann LeCun. Built a compact self-supervised EEG pipeline with SIGReg frozen-transfer baselines and Riemannian latent analysis. The geometry-aware variants did not improve frozen-probe accuracy, but manifold-aware visualizations exposed useful latent structure and opened follow-up directions for EEG representation learning.

## SLS-WM: Annealed Structured Label Smoothing for Discrete World Models

[Project page](https://tariolle.github.io/sls-wm/) / [Code](https://github.com/Tariolle/sls-wm)

Independent research project on annealed structured label smoothing for discrete world models. It designs a tokenizer-metric-aware objective that uses local soft targets early in training and anneals back to cross-entropy to preserve the final objective, and evaluates it on an accepted IRIS Atari world-model baseline under matched CE vs. annealed-SLS settings. The project also includes an action-conditioned Geometry Dash world model with FSQ tokenization, a block-causal dynamics transformer, and a latent actor-critic trained in imagined rollouts, enabling zero-shot deployment on real gameplay at 30 FPS.

## Rose

[Code](https://github.com/Alban1911/Rose)

Open-source, high-traffic real-time customization tool. I co-founded the project, led development, coordinated a six-person team, and designed core Python backend, Cloudflare Workers WebSocket relay, and browser-side JavaScript integration. The project is active and used by 15K+ daily active users.
