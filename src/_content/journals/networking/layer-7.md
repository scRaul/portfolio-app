---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---

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
