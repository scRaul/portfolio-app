---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---

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
