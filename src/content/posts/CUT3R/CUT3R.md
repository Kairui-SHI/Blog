---
title: CUT3R
published: 2025-03-19
description: 'Perception and 3D Reconstruction'
image: ''
tags: ["3D Reconstruction","ViT", "Blogging"]
category: 'paper review'
draft: false 
---

## Paper Review

论文阅读：[Continuous 3D Perception Model with Persistent State](https://arxiv.org/pdf/2501.12387)

## 📝 Summary

The paper presents **CUT3R (Continuous Updating Transformer for 3D Reconstruction)**, a unified framework for continuous 3D perception from image streams. It uses a **stateful recurrent model** that updates a persistent internal state with each new observation, enabling online dense 3D reconstruction. Key contributions include:

1. **Online 3D Reconstruction:** CUT3R generates **metric-scale pointmaps** for each frame in a shared coordinate system, accumulating them into a dense scene reconstruction as new images arrive.
2. **Virtual View Inference:** The model can infer **unseen regions** of the scene by querying the internal state with virtual views, offering view synthesis without requiring camera parameters.
3. **Generalization Across Tasks and Datasets:** CUT3R works with varying input types — videos, sparse photo collections, static and dynamic scenes — without needing known camera intrinsics or extrinsics.
4. **Competitive Performance:** The method achieves **state-of-the-art results** on multiple tasks, including monocular and video depth estimation, camera pose estimation, and 3D reconstruction.
