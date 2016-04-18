# time-zone-server

API:

GET /getTime/area/city

Gets the local time right now for the given TZ style input area and city n the format "yyyymmdd HHMMSS"

Example:
curl http://localhost:3000/GetTime/Europe/Berlin
20160418 155608


GET /getTimeZone/area/city

Gets the short time zone for the given area/city, e.g.  CET, CEST, EST

Example:
curl http://localhost:3000/GetTimeZone/Europe/Berlin
CEST

GET /getTimeOffset/area/city

Gets the current offset to GMT for the given area/city, e.g. GMT+0200

Example:
curl http://localhost:3000/GetTimeOffset/Europe/Berlin
GMT+0200

