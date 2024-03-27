---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---

## Layer 3: Network Layer  

**Packet**: Datagram (payload encapsulates Segment form layer 4)  

**Policies**:

- **FIFO**: First in First Out, packets are setn out in the same order in which they are recieved.
- **Priority Queue**: Packets are sent out depending on some weight system.
- **Round Robin**: Packet Queues are allocated cyclic slot to send out one packet.

**Interface**: Ethernet ports  
**Address Space**:

- **IPV4**: $ 2^{32} $ addressing space, x number of bits are used as a network id and y number of bits are used to identify a host
  - **notation**: doted decimal, 4 Bytes (represented in decimal form) are seperated by dots.
    - e.g: 192.168.1.4 - 11000000 10101000 00000001 00000100
  - **Subnet Mask**: is a 32 bit number used to define the network bits vs the hosts bits
  - **CIDR Notation**: rather than passing around both a IPV4 and subnet mask around, short hand < IPV4 address/<# of network bits
    - e.g: 192.168.1.4/24
  - **IPV4 Class Tpes**: IPV4 address fall under one of 5 classes, this is dependent on their first byte and defualt subnet mask
    - e.g Class E: reserved IP starting byte betweem 240-255 with a no default mask
      - reserved for expirmental research

 **Public IPV4 class table**:
|Class | First byte range | default mask | Possible host|
|------|------------------|--------------|--------------|
| A    |  1 - 127         | 255.0.0.0    | 16.7 million |
| B    | 128 - 191        | 255.255.0.0  | 65,536       |
| C    | 192 - 223        | 255.255.255.0| 256          |
| D    | 225 - 239        |   null       |              |
| E    | 240 - 255        |  null        | 268 million  |

- **IPV6**: $ 2^{128} $ addressing space, can map multiple IP's per NIC
  - **notation**: 32 hex numbers,grouped into 8 sets of 4.
    - e.g: 2018:8888:0000:0000:0000:0000:48AB:54AE
      - shorthand: 2018:8::48AB:54AE
        - if a group has the name number, you can write 1 number instead
        - if a series of groups are 0's you can close the series, :: once.

**Technologies**:

- **Routers**: connect multiple networks together and in charge of forwarding a message to the correct network
  - **protocols**
    - **OSPF**: Open Shortest Path First maintain a topology of the network based on cost to each link within a network
    - **BGP**: Border Gateway protocol, exchange information with other routers in order to maintain reachablilty information to other networks
- **Layer 3 Switches**: Combines a layer 2 switch with a router
- **WAP**: Wireless access point, provides wireless connection to a network

**Service And Terminalogy**:

- **Class Inter-Domain**:allows for partitioning of a network by creating a subnet mask from barrowed host bits.
- **Private vs Private IP**: public is addressable by node over the inernet, private is only addressable for any node within a LAN.

 **Private IP**:
| Class | Range | Possible Hosts |
|-------|-------|----------------|
| A     | 10    | 16.7 million |
| B     | 172.16 - 172.31 | 1.05 million |
| C     | 192.168 | 65,536  |

- **NAT**: Network address translation, allows private IP to share a public IP
- **Loopback Address**: ( 127.0.0.1) aka localhost. used for creating local calls such as for testing and troubleshooting
- **Fully Configured**: Network card has the following components:
  - IP address
  - subnet mask
  - DHCP servers address
  - Default gateway
- **Automatic Private IP**: (169.254.0.0) when NIC isnt connected to any network.
- **DHCP**: Dynamic Host Configuration Protocol runs on a server ( usually on the router), and is in charge for auto fully configuring devices.
- **DNS**: Domain Name System core functionality is to translate ip address to domain names. If a server can't find a tranlation, it keeps moving up the chain of routers until a tranlation is found.

 **Domain Name http: //www.my-domain-name .com/pathTofile**:
 |http:// | www | my-domain-name|.com | /path to file |
 |--------|-----|---------------|-----|---------------|
 | service| subdomain|root domain | top level domain|  |

**Data Flow**:

- **Unicast**: from one node to another
- **multicast**:from one node to a group
- **broadcast**: frome one node to everynode in network

**Subnetting**:
$ subnets = 2^s $ where s is the number of barrowed bits  
$CIDR = 32 - \lceil log_{2}(users+2) \rceil $  
$ assignable IP = 2^h -2 $ where h is the number host bits
 first IP address is used as the network ID  
 last IP is used as a broadcast ID, for every subnet

**Subnetting ref table**:
 | CIDR | subnets |total IPS per sub net|
 |------|---------|--------------------|
 |  /24 |    1    |    256  |
 | /25  |    2    |    128  |
 | /26  |    4    |    64   |
 | /27  |    8    |    32   |
 | /28  |    16   |    16   |
 | /29  |    32   |   8     |
 | /30  |    64   |   4     |
