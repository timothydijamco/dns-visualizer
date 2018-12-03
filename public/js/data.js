var nodes = {
   hostA: {
      type: "HOST",
      name: "Host A",
      hostname: "",
      ipAddress: "128.235.152.39",
      records: [],
      x: 100,
      y: 450,
      col: 0,
      row: 2
   },
   localNS: {
      type: "SERVER",
      name: "Local NS",
      hostname: "",
      ipAddress: "128.235.3.6",
      records: [
         {
            hostname: "a.root-servers.net.",
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
      x: 900,
      y: 50,
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
            hostname: "umass.edu",
            type: "NS",
            ipAddress: "ns1.umass.edu."
         },
         {
            hostname: "ns1.umass.edu.",
            type: "A",
            ipAddress: "128.119.10.27"
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
      hostname: "a.gltd-servers.net.",
      ipAddress: "192.5.6.30",
      records: [
         {
            hostname: "google.com.",
            type: "NS",
            ipAddress: "ns1.google.com."
         },
         {
            hostname: "ns.google.com",
            type: "A",
            ipAddress: "216.239.32.10"
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
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [],
      authoritativeSection: [],
      additionalSection: []
   },
   {
      type: "REQUEST",
      startNodeKey: "localNS",
      endNodeKey: "rootNS",
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [],
      authoritativeSection: [],
      additionalSection: []
   },
   {
      type: "RESPONSE",
      startNodeKey: "rootNS",
      endNodeKey: "localNS",
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [],
      authoritativeSection: [],
      additionalSection: []
   },
   {
      type: "REQUEST",
      startNodeKey: "localNS",
      endNodeKey: "eduNS",
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [],
      authoritativeSection: [],
      additionalSection: []
   },
   {
      type: "RESPONSE",
      startNodeKey: "eduNS",
      endNodeKey: "localNS",
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [],
      authoritativeSection: [],
      additionalSection: []
   },
   {
      type: "REQUEST",
      startNodeKey: "localNS",
      endNodeKey: "umassNS",
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [],
      authoritativeSection: [],
      additionalSection: []
   },
   {
      type: "RESPONSE",
      startNodeKey: "umassNS",
      endNodeKey: "localNS",
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "128.119.240.136"
         }
      ],
      authoritativeSection: [
         {
            hostname: "umass.edu.",
            type: "NS",
            ipAddress: "ns1.umass.edu."
         }
      ],
      additionalSection: [
         {
            hostname: "ns1.umass.edu.",
            type: "A",
            ipAddress: "128.119.10.27"
         }
      ]
   },
   {
      type: "RESPONSE",
      startNodeKey: "localNS",
      endNodeKey: "hostA",
      questionSection: [
         {
            hostname: "cs.umass.edu.",
            class: "IN",
            type: "A",
            ipAddress: "______________"
         }
      ],
      answerSection: [
         {
            hostname: "cs.umass.edu.",
            type: "A",
            ipAddress: "128.119.240.136"
         }
      ],
      authoritativeSection: [
         {
            hostname: "umass.edu.",
            type: "NS",
            ipAddress: "ns1.umass.edu."
         }
      ],
      additionalSection: [
         {
            hostname: "ns1.umass.edu.",
            type: "A",
            ipAddress: "128.119.10.27"
         }
      ]
   }
]
