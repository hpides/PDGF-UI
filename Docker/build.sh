if [ -z ${tag+x} ];
 then tag="latest";
fi
docker build -t pdgfui:${tag} ../ -f ./Dockerfile
if [ -z ${deploy+x} ];
  then echo "no push";
else
  docker tag pdgfui:${tag} localhost:5000/pdgfui:${tag}
  docker push localhost:5000/pdgfui:${tag}
fi
