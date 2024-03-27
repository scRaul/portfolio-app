---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---

## Layer 2: Link Layer

**Packet**:Frame (payload encapsulates Datagram from layer 3)

| Preamble | Destination MAC | Source MAC | Type | payload | FCS|
|-|-|-|-|-|-|
| 8 Bytes  |     6 Bytes     | 6 Bytes    | 2 Bytes | 46-1500 Bytes| 4 Bytes|

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

- **Space**: $2^{48} $ possible MAC addresses, IEEE assigns the first 24 bits to a manufacturer and manufacturere assigns last 24 to their cards
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
