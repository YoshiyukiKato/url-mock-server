import http from "http"

export default class Server{
  constructor(pathMap){
    this.pathMap = pathMap || {};
  }

  _route(url){
    const pathname_query = url.split("?");
    const pathname = pathname_query[0];
    const query = pathname_query[1] ? pathname_query[1].split("&").sort().join("") : null;
    const pathList = pathname.split("/").filter((s) => { return s !== ''; });
    return this._forward(pathList, this.pathMap, query);
  }

  _forward(pathList, pathMap, query){
    if(pathList.length < 1){
      //pathListが空（urlの最後まできた）
      if(!pathMap._) throw { status: 404, message : "value does not exist" };
      if(query && pathMap['?']){
        const queryMap = Object.keys(pathMap['?']).reduce((acc, kv) => {
          acc[kv.split("&").sort().join("")] = pathMap['?'][kv];
          return acc;
        }, {})
        return queryMap[query] || pathMap._;
      }
      return pathMap._;
    }else{
      //pathListがある。urlの残りのパートがある
      const path = pathList.splice(0, 1)[0];//まず先頭を切ってみる
      const pathVal = pathMap[path];//pathMapに値があるか見てみる
      if(pathVal === undefined){
        throw { status: 404, message :"routing does not exist" };//そんなルーティングは無い
      }else if(typeof pathVal === "object"){
        return this._forward(pathList, pathVal, query);//次へ
      }else{
        if(pathList.length === 0) return pathVal;
        else throw { status: 404, message :"routing does not exist" };//そんなルーティングは無い
      }
    }
  }

  listen(port){
    http.createServer((req, res) => {
      try{
        const value = this._route(req.url);
        if(typeof value === "object"){
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(value));
        }else{
          res.writeHead(200, {'Content-Type': 'text/plain'});  
          res.end(value);
        }
      }catch(err){
        let status = err.status || 500;
        let message = err.message || "Internal Server Error"
        res.writeHead(status, {'Content-Type': 'text/plain'});  
        res.end(message);
      }
    }).listen(port || 3000);
  }
}