---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---

## Layer 1: Physical Layer

**Packets**: data bits  
**Policy**: immediately transmitt whatever you are given.  
**Technology**:

- **Coaxial Cable**:
  - **Media**: Electrical signals over a copper rod
  - **Build**: plastic jacket wraps braided metalic shield wraps metal shied wraps insulator wraps the copper core  
  - **Examples**:
    - RG6 cable line running from internet provider to homes
    - RG59 coax cables inside a home
- **Twinaxial Cable**:
  - **Media**: Electrical signals over pairs of wires
  - **Build**: 8 wires twisted into pairs, more twist per inch ~ better protected from electrical magnetic interfeference.  
    - UTP: Unshielded (lower cost)
    - STP: shielded
  - **Exampls**:
    - RJ45 ethernet cable uses 2 / 4 pairs of wires
    - RJ11 phone line cable uses 1 / 4 pairs of wires
- **Fiber Cable**:
  - **Media**: Light signals sent over glass rods
  - **Build**: plastic jacket wraps fiber glass wraps buffer coating wraps cladding wraps glass core
  - **Examples**:
    - SC "Stick and Click" connector req 2 pairs, 1 trasnmit 1 recieving
    - ST "Stick and Twist" connetor req 2 pairs
    - LC "Love connector"  connector combines 2 pairs into one form factor
    - MTRJ used to connect switches  
- **Transciever**: conversts signals from one media to signals in other media
  
**Terminology**:  

- **ISP**: Internet Service Provider, provides you a communication channel to the internet
- **Demarcation Point**: Where the ISP connection ends and your network begins  
- **MDF**: Main distribution frame, the root of your network ( where your root switch is)
- **IDF**: Intermediata distribution frame, where other switches exists in your network
- **Patch Pannel**: Exists at MDF connection to the switch are made through the patch pannel, cheap device to prevent wear and tear on switch ports + cable managment
- **Punch Down Pannel**: Exists in MDF and connects **IDF's**:to the **MDF**:via the patch pannel

 **Ethernet Cable Comparison**:
| Category | Standard | Bandwidth | Distance | Frequency Range |
|-|-|--|-|-|
| CAT 3    | 10 BASE-T| 10 Mbps    | 100 meters| 16 Mhz |
| CAT 5    | 100 BASE-TX|100 Mbps  | 100 meteres| 100 Mhz|
| CAT 5e   | 1000 BASE-T| 1000 Mbps | 100 meters| 100 Mhz |
| CAT 6    | 1000 / 10G Base-T | 1000 Mbps / 10 Gbps | 100 meters / 55 meters| 250 Mhz|
| CAT 6a   | 10G BASE-T | 10 Gbps | 100 meters  | 500 Mhz |
| CAT 7    | 10G BASE-T | 10 Gbps | 100 meters | 600 Mhz |
| CAT 8    | 40G BASE-T | 40 Gbps | 30 meters | 2000 Mhz |
