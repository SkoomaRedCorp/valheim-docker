use warp::Error;

pub fn invoke() -> Result<impl warp::Reply, Error>{
  //warp::fs::file("/workspaces/valheim-docker-fork/src/huginn/pages/index.html")
  // return a html page
  Ok(warp::reply::html("<html><body><h1>Valheim Server</h1></body></html>"))
}
