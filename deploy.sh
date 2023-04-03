source .env

# Building React output
npm install
node build.js NETLIFY_AUTH_TOKEN=$NETLIFY_AUTH_TOKEN NETLIFY_API_URL=$NETLIFY_API_URL

echo "Finished deploying"