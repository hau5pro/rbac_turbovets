## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

| Method | Endpoint          | Description                                           |
| ------ | ----------------- | ----------------------------------------------------- |
| POST   | `/records/create` | Creates a new patient record                          |
| POST   | `/records/get`    | Fetches records for a given org (with optional limit) |
| POST   | `/records/update` | Updates a given record                                |
| POST   | `/records/delete` | Deletes a given record                                |

Detailed information can be retreived from Swagger `/api`

## Access Control Implementation & Entities

The system uses role-based access control (RBAC) scoped to a hierarchical organization structure.

- This ensures users can only interact with data belonging to organizations they have explicit or inherited permissions for.
- Custom decorators like `@Roles` and `@Permissions` are used to declare access requirements at the controller level, making intent clear and routes self-documenting.
- Access control is handled by a centralized RbacService, which defines role permissions and organization-based inheritance logic.
- Guards call into RbacService to evaluate access, keeping the permission logic centralized and consistent.
- This separation ensures that guards remain lightweight and reusable, while RbacService acts as the single source of truth for all access decisions.

### User

Identified by id, has roles through UserOrgRole.

### Organization

Hierarchical structure via parentOrgId.

- Each Organization can optionally have a parentOrgId, forming a tree-like structure.
- This structure is used to determine access inheritance:
- If a user has a role in a parent org, they automatically gain access to all its descendants.

### UserOrgRole

Links users to organizations and assigns a role (ADMIN, VIEWER, etc.).

- The UserOrgRole table maps users to organizations with a specific UserRole.
- Roles are interpreted consistently across orgs:
  - ADMIN can create records.
  - VIEWER can only read records.
- A single user can hold multiple roles across different organizations.

### PatientRecord

Scoped to an orgId, includes patient name and diagnosis.

## Future Considerations

### Extensibility

- Dynamic role creation and custom permission sets (e.g. CRUD-permission granularity per entity).

### Security

- Integrate real authentication (e.g., JWT-based auth).
- Audit logging for tracking all data changes (currently handled via an interceptor).
- Rate limiting and IP filtering for sensitive routes.

### Performance

- Cache flattened org hierarchies per user session to avoid repeated recursive queries.
- Store user permissions in-memory (e.g., Redis) with TTL for quick lookups.

### Additional Features

- Pagination and filtering for large record sets.
- Admin dashboard for user/org management.
- Soft deletes and versioning for audit resilience.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
