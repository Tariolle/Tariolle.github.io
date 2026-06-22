---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

## Geometry-Aware JEPA for EEG

[Code](https://github.com/Tariolle/hello-worlds) / [Deck](https://github.com/Tariolle/hello-worlds/blob/main/presentation/main.pdf)

Finalist project from Hack the World(s), a 24-hour hackathon on JEPAs and world models sponsored by Yann LeCun. Our team applied self-supervised representation learning to EEG, comparing ambient with SPD-tangent anti-collapse regularization under a patient-disjoint frozen-transfer protocol. The controlled result did not show a reliable accuracy gain from the geometric variants, but it established a careful research direction around geometry-aware EEG representations and anomaly detection.

## SLS-WM: Annealed Structured Label Smoothing for Discrete World Models

[Project page](https://tariolle.github.io/sls-wm/) / [Code](https://github.com/Tariolle/sls-wm)

Independent research project on annealed structured label smoothing for discrete world models. It designs a tokenizer-metric-aware objective that uses local soft targets early in training and anneals back to cross-entropy to preserve the final objective, and evaluates it on an accepted IRIS Atari world-model baseline under matched CE vs. annealed-SLS settings. The project also includes an action-conditioned Geometry Dash world model with FSQ tokenization, a block-causal dynamics transformer, and a latent actor-critic trained in imagined rollouts, enabling zero-shot deployment on real gameplay at 30 FPS.

## Opportunistic Target Selection

[Paper](https://arxiv.org/abs/2605.25663) / [Code](https://github.com/Tariolle/opportunistic-target-selection) / [Poster](https://github.com/Tariolle/opportunistic-target-selection/blob/main/poster/poster_beamer.pdf)

Official implementation for the CAp 2026 paper on early directional commitment for query-efficient score-based black-box adversarial attacks. The repository includes attack implementations, benchmark scripts, analysis code, and reproducibility assets for ImageNet experiments across standard classifiers.

## Rose

[Code](https://github.com/Alban1911/Rose)

Open-source, high-traffic real-time customization tool. I co-founded the project, led development, coordinated a six-person team, and designed core Python backend, Cloudflare Workers WebSocket relay, and browser-side JavaScript integration. The project is active and used by 15K+ daily active users.
