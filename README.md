# time-zone-server

This is a Node.js server which gives back the local time anywhere in the world, given a Unix Style location
as input, e.g. 'Europe/Zurich'.

A full list of supported time zones is available at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones



#API:

##GET /getTime/area/location
##GET /getTime/area/location/city

Gets the local time right now for the given TZ style input area and city n the format "yyyymmdd HHMMSS"

    curl http://localhost:3000/GetTime/Europe/Berlin
    2016,04,18,15,56,08


##GET /getTimeZone/area/location
##GET /getTimeZone/area/location/city

Gets the short time zone for the given area/city, e.g.  CET, CEST, EST

    curl http://localhost:3000/GetTimeZone/Europe/Berlin
    CEST


##GET /getTimeOffset/area/location
##GET /getTimeOffset/area/location/city

Gets the current offset to GMT for the given area/city, e.g. GMT+0200

    curl http://localhost:3000/GetTimeOffset/Europe/Berlin
    GMT+0200


##GET /getTimeRaw/area/location
##GET /getTimeRaw/area/location/city

Returns the internal date representation, intended for debugging only

    curl http://localhost:3000/GetTimeRaw/Europe/Berlin
    Tue Apr 19 2016 09:47:30 GMT+0200 (CEST)


# Running on a local server
Install Node.js, there are a lot of references about how to do this. Google it.

Get/build the dependencies

    npm install

Execute

    node time-zone-service.js

# Running on Cloud Foundry
Even easier:

Create the zip file from the root of the repository you cloned:

    zip -r time-zone-service.zip *

Login to cloud foundry (for example on Swisscom, where I host mine)

    cf login -a https://api.lyra-836.appcloud.swisscom.com -u <your_user_name>

Push the service

    cf target -o Nixie -s Nixie
    cf push time-zone-server -b nodejs_buildpack -m 64m -p time-zone-service.zip -i 2 -c "node time-zone-service.js"

# Running on a Raspberry Pi

The best node version to run with on the Raspberry is v6. This guide takes you through the process of installing node on the Rapsberry and running the server with that.

Create a directory into which you want to install Node.js. I'll do this as a subdirectory of my $HOME directory:

    cd
    mkdir node
    cd node

Check your ARM architecture with:

    uname -m

The processor on Raspberry Pi is ARM, but depends on the model there can be ARMv6, ARMv7 or ARMv8. All 3 versions of ARM are supported by Node.js.

I get back:

    pi@raspberrypi:~ $ uname -m
    armv6l

This means I have to use the armv6l version of Node.js. Substitute this "<arm-arch>" into the node version in "https://nodejs.org/dist/v6.17.1/node-v6.17.1-linux-<arm-arch>.tar.gz". In my case this turns into:

    wget https://nodejs.org/dist/v6.17.1/node-v6.17.1-linux-armv6l.tar.gz


Now unpack it and change into the installed directory:

    tar xvfz node-v6.17.1-linux-armv6l.tar.gz
    cd nodev6/

Install the files into /usr/local/bin by linking them

    sudo ln -s /home/pi/nodev6/node-v6.17.1-linux-armv6l/bin/node /usr/local/bin/node
    sudo ln -s /home/pi/nodev6/node-v6.17.1-linux-armv6l/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

Test the installation by checking the versions of the files installed onto the path:

    node -v
    npm -v

Both commands should give back a version.

Now clone the time zone server code into the home directory:

    cd
    git clone https://github.com/isparkes/time-zone-server.git
    cd time-zone-server/

And run it:

    nohup node time-zone-service.js > log.txt &2>1

Now you should be able to detach and the time zone server will be available at port 3000.

If you like, you can also do some port forwarding and make the service available to the outside world. If you do this, it would be nice if you let me know you are running a server so that others can use it as a back up option.

# Docker image

There is a Docker image defintion file "Dockerfile" and an associated .dockerignore file. You can build a Docker image like this:

    docker build -t isparkes/time-zone-server:001 .
    docker push isparkes/time-zone-server:001

The image can be run like this:

    docker run --name bc-pay-gw --link dbbcpgw -p 30044:3000 -e MONGO_URL=mongodb://dbbcpgw:27017/bcpgw -e LOCK_CARTS=true -d isparkes/bitcoin-payment-gw


