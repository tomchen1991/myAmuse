###
 # @Date: 2023-10-18 16:22:32
 # @LastEditors: 陈子健
 # @LastEditTime: 2023-10-20 10:25:27
 # @FilePath: /amusement/docker.sh
### 
npm run build

docker stop amuse-front

docker rm amuse-front

docker build -t amuse-front .

docker run -p 8902:80 -d --name amuse-front amuse-front
