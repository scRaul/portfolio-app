---
title: Computer Networks
createdAt: 03/18/2024
updatedAt: 03/26/2024
author: Raul Ramirez
hero: /public/network_thumbnail.png
content: Journal
slug: networking
published: true
---
## Key Concpets

- **Communication Node**: has the ability to send and receive messages  
- **Communication Channel**: A physical medium through an encoded  message is transmitted using physical signals.
- **Encoded message**: a message transformed from one medium/format to another medium/format  
- **Binary bit**:($\beta$) is the digital representation of a physical signal, 1 = active signal , 0 = inactive signal. $b$ represents a sequence of bits.  
- **Packet**: consists of a header and payload, its size is the number of bytes $B$ required to encode a message  
- **Rate**: the number of bits a communication channel can transmit over a period of time.  
- **Network**: is a system of interconnected communication channels connecting communication devices  
- **Bandwidth**: A communication channel's theoritical max rate.  
- **Throughput**: The actual amount of successfully transferred data through a communication channel.  
- **Bottleneck**: The point at which multiple communication channels merge into one.  
- **Multiplexing**: A technique used to try effeinciently send multiple signals past a bottneck point. E.g transmitting at defferent frequency ranges and or time slots  
- **Demultiplexing**:  A process used to extract the multiple signals from a communication channel.  
- **Collision Domain**: A the domain of communication nodes that share a communication channel, at the shared channel, each communication node has the potential to interupt another node from transmitting a message.  
- **Half Duplex Mode**: When a commication device can both send and recieve but is restricted to only doing one at a time.  
- **Full Duplex Mode**: When a communcation device is allowed to both send and recieve at the same time.

$$
\textbf{Bit unit table}\\
\begin{align*}
\beta &= \set{1,0} \\
b & = count(\beta) \\
Kb & = 10^3 \cdot b \\
Mb & = 10^6 \cdot b \\
Gb & = 10^9 \cdot b \\
Tb & = 10^{12} \cdot b \\
Pb & = 10^{15}  \cdot b
\end{align*}
$$

**Binary Number System**:
leftmost system, digits to the left hold a heigher weight  

$$\beta_n 2^n + \beta_{n-1} 2^n-1 + ... + \beta_0 2^0$$

>**Memory Slot Unit**  
>Byte $B = 8b$

## Network Topologies  

- **Bus Line**: a single communication channel with multiple branching communcation channels, each branch connects a communication node to the same collision domain, thus they most operate in half duplex mode. And typically pass around a token to decide who can transmit  
- **Ring Line**: Take a bus line but rather than having branching channels, each communcation node is connected with two other nodes, (circular linked list)  
- **FDDI Ring**: Use two rings using trasmitting opposite directions, in order to add redudnacy in case one ring fails.  
- **Full Mesh**: Connect every node with everyother node, this allows for 1 on 1 communcation but requires $\frac{n(n-1)}{2}$ communcation channels  
- **Star Topology**: Use a centerailized communcication node in order to connect route all communcation through this device.  
- **Hub & Spoke**: connect two or more star topoglies(hubs) together in order to be able to reach evrey other node ( spokes) via the hubs  
- **Partial Mesh**: take the frequently used spokes and link them to other frequently used spokes in order to add redudacny in the case a hub fails, travel to every other node is still possible.  

## Hierarchal Network Tiers

- **PAN**: Personal Area Network
  - scale: connecting 2 nodes within a close proximity  
  - e.g: bluetooth and usb devices  

- **LAN**: Local Area Network  
  - scale: all connected nodes within an enclosure  
  - e.g: Home network  

- **CAN**: Campuus Area Network  
  - scale: connecting multiple LANs within an area
  - e.g: A college campus  

- **MAN**: Metropolitain Area Network  
  - scale: connecting multiple LANS and CANS across a zone  
  - e.g: enterprise network

- **WAN**: Wide Area Network  
  - scale: connecting mutiple regions,areas and enclosures across a region  
  - e.g: The Internet

## OSI Model and IEEE

**Open Systems Intercommuncation Model**: is a conceptual framework used to standardize and facilitate the repsosibilites of network devices and applications, it does so by spreading the responsibilties across 7 layers.

- **Layer 7**: Application
- **Layer 6**: Presentation  
- **Layer 5**: Session  
- **Layer 4**: Trasnport  
- **Layer 3**: Network  
- **Layer 2**: Link
- **Layer 1**: Physical

**Institute of Electrical and Electronics Engineers**: Develop and maintain standards of networking technologies ensuring interopablitly and compatitbiltiy among different devices and vendors.  

- e.g standards include: Ethernet (IEEE 802.3) and Wifi (IEEE 802.11)

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

## Layer 7: Application Layer

**Packet**: Message

**Protocols**: Must define the following:

