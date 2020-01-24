# hhapp backend

This is the backend for the web application hhapp. It's been made with node.js using express library.

## What it does

The backend makes requests to the amica API fetching lunch menus for Haaga-Helia campuses, lukkarikone API to get timetables and
kide.app API to retrieve student parties in metropolitan area.

In addition it handles cafeteria queue monitoring receiving a picture from raspberry pi every minute.

### Related projects

Frontend: https://github.com/tomaskukk/haaga-helia-app
Cafeteria monitoring: https://github.com/tomaskukk/raspberry-cafeteria-traffic
