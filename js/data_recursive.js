var nodes = {
   hostA: {
      type: "HOST",
      name: "Host A",
      hostname: "None",
      ipAddress: "128.235.152.39",
      records: [],
      col: 0,
      row: 2
   },
   localNS: {
      type: "SERVER",
      name: "Local NS",
      hostname: "None",
      ipAddress: "128.235.3.6",
      records: [
         {
            hostname: "a.root-servers.net.",
            type: "A",
            ipAddress: "198.41.0.4"
         }
      ],
      col: 1,
      row: 2
   },
   rootNS: {
      type: "SERVER",
      name: "Root NS",
      hostname: "a.root-servers.net.",
      ipAddress: "198.41.0.4",
      records: [
         {
            hostname: "a.edu-servers.net.",
            type: "A",
            ipAddress: "192.33.14.50"
         },
         {
            hostname: "a.gltd-servers.net.",
            type: "A",
            ipAddress: "192.5.6.30"
         }
      ],
      col: 4,
      row: 0
   },
   eduNS: {
      type: "SERVER",
      name: ".edu NS",
      hostname: "a.edu-servers.net.",
      ipAddress: "192.33.14.50",
      records: [
         {
            hostname: "njit.edu.",
            type: "NS",
            ipAddress: "dns1.njit.edu."
         },
         {
            hostname: "dns1.njit.edu.",
            type: "A",
            ipAddress: "128.235.251.10"
         },
         {
            hostname: "umass.edu.",
            type: "NS",
            ipAddress: "ns1.umass.edu."
         },
         {
            hostname: "ns1.umass.edu.",
            type: "A",
            ipAddress: "128.119.10.27"
         }
      ],
      col: 3,
      row: 1
   },
   comNS: {
      type: "SERVER",
      name: ".com NS",
      hostname: "a.gltd-servers.net.",
      ipAddress: "192.5.6.30",
      records: [
         {
            hostname: "google.com.",
            type: "NS",
            ipAddress: "ns1.google.com."
         },
         {
            hostname: "ns1.google.com",
            type: "A",
            ipAddress: "216.239.32.10"
         }
      ],
      col: 5,
      row: 1
   },
   umassNS: {
      type: "SERVER",
      name: "umass.edu NS",
      hostname: "ns1.umass.edu.",
      ipAddress: "128.119.10.27",
      records: [
         {
            hostname: "www.umass.edu",
            type: "A",
            ipAddress: "128.119.8.148"
         },
         {
            hostname: "cs.umass.edu",
            type: "A",
            ipAddress: "128.119.240.136"
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
      hostname: "ns1.google.com.",
      ipAddress: "216.239.32.10",
      records: [
         {
            hostname: "www.google.com",
            type: "A",
            ipAddress: "172.217.11.36"
         },
         {
            hostname: "maps.google.com",
            type: "A",
            ipAddress: "172.217.11.46"
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
      endNodeKey: "localNS",
      description: "Looking up maps.google.com.",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: []
   },
   {
      type: "REQUEST",
      startNodeKey: "localNS",
      endNodeKey: "rootNS",
      description: "Looking up maps.google.com.",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: []
   },
   {
      type: "REQUEST",
      startNodeKey: "rootNS",
      endNodeKey: "comNS",
      description: "Looking up maps.google.com.",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: []
   },
   {
      type: "REQUEST",
      startNodeKey: "comNS",
      endNodeKey: "googleNS",
      description: "Looking up maps.google.com.",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: []
   },
   {
      type: "RESPONSE",
      startNodeKey: "googleNS",
      endNodeKey: "comNS",
      description: "Responding with IP address of maps.google.com.: 172.217.11.46",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "172.217.11.46"
         }
      ]
   },
   {
      type: "RESPONSE",
      startNodeKey: "comNS",
      endNodeKey: "rootNS",
      description: "Responding with IP address of maps.google.com.: 172.217.11.46",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "172.217.11.46"
         }
      ]
   },
   {
      type: "RESPONSE",
      startNodeKey: "rootNS",
      endNodeKey: "localNS",
      description: "Responding with IP address of maps.google.com.: 172.217.11.46",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "172.217.11.46"
         }
      ]
   },
   {
      type: "RESPONSE",
      startNodeKey: "localNS",
      endNodeKey: "hostA",
      description: "Responding with IP address of maps.google.com.: 172.217.11.46",
      questionSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [
         {
            hostname: "maps.google.com.",
            type: "A",
            ipAddress: "172.217.11.46"
         }
      ]
   }
]
