# Among Eus - aka Among Isch

Among Eus Game by USE Team in Camp 2022

## Play it

The newest version is available in our test environment on Azure Cloud

To start a new game or join an existing one, use the following URL:

https://blue-sea-050a45e10.1.azurestaticapps.net/?game=<gameID>&user=<username>

Simply replace <gameID> by the id of the game you want to create or join (you can choose it on your own)
and choose a <username> for your user (choose a unique one for all players of the game).

The backend can as well be tested in isolation with simple test client:
https://among-eus-core.azurewebsites.net/

## Azure Cloud Deployment

Deployment is automatically done from develop branch using Github Actions.

See workflows under `.github/workflows' in yaml files for backend and frontend deployments.

Azure Cloud for AmongEus can be managed here (with your Zühlke account):

You can test the running game (current state from develop branch) on following URLs:

**Frontend:**
https://blue-sea-050a45e10.1.azurestaticapps.net/?game=<gameID>&user=<username>

**Backend Testing:**
https://among-eus-core.azurewebsites.net/
On this page you will find a simple self hacked static javascript test client for testing the websocket backend

## Google Maps Keys

The API Key for google maps that is provided in the code, is managed by Fabio. 

Depending on current set restrictions for the key, you might have to use a different key for local debugging or login 
with your google account and get authorised for using that key with Oauth by Fabio. Ask Fabio in case of troubles.

## AmongIsch API - Backend Documentation

The backend is self documented with a test client - just start the backend and browse to it:
localhost:8080