- types of messages that can be exchanged
- the syntax for each of the message types
- rules for who and when to send or recieve a message
  
**Common Protocols**:

- HTTP: Hypertext Transfer Protocol, used for web applications
  - Port: 80
  - Protocol: TCP
  - Message Types: GET,POST,PUT,DELETE,HEAD
- HTTPS: Hypertext Transfer Protocol Secure, encrypts data exchanged
  - Port: 443
  - Protocol: TLS (Your HTTP operates on top of TLS)
  - Message Types: Same as HTTP
- SSH: Secure Shell, provides secure remote access
  - Port: 22
  - Protocol: TCP
  - Message Types: commands
- FTP: File Transfer Protocol, used to transfer files
  - Port: 21 ( control ) & 20 ( data )
  - Protocol: TCP
  - Message Types: RETR,STOR,LIST,DELE
- DHCP: Dynamic Host configuration Protocol,auto configures NIC to a network
  - Port: 67 (server) 68 (client)
  - Protocol: UDP
  - Message Types: DHCPDISCOVER, DHCPOFFER, DHCPREQUEST, DHCPACK, DHCPNAK

**Application Architecture**:  

- **Client-Server**: There exists a server reponsible for all communication done between clients  

- **Peer-2-Peer**: Clients need to directly communcate with one anohter

**Communication Strategies**:

- **Request-Response Modal**:
  - Client: sends a request
  - Server: process the request and sends back a response
  - Client: recieves the response
- **Push Modal**:
  - Client: client connects to the server
  - Server: pushes it new data when new data for the client exists
  - client: listens for new data
- **Short Polling**:
  - client: Sends a long request
  - server: responds with a url handle,which will show status of the request
  - client: polls uses handle to request for status updates
  - server: handles each handle request immediatly
- **Long Polling**:
  - same as short polling but instead of the server handling each handle request, it ignores it until it has a response

## The Cloud

**4 major categories of cloud networks**:

- Private: Isolated cloud network
- Public: Open to public networks such as the Internet
- Hybrid: some parts privat other public
- Community: Open to a collaborative effor betweeen orgs and communities

**5 Models of clould computing**:

- NaasS: Netowrking as a service
- Iaas: Infastructure as a service ( aws, azure)
- SaaS: Software as a service ( Office 365 )
- DaaS: Desktop as a service
- PasS: Platform as a service

**5 Cloud Concepts**:

- Elestic: Flexible architecture,adjust to meet real time demand
- Scalability: Designs ability to expand over time
- Vertical Scaling: Upgrade current hardware for increased performance
- Horizontal Scaling: Add more hardware to decrease average load
- Multitenancy: Share resources with other orgs / devs

**Infastrucutre as Code**: Scripts meant for automating and orchestrating tasks suchs as running a script to update software on various pieces of code  
**Snowflake System**: A system that was built offspec from the rest, this is a potential source of issues  
**VPN**: Virtual Private Network, establish a secure connection b/w client and remote server

**Types of cloud storage**:

- NAS: Network Attatched storage
- SAN: Storage Area network
- FC: Fiber Channel
- IP: Small computer systen interface

**Software Defined Networking**: a networking managable w/ software

- Layer of abstractions:
  - App Layer: focus on computing resources, allows request about the network
  - Control Layer: defines how packets are to be routed
  - Infastructure: contains the network devices that recieve information where to nake the data and perform these moves
  - Managment Plan: oversees the network and where tomake config changes

**Traffic Flow**:

- North-South: Traffice Exiting or entering the network
- East-West: Traffice flow within the network

## Network Security

**CIA Triad**:

- **Confedentaility**: encrypt data, auth users
  - **Symmetric Key Protocoles**:
    - **DES 56**: bit encryption symmetrice key
    - **Tripple DES**: 3 key encryption
    - **AES**: [ 128, 192, 256 ] bit keys
    - ***Pitfall**: key manangement,
  - **Integrety**: data was not modefied en route
    - **Hashing Protocols**:
      - **MD5**: 128 bits
      - **SHA-1**: 160 bit
      - **SHA-256**: 256 bit
- **Accessibility**: How avaiblable is the network

**Threat**: Person or thng who can take you down  
**Vulnability**: characterstic that allows a threat to exists  
**Risk**: How real is the threat and how vulnarable is the vulnability  
**Internal**: insider threat by accidnet or on purpose  
**Extenral**: Hacker or envioroment  
**CVE**: Common Vulnerabilities and Exposure  

- List of publically discovered computer security weaknesses

**Zero Day**: A new vulnerabliity no one has reported publically yet

**Risk Management**: Identify and prioritze risks

- Risk Assesment: identify potential hazards and what would happen if it comes to be
- Security Assesment: A security controlls whitin MITRE app/system / network

## Network Attacks

**DOS**: Denial of Service Attack,machine is flooded with requests

