---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---

## Layer 4: Transport Layer

**Packet**: Segments, which encapsulates messages sent from edge nodes  

**Policies**: na  

**Interface**:  Sockets  

**Adress Space**:  Port, $2^{16}$ address space, which is used to differentiate layer 7 services/ procesess running on the same edge node.  

- ports 0-1023 are reserved for specific services, common ports:
  - port 80 - http ( uses TCP )
  - port 443 - https ( Uses TLS )
  - port 21 - ftp
  - port 22 - ssh
- ports 1024-49151 can be regestried through IANA and used by applications and services
- ports 49152-65535 are dynamic ports which the operating system assigns to client applications when connecting with servers

**Protocols**:  

- **UDP**: User Defined Protocol is a connectionless, lightweight, no services communcation protocol
  - Immediatly send out a segnment when recieving a message
- **TCP**: Transmission Control Protocol is connection oriented
  - To begin communication a 3 way handhsake must take place
  - **Services**:
    - Reliability: ensures delivery of packets
    - congestion control: Adjusts its transmission rate based on packet loss
