# GetSetUp Guide Backend

API to for the Guide teaching availability frontend.

## MongoDB Setup

Use docker to get a local MongoDB instance running:

```zsh
# make sure to run this command in the root of the project folder!!!
docker run -d \
  -p 27017:27017 \
  -v "$(pwd)/data/db.init://docker-entrypoint-initdb.d" \
  -v gsu-db:/data/db \
  --name gsu-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=getadminup \
  -e MONGO_INITDB_ROOT_PASSWORD=Supercalifragilisticexpialidoci0us \
  -e MONGO_INITDB_DATABASE=gsu-db \
  mongo
```
