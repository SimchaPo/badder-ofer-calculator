// Constants.js
const prod = {
  url: {
    SERVER_URL: "https://badder-ofer-calculator-mqd6xnn6zq-de.a.run.app",
  },
};
const dev = {
  url: {
    SERVER_URL: "http://localhost:8080",
  },
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
