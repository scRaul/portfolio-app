---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---

## Layer 5 and 6: Session and Presentation Layers

**Session Layer**: Keep data from getting tangled with other transmissions, responsible for setting up, maintaining and tearing down sessions.

- Common Protocols:
  - H.323: Set up and maintain audio and video streaming using RTP ( layer 7 protocol )
  - NetBios: Used for sharing files over a network

**Presentation Layer**: Formats and encrypts/decrypts data.

- Common Protocols:
  - TLS: extends TCP services by adding the following services:
    - Security
    - encryption
    - data ingegration
    - authentication
- Data Transformations:
  - given a data file present the associated presentation with it:
    - .png $\rightarrow$ graphical view of the image
    - .html $\rightarrow$ web page
    - .mp3 $\rightarrow$ audio
