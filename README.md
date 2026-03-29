# Environment Variables

`ORIGIN`
`JWT_SECRET`
`API_HOST`
`COOKIES_SECURE`

# GitHub Docker Release Flow

- Pushes to `master` bump the patch version in `VERSION` and create a matching git tag.
- Tag pushes (`v*`) build the Docker image and publish it to GitHub Container Registry.
- Published image tags are the semantic version from `VERSION` and `latest`.
