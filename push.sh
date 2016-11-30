cf login -a https://api.lyra-836.appcloud.swisscom.com -u ian@s.com -o iO -s Bots

rm time-zone-service.zipzip -r time-zone-service.zip *
cf push time-zone-server -b nodejs_buildpack -m 64m -p time-zone-service.zip -i 2 -c "node time-zone-service.js"

#Maybe need to do this before the bind:
#cf cups ian-logs -l syslog-tls://logs.papertrailapp.com:16262

cf bind-service time-zone-server ian-logs
