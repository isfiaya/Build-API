![So Pekocko Logo](./images/Pekocko.png)

# Build-API: Application API

[My web page hosted online on GitHub Pages](https://isfiaya.github.io/Reservia/)

## Security Requirements

- User password encrypted
- Transport and storage of PII secure.
- Authentication reinforced on the required routes
- Email addresses in the database are unique and an appropriate Mongoose plugin is used to ensure their uniqueness and report errors

## API Routes

- All sauce-related routes require an authenticated request (containing a valid token in its Authorization header: "Bearer <token>")
