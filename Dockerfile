# 依赖指定基础镜像
FROM daocloud.io/node:8
# 维护者信息
MAINTAINER a1151642439@foxmail.com
# 指定环境变量
#ENV HTTP_PORT = 8000
ENV NODE_ENV production
# 复制指定的<src>路径下的内容到容器中的<dest>路径下， <src>可以为URL， 如果为tar文件， 会自动解压到<dest>路径下
COPY . /home/app
# 配置工作目录
WORKDIR /home/app
# 运行命令
RUN cd /home/app; npm install --registry=https://registry.npm.taobao.org
# 声明镜像的默认入口
EXPOSE 8000 27017 6379
# 指定启动容器是默认执行命令
CMD [ "node", "app.js" ]

# 创建项目镜像
# docker build -t frames .
# 启动编译好的镜像
# docker run -d -p 8000:8000 --rm --name frames-run frames
# 获取容器的日志
# docker logs -f [CONTAINER ID]
# 进入运行的容器
# docker exec -it [CONTAINER ID] /bin/bash