---
title: "Computer Networks"
doc: "Journal"
version: 0.1.0
section: ["Key Concepts"]
---
## Key Concpets

**Communication Node:** has the ability to send and receive messages  
**Communication Channel:** A physical medium through an encoded  message is transmitted using physical signals.
**Encoded message:** a message transformed from one medium/format to another medium/format  
**Binary bit (${\beta}$) :** is the digital representation of a physical signal, 1 = active signal , 0 = inactive signal. ${b}$ represents a sequence of bits.  
**Packet:** consists of a header and payload, its size is the number of bytes ${B}$ required to encode a message  
**Rate:** the number of bits a communication channel can transmit over a period of time.  
**Network:** is a system of interconnected communication channels connecting communication devices  
**Bottleneck:** is where two or more communication channels merge into one.  
**Bandwidth:** A communication channel's theoritical max rate.  
**Throughput:** The actual amount of successfully transferred data through a communication channel.  
**Bottleneck:** The point at which multiple communication channels merge into one.  
**Multiplexing:** A technique used to try effeinciently send multiple signals past a bottneck point. E.g transmitting at defferent frequency ranges and or time slots  
**Demultiplexing:**  A process used to extract the multiple signals from a communication channel.  
**Collision Domain:** A the domain of communication nodes that share a communication channel, at the shared channel, each communication node has the potential to interupt another node from transmitting a message.  
**Half Duplex Mode:** When a commication device can both send and recieve but is restricted to only doing one at a time.  
**Full Duplex Mode:** When a communcation device is allowed to both send and recieve at the same time.

### Bit Unit Scale

>${\beta = 1 | 0}$  
>${b = }$ sequence of ${\beta}$  
>${Kb = 10^3 \cdot b}$  
>${Mb = 10^6 \cdot b}$  
>${Gb = 10^9 \cdot b}$  
>${Tb = 10^12 \cdot b}$  
>${Pb = 10^15 \cdot b}$  

### Binary Number system

>leftmost system, digits to the left hold a heigher weight  
>${\beta_n 2^n + \beta_{n-1} 2^n-1 + ... + \beta_0 2^0}$

### Memory Slot unit  

>Byte ${B = 8b}$  

## Network Topologies  

**Bus Line:** a single communication channel with multiple branching communcation channels, each branch connects a communication node to the same collision domain, thus they most operate in half duplex mode. And typically pass around a token to decide who can transmit  
**Ring Line:** Take a bus line but rather than having branching channels, each communcation node is connected with two other nodes, (circular linked list)  
**FDDI Ring:** Use two rings using trasmitting opposite directions, in order to add redudnacy in case one ring fails.  
**Full Mesh:** Connect every node with everyother node, this allows for 1 on 1 communcation but requires ${\frac{n(n-1)}{2}}$ communcation channels  
**Star Topology:** Use a centerailized communcication node in order to connect route all communcation through this device.  
**Hub & Spoke:** connect two or more star topoglies(hubs) together in order to be able to reach evrey other node ( spokes) via the hubs  
**Partial Mesh:** take the frequently used spokes and link them to other frequently used spokes in order to add redudacny in the case a hub fails, travel to every other node is still possible.  

## Hierarchal Network Tiers

**PAN:** Personal Area Network  

- scale: connecting 2 nodes within a close proximity  
- e.g: bluetooth and usb devices  

**LAN:** Local Area Network  

- scale: all connected nodes within an enclosure  
- e.g: Home network  

**CAN:** Campuus Area Network  

- scale: connecting multiple LANs within an area
- e.g: A college campus  

**MAN:** Metropolitain Area Network  

- scale: connecting multiple LANS and CANS across a zone  
- e.g: enterprise network

**WAN:** Wide Area Network  

- scale: connecting mutiple regions,areas and enclosures across a region  
- e.g: The Internet

## OSI Model and IEEE

**Open Systems Intercommuncation Model:** is a conceptual framework used to standardize and facilitate the repsosibilites of network devices and applications, it does so by spreading the responsibilties across 7 layers.

- **Layer 7:** Application
- **Layer 6:** Presentation  
- **Layer 5:** Session  
- **Layer 4:** Trasnport  
- **Layer 3:** Network  
- **Layer 2:** Link
- **Layer 1:** Physical

