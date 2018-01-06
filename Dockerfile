# 依赖指定基础镜像
FROM daocloud.io/node:8
# 维护着信息
MAINTAINER a1151642439@foxmail.com
# 指定环境变量
ENV HTTP_PORT=8000
# 复制指定的<src>路径下的内容到容器中的<dest>路径下， <src>可以为URL， 如果为tar文件， 会自动解压到<dest>路径下
COPY . /app
# 配置工作目录
WORKDIR /app
# 运行命令
RUN npm install cnpm --registry=https://registry.npm.taobao.org && cnpm config get registry  && cnpm install
# 声明镜像的默认入口
EXPOSE 8000
# 指定启动容器是默认执行命令
CMD [ "node", "index.js" ]