--- 
title: Operating Systems
doc: Journal
publish: false
updated: 3/16/2024
---
## System Design

**Users**: who or what does the system serve ?  
**Resouces/Services Offered** What resources and or services does the system provide?  
**User Interface** How can users access said resources and or services?  
**Resource Management** How does the system ensure fairness?  
**User Policies** How can we protect the system and its users?  
**Performance Metrics** how effecient is the system begin utilized?  

## Operating System

**Users**: computer programs processes  
**Resources**: Computer hardware components  
**Service**: virtualize computer components to make them easy-to-use  
**User Interace**: Application Programming Interface (API), a library   for programs to use to request a resources/services  
**Resouce Management**: ensure every program (user) is able to get fair, relieable  and secure access to computer hardware components  
**Perfomance Metrics**: how effeciently are programs being allowed to resources?  
how long do they need to wait until they have access to a resouces, how long does it take them to finish a process.  

## Processs Management

**Program vs Process**:

- Program: is file which contains a set of instuctions
- Process: is what the program launches, process need to maintain a state and require computer resouces

The operating sytem is in charge of manageing processes, and ensuring that each program gets a fair chance to run.  

**Multi-Programming**:gives the illusion that there are multiple process running simultaneousely, the is done by time division multiplexing;aka allocating a very short time slot to each program to be able to run.

To accomplish this the OS must maintain the execution state of each process, running or ready to run.

How a process is created:

- OS retrieves program and loads it into memory
- allocates memory for static data, call stack and memeory heap
- initialize file descriptors
- allow the program time to use its required resources such as controll over the CPU

**Potential Pitfall**: Since the OS hands over control to the program, how can the OS then ensure that the program doesnt "take over" as in not hog the resources ?

**Context Switching with Timer Interrupts**: in order to prevent a program from taking over, make se a hardware interrupts in order to stop the current process.

- **Hardware interrupts**: some hardware components have the ability to interrupt the CPU by sending it a signal, when the CPU hears the signal, it stops the current process, saves its registers and calls on the OS to deal with it
  - The signal gets logged into a trap table, where then the OS will read and handle the interrupt signal
- **OS are event driven**:
  - Interrups: e.g  mouse click, timer or harddrive
  - Process Exception: e.g  floating point error, invalid memory access
  - Systeam Call: e.g read file

**Process Scheduling**:

> **Turn Around Time**: the amount of time between arriving and completing

- **First-come,First Serve (FCFS)**: queue up jobs in the order in which they arrive
  - **Pitfall**: could lead to long turn around times if a shorter job arrives after two longer jobs
- **Shortest Job First (SJF)**: when jobs arrive at the same time, execute the one which would take the shortest to complete
  - **pitfall**: a shorter job may arrive a short time after longer jobs have been queued, in other words it still acts as FCFS
- **Shortest Time-to-Completion First (STCF)**: if a shorter job arrives, interrup the current job an run the next shortest  

> **Response Time**: amount of time between a job arriving and the system responding to it

- **Round Robin**: rather than running current job to completion, allocate each job a time slice and alternate between each job.
  - Impoves response time, but its bad for turn around time

> **Waiting Time**: turnaround time - job length

**Multi-Level Feedback queue**: as new jobs come in assign them the hig level of priority. Allow them to run for a short amount of time, if it finishes during this period, you acheive fast turnaround times. If it doesnt finish within this period, it will go down in priority.

- **Pitfall**:
  - Starvation, if there are constatnly always higher priority jobs, there can exists a job in a very low priority that will never run.
  - Gamming the System: since every I/O job is a new job, a process can game the system by running I/O jobs before its time slice ends thus remains high priority
- **Bootsing**: boost every job up to the highest priority every nowand again

A process typically needs to use both the CPU and I/O devices.

```c
x = x * 5;                                  //cpu 
char *status = fgets(s,MAX_BUF-1,infile);   //I/O
```

When a the process interacts with I/O it does nothing with its allocated time with the CPU, in other words its wasting time that another process could be using.

## Memory Management

RAM: Random access memory is a fast storage space where running programs exists. The OS needs a mechanism to track free and allocated memory.

**Track Free List**: maintan a list of memory chuncks by storing a starting location and size of avaible bytes from that location.

- **Allocation Policies**:
  - **First Fit**: use the first item which is large enough
    - fast
  - **Best Fit**: use the smallest item that is large enough
    - save large chunks
  - **Worst Fit**: use the largest item thats large enough
    - avoids fragmentation
- **Freed Policies**:
  - **Front**: place free memory at the front of the list
    - fast
  - **Order by address**: good for coalescing chunks
  - **Order by length**: good for when allocating
  
**Segmentation**:

- **Base and Bounds**: Each and every process has a contigous piece of the phyical memory (virtaual memory), marked with a base and bounds
  - **pitfall**: since most processes wont use the entire congigous space, the system would be wasting valuable memory
  
- **Segment virtual memory**: rather than each process having a contuguos piece,give each process receives 3 smaller segmented chuncks allocated from 3 different locations in the physical memory
  - **Address Translation**: 2^14 address space (16 KB), 2 bits give the segement, 12 bits give the offset
    - top tow bis:
      - 00: code
      - 01: heap
      - 10: unused
      - 11:stack
    - **Protection**: we can assign permsission to each segment
      - e.g heap,stack: read-write
      - code: read-execute
    - **Sharing Code**: w/read only persmision, two processes running the same app, can map to the same code segment
    - **Pitfall**: variable sized seqments lead to fragmentation aka wasted memory
- **Paging**: rather than allocating vairbale segments,divide the physicall address space into equal size segments (pages).
  - rather than allocating memory, OS hands processes pages
  - **Address Translation**:
    - In order to map virtual address space to phycial address space we need a translation table.
      - e.g virtual space of 64 Bytes made from 4 pages of 16 byte size, the virtaul address would be 6 bits long, use 2 bits to locate page remaining  4 bits to locate offset
      - e.g physical space of 128 Bytes / 16 byte frames would = 8 page. the physcal address would be 7 bits long. 3 bits locate the page, remaning 4 locate offset
      - 2 bits from virtual page number (vpn) need to be mapped into a the 3 bit from the physical page number (PFN)

    | vpn | PFN | valid | protectio| present | dirty | reference |
    |-----|-----|-------|----------|----------|-------|-----------|
    | 00  | 011 |  1    |  11      | 1        |    0 | 1         |
    | 01  | 111 | 1     |  01      | 1        |    1 | 0         |
    | 10  | 101 | 0     |  11      | 1        |    0 | 1         |
    | 11  | 010 | 1     |  00      | 0        |    1 | 1         |

    - valid: is the translation valid
    - protection: read/write/execture protection
    - dirty: has a page been modified since beign brought into memory
    - reference:has a page been accessed
- **Pitfalls**:
  - page table size: with larger virtual address spaces we need to allocate more memory for the page table
    - 2^32 bit virtual address w/ 4 KB sized pages, would require a 2^20 bit row table ~ 1 M rows
  - Speed: since we cant fit table into MMU registers, then we now have a process that each translation musc go through, to store the MMU pointers
  
## Concurrency

## File managment

## Bash and Unix Tools

## Language Sytanx and Parsing
