A clean DDD based project to make and manage draws of Kris Kringle.
<br><br>

### Endpoints

_POST_ to create a group <br>
_POST_ to add a participant to the group <br>
_POST_ to make the matches <br>
_GET_ to know who you should gift

More info: [API docs](https://l315pujm1n.apidog.io/)
<br><br>

### ER Diagram

![Entity-Relationship Diagram](docs/er-diagram.png)
<br><br>

### Todo

- Fix doDraw function logic (participants can matche themselves)
- Fix Prisma draw service
- Custom exception hierarchy and its middleware
- User repositories and services
- Authorization and Authentication
- Email invites dispatch
- Endpoint to serve swagger docs
- Tests
