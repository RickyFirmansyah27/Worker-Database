var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/templates/basic/renderHtml.js
var integrationName = "Neon";
var iconURL = "https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/c3700e43-a54a-4020-e701-2c3247cc0500/public";
var docsURL = "https://developers.cloudflare.com/workers/databases/native-integrations/neon";
async function renderHtml(content) {
  const svg = await getIntegrationSvg();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${integrationName}</title>
  <link rel="stylesheet" type="text/css" href="https://static.integrations.cloudflare.com/styles.css">
</head>
<body>
<header>
  ${svg}
  <h1>
    \u{1F389} Successfully connected to ${integrationName}
  </h1>
</header>
<main>
  <p>
    Your database has the following number of tables:
  </p>
  <pre><code>${content}</code></pre>
  <small>
    To learn more view Cloudflare's <a target="_blank" href="${docsURL}">${integrationName} Developer Documentation</a>
  </small>
</main>
</body>
</html>
`;
}
__name(renderHtml, "renderHtml");
async function getIntegrationSvg() {
  const svg = await fetch("https://static.integrations.cloudflare.com/connection_graphic.svg").then((s) => s.text()).then((s) => s.replace("icon_url", iconURL));
  return svg;
}
__name(getIntegrationSvg, "getIntegrationSvg");
export {
  renderHtml as default
};
