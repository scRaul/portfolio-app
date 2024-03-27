---
title: Key Concepts|Computer Networks
updated: 3/26/24
layout: page
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
