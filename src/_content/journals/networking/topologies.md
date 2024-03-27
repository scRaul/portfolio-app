---
title: Layer 1|Computer Networks
updated: 3/26/24
layout: page
---


## Network Topologies  

- **Bus Line**: a single communication channel with multiple branching communcation channels, each branch connects a communication node to the same collision domain, thus they most operate in half duplex mode. And typically pass around a token to decide who can transmit  
- **Ring Line**: Take a bus line but rather than having branching channels, each communcation node is connected with two other nodes, (circular linked list)  
- **FDDI Ring**: Use two rings using trasmitting opposite directions, in order to add redudnacy in case one ring fails.  
- **Full Mesh**: Connect every node with everyother node, this allows for 1 on 1 communcation but requires $\frac{n(n-1)}{2}$ communcation channels  
- **Star Topology**: Use a centerailized communcication node in order to connect route all communcation through this device.  
- **Hub & Spoke**: connect two or more star topoglies(hubs) together in order to be able to reach evrey other node ( spokes) via the hubs  
- **Partial Mesh**: take the frequently used spokes and link them to other frequently used spokes in order to add redudacny in the case a hub fails, travel to every other node is still possible.  
