
function run() {
  console.log("Start");
  var requestStream = Rx.Observable.of('https://api.github.com/users');

  var responseMetastream = requestStream
  .map(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

  responseMetastream.subscribe(function(response) {
    console.log(response);
  });

  console.log("End");
}