**Institute of Electrical and Electronics Engineers:** Develop and maintain standards of networking technologies ensuring interopablitly and compatitbiltiy among different devices and vendors.  

- e.g standards include: Ethernet (IEEE 802.3) and Wifi (IEEE 802.11)

## Layer 1: Physical Layer

**Packets**: Bits aka signals
**Policy:** immediately transmitt whatever you are given.  
**Technology:**

- **Coaxial Cable:**
  - **Media**: Electrical signals over a copper rod
  - **Build**: plastic jacket wraps braided metalic shield wraps metal shied wraps insulator wraps the copper core  
  - **Examples**:
    - RG6 cable line running from internet provider to homes
    - RG59 coax cables inside a home
- **Twinaxial Cable:**
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
- **Punch Down Pannel**: Exists in MDF and connects **IDF's** to the **MDF** via the patch pannel

### Ethernet Cable Comparison  

>| Category | Standard | Bandwidth | Distance | Frequency Range |
>|----------|----------|-----------|----------|----------|
>| CAT 3    | 10 BASE-T| 10 Mbps    | 100 meters| 16 Mhz |
>| CAT 5    | 100 BASE-TX|100 Mbps  | 100 meteres| 100 Mhz|
>| CAT 5e   | 1000 BASE-T| 1000 Mbps | 100 meters| 100 Mhz |
>| CAT 6    | 1000 / 10G Base-T | 1000 Mbps / 10 Gbps | 100 meters / 55 meters| 250 Mhz|
>| CAT 6a   | 10G BASE-T | 10 Gbps | 100 meters  | 500 Mhz |
>| CAT 7    | 10G BASE-T | 10 Gbps | 100 meters | 600 Mhz |
>| CAT 8    | 40G BASE-T | 40 Gbps | 30 meters | 2000 Mhz |

## Layer 2: Link Layer

**Packet** Frame (payload encapsulates Datagram from layer 3)

>| Preamble | Destination MAC | Source MAC | Type | payload | FCS|
>|----------|-----------------|------------|------|---------|----|
>| 8 Bytes  |     6 Bytes     | 6 Bytes    | 2 Bytes | 46-1500 Bytes| 4 Bytes|

**Policy**:

- **Deterministic**: Each node in a collision domain knows when its their turn to transmit,
  - **Protocols**:
    - Time Divison Multiple Access: Multiplex by allocating time to each node
    - Stat DMA: Multiplex by allocating time but based on node usage
    - Frequency DMA: Multiplex by allocating a frequency range to nodes

- **Contention**: Each node listens for a gap in order to start transmitting ( what the interent uses )
  - **Protocols**:
    - **Carrier Sense Multiple Access/Collision Detection CSMA**:
      - When their is a gap attempt to transmit, if collision occurs, backoff and try again

**Interface**:Network Interface Card (NIC) exists at node and made up of a controller to interact with computer and a transmitter to send out signals  
**Adressing**: Media Access Control (MAC) unique identifier which comes with each network card

- **Space**: ${2^{48} }$ possible MAC addresses, IEEE assigns the first 24 bits to a manufacturer and manufacturere assigns last 24 to their cards
- **notation**: the 48 bits are respresented by 6 pairs of hexadecimal numbers, each pair represents a 8 bits ( 1 Byte )
  - e.g  00:1A:2B:3C:4D:5E
  
**Technologies**:

- **Network Nodes**: Any device with a network interface card
  - **protocol**: CSMA/CD
- **Hub**: connects nodes into the same collison domain.
- **Switch**:Allows for full duplex communication between nodes and switches ports
  - **protocol**:Addess Resolution Protocol (ARP), maps IP (layer 3 addresses) to MAC addresses
  
**Services**:

- **Flow control**: regulate the rate of transmission between devices to avoid congestion
- **Error Handling**: Detect and correct error
  - parity checks
  - checksum
  - cyclic redundacny chec  k
- **Link Aggregation(IEEE 802.3ad)**: combine multiple connection into 1 single logical connection to prevent congestion
- **Power over Ethernet(PoE 802.3af PoE+ 802.3at)**: supply electrical power to a device
- **Spanning Tree(802.1d)**: used to prevent looping in a network
- **VLAN Trunking**:Multiple vlans over the same channel
- **MAC/IP Filtering**: allow or deny based on mac or IP address

## Layer 3: Network Layer  

**Packet**: Datagram (payload encapsulates )