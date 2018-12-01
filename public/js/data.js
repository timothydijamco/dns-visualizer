var nodes = {
   hostA: {
      type: "HOST",
      name: "Host A",
      records: [],
      x: 100,
      y: 450,
      col: 0,
      row: 2
   },
   localNS: {
      type: "SERVER",
      name: "Local NS",
      records: [
         {
            hostname: "a.root-servers.net",
            type: "A",
            ipAddress: "198.41.0.4"
         }
      ],
      x: 300,
      y: 450,
      col: 1,
      row: 2
   },
   rootNS: {
      type: "SERVER",
      name: "Root NS",
      records: [
         {
            hostname: "???",
            type: "A",
            ipAddress: "???"
         }
      ],
      x: 900,
      y: 50,
      col: 4,
      row: 0
   },
   eduNS: {
      type: "SERVER",
      name: ".edu NS",
      records: [
         {
            hostname: "ns.umass.edu",
            type: "NS",
            ipAddress: "128.119.245.95"
         }
      ],
      x: 750,
      y: 250,
      col: 3,
      row: 1
   },
   comNS: {
      type: "SERVER",
      name: ".com NS",
      records: [
         {
            hostname: "ns.google.com",
            type: "NS",
            ipAddress: "216.239.23.1"
         }
      ],
      x: 1050,
      y: 250,
      col: 5,
      row: 1
   },
   umassNS: {
      type: "SERVER",
      name: "umass.edu NS",
      records: [
         {
            hostname: "www.umass.edu",
            type: "A",
            ipAddress: "128.119.245.2"
         },
         {
            hostname: "cs.umass.edu",
            type: "A",
            ipAddress: "128.119.245.44"
         }
      ],
      x: 600,
      y: 450,
      col: 2,
      row: 2
   },
   googleNS: {
      type: "SERVER",
      name: "google.com NS",
      records: [
         {
            hostname: "www.google.com",
            type: "A",
            ipAddress: "216.239.16.4"
         },
         {
            hostname: "maps.google.com",
            type: "A",
            ipAddress: "216.239.16.55"
         }
      ],
      x: 1200,
      y: 450,
      col: 6,
      row: 2
   }
};

var packets = [
   {
      type: "REQUEST",
      startNodeKey: "hostA",
      endNodeKey: "localNS"
   },
   {
      type: "REQUEST",
      startNodeKey: "localNS",
      endNodeKey: "rootNS"
   },
   {
      type: "RESPONSE",
      startNodeKey: "rootNS",
      endNodeKey: "localNS"
   },
   {
      type: "REQUEST",
      startNodeKey: "localNS",
      endNodeKey: "eduNS"
   },
   {
      type: "RESPONSE",
      startNodeKey: "eduNS",
      endNodeKey: "localNS"
   },
   {
      type: "REQUEST",
      startNodeKey: "localNS",
      endNodeKey: "umassNS"
   },
   {
      type: "RESPONSE",
      startNodeKey: "umassNS",
      endNodeKey: "localNS"
   },
   {
      type: "RESPONSE",
      startNodeKey: "localNS",
      endNodeKey: "hostA"
   }
]