- TCP Syn Flood: attacker inints TCP connection but doesn't allow it to establish
- Smurf Attack: Attacker sends ping to subnet with spoofed IP sever

**DDOS**: Destributed Denial of Service Attack, when attcekr uses multiple computers to flood a server w/ request at the same time

**Botnet**: Comporomised computers(zombie) under control of a master node

**On-Path / Man in the Middle Attack (MITM)**: attacker intercepts outgoing request from victim

**Session Hijacking**: Attacker guesses sessionID, used to authenticate users, thus has granted himself an authorization

**DNS Poisoining**: Attacker manipulates known vulnerablilites within the DNS to reroute traffic from one site to a fake version of that site

- **DNSSEC**: Encrypt DNS signals to prevent posioning

***Always ensure to be on the latest patch / firmware**

**IP Spoofing**: modifying the source address of an IP packet to hide the ID of the sender or impersonate anohter client

**MAC Spoofing**: Change MAC address to prentend to be another device

**ARP Spoofing**:Sending falsified ARP messages over a LAN

**VLAN Hopping**: attacker bypasses VLAN segmentation and is able to send traffic between VLANs

**Switch Spoofing**: Attacker attempts to conduct DTP negotiation

**Malware**: designed to inflitrate a computer system and posssible damage it without users knowledge

**Virus**: malicious code that is run on a machinewithout the users knowlege and infect it whenever that code runs ( requires user to install)

**Worm**: software that can replicate itself without user interaction

**Trojan Horse**: Software desguised as a harmlesss software, seems like it does what you expect it to do

**Remote Access Trojan**: Provides attacker with remote access to control the victim machine

**Ransomware**: Restricts access to victims computer system or files until a ransom or payment is recieved

**Spyware**: Gathers information about you without your consent

**Key logger**: Captures any key strokes made on a machine

**Rogue Access Point**: unsecured installed WAP unknown to local admin

**Shadow IT**: Use of IT systems, devices, software, application or services without the approval of IT

**Evil Twin**: WAP with the same name as another

**Deauthentication**: Interrupts communication between end user and WAP

**Dictionary Attack**: Guessed passeword by brute force

**Wireless Interception**: intercept wireless packets then cracking encryption later on

**Social Engineering Attack**: Non technical way of breaking into a network/ obtainng access to resources

- e.g manipulating current employee to give you their credentials, dumpster diving

## Security Technoloiges

**Firewalls**:

- **Packet Filtering**: permits or deny's packets based on packet headers
- **Statefull Firewall**: permits or deny's request based on session id
- **NextGen Firewall**:(NGFW) conducts deep packet inspection plus packet filtering
- **Acess Control List**:(ACL) set of rules for the allowing or denying traffic based on packet headers, such as IP, MAC and ports
- **Firewall Zone**: Firewall interace in whihc admin / IT set up rules
  - Inside: connects LAN
  - Outside: connects to the Internet
  - Demilitariezed Zone: (DMZ): connects devices that should have restricted acces from the outside zone
- **Unified Threat Managment**: (UTM) combines firewall, router intrusion detection/prevention system, anti-malware, annd other features into a single device
**Intrusion Detection Systenms**: passive device which logs suspecious activity
 **Intrusion Prevention System**: active device which places between firewall and switch, monitor and drops or blocks traffic based on traffic
  - IDS is commonly used to avoid false positive
- **Signature-based**: system triggeres when a pattern is detected
- **Policy-based**: Relies on decalartion of security policy
- **Anomaly-based**: Bases on a baseline and flags outof the norm traffic

**Network-based IDS/IPS**: ( NIDS/NIPS) a network device that protects the entire netwrok

**Host-based IDS/IPS**:(HIDS/HIPS) software-based and installed on servers and clients

### Remote Access

**Telnet**: port 23 sends plain text over the interenet
**SSH**: port 22  encrypts everything that is sent over the internet
**RDP**: port 3389 connect to anohter computer using a graphical user interace ( Windows )
**RDG**: provides a secure connection using the SSL/TLS protocols to the server via RDP
**VPN**: establishes secure connection over the internet
**VNC**: port 5900 RDP but crosss-platform
**PAP**: sends usernames and paasswords in plain text for authentication
**CHAP**: sends authenticates via an encrpted "challenge" handshake
**EAP**: allows for more secure methods of authentication
**IPSec**:Provides authentication and encryption of data packetes to crate a secure encrypted communcation path between two computers

### SNMP

**Managed Device**: any device which can communicate with an SNMP manager known as the management information base (MIB)

**Simple Network Managment Protocol**: Sends and recieves data from a managed device back to a centralized network mananagement system

- Set / Get : sets or gets a variable
- Trap : agent notifies events to managers

**Management Information Base (MIB)**: The structure of the management data of a device subsystem using a heirarchical namespace containing object indentifiers
