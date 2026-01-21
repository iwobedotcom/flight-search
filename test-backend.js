import http from "http";

const options = {
  hostname: "localhost",
  port: 3001,
  path: "/api/flights?origin=LHR&destination=JFK&departureDate=2026-02-01",
  method: "GET",
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding("utf8");
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      console.log("Data length:", json.data ? json.data.length : 0);
      if (json.data && json.data.length > 0) {
        console.log("First flight:", JSON.stringify(json.data[0], null, 2));
        console.log(
          "Dictionaries:",
          JSON.stringify(json.dictionaries, null, 2),
        );
      } else {
        console.log("Full response:", data);
      }
    } catch (e) {
      console.log("Response not JSON:", data);
    }
  });
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
