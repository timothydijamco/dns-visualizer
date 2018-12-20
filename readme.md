# DNS Visualizer

DNS Visualizer is a web application that graphically walks users through the process of fulfilling a DNS request.


# Hosting the code

Get the code from [the Github repository](https://github.com/timothydijamco/dns-visualizer):

**Option 1:**
Clone the repository into the appropriate web server directory (the directory in which the web server looks for files to send to web clients):

	git clone https://github.com/timothydijamco/dns-visualizer.git

**Option 2:**
[Download a .zip with the code](https://github.com/timothydijamco/dns-visualizer/archive/master.zip) and unzip it in the appropriate web server directory.


# Extending the code

## Editing the data that creates the visualization

The data describing the nodes and the packets in the Iterative visualization is in `js/data_iterative.js`, and the data for the Recursive visualization is in `js/data_recursive.js`. These can be edited to change the visualizations.

### Breakdown of the data file
At the top, the data file contains a `nodes` variable which describes the hosts and nameservers shown in the visualization.

	var nodes = {
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
	   ...
	}

|Key|Value|
|--|--|
|type|Either "HOST" or "SERVER". Decides which image is used to represent this node in the visualization|
|name|A human-readable name of the node|
|hostname|The node's hostname|
|ipAddress|The node's IP address|
|records|An array of objects representing DNS records|
|col|Which column of the "board" should the node be in|
|row|Which row of the "board" should the node be in|

The nodes are positioned relative to each other based on their `col` and `row` values. A node with a higher `col` value will be placed more to the right, and a node with a higher `row` value will be placed lower on the screen.

The max `col` and `row` values found are used to decide how large the "board"/grid that the nodes are placed in should be. For example, if the maximum `col` value is `4` and the maximum `row` value is `3`, the "board" will be a 3x4 grid spanning the entire screen (except the panel on the right side that displays packet and nameserver details).

---
Below, the data file contains a `packets` variable that describes the packets (in order) that the visualization will show step-by-step.

	var packets = [
	   {
	      type: "REQUEST",
	      startNodeKey: "hostA",
	      endNodeKey: "localNS",
	      description: "Looking up cs.umass.edu.",
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
	   ...
	}

|Key|Value|
|--|--|
|type|Either "REQUEST" or "RESPONSE". Represents whether this packet is a DNS Request or DNS Response.|
|startNodeKey|The node that the packet originates from (this should be the *key* of the node in the `nodes` variable)|
|endNodeKey|The node that the packet goes to (this should be the *key* of the node in the `nodes` variable)|
|description|A human-readable simple description of what the packet is doing. This is displayed when the user is on the Simple view mode.|
|questionSection|An array of objects representing entries in the Question Section of the DNS message|
|answerSection|An array of objects representing entries in the Answer Section of the DNS message|
|authoritativeSection|An array of objects representing entries in the Authoritative Section of the DNS message|
|additionalSection|An array of objects representing entries in the Additional Section of the DNS message|

You may give `questionSection`, `answerSection`, `authoritativeSection`, and/or `additionalSection` have a blank array (`[]`) as their value. Then the text "Empty" will be displayed as the contents of  that section to the user. If you instead omit the key entirely from the object, then that section won't be displayed at all to the user (e.g. if you only provided the `questionSection` and `answerSection` keys, but omitted the `authoritativeSection` and `additionalSection` keys, then the user will see a Question Section header and the contents of that section as well as an Answer Section header and the conents of that section, but will NOT see the Authoritative Section nor the Additional Section).
