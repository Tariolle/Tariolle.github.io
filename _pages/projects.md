---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

## Geometry-Aware Joint-Embedding EEG

[Code](https://github.com/Tariolle/hello-worlds) / [Deck](https://github.com/Tariolle/hello-worlds/blob/main/presentation/main.pdf)

Finalist at Hack the World(s), a 24-hour hackathon on JEPAs and world models sponsored by Yann LeCun. Built a compact self-supervised EEG pipeline with SIGReg frozen-transfer baselines and Riemannian latent analysis. The geometry-aware variants did not improve frozen-probe accuracy, but manifold-aware visualizations exposed useful latent structure and opened follow-up directions for EEG representation learning.

## DashVMC: Real-Time Discrete World-Model Control in Geometry Dash

[Project page](https://tariolle.github.io/dash-vmc/) / [Code](https://github.com/Tariolle/dash-vmc)

Independent research project on real-time discrete world-model control in Geometry Dash. The system combines an FSQ tokenizer, an action-conditioned transformer world model, and a lightweight actor-critic trained from behavioural cloning plus PPO in latent FSQ-token rollouts, enabling live 30 FPS deployment. Decoded pixel rollouts are used for qualitative demos, including plausible level-continuation samples from real gameplay prefixes.

## Rose

[Code](https://github.com/Alban1911/Rose)

Open-source, high-traffic real-time customization tool. I co-founded the project, led development, coordinated a six-person team, and designed core Python backend, Cloudflare Workers WebSocket relay, and browser-side JavaScript integration. The project is active and used by 15K+ daily active users.
