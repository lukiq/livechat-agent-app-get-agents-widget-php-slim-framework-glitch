var config = {
  app_client_id: 'fdb57eae8ac985150a20b6bf5686d7fc',
  api_url: "https://accounts.livechatinc.com/",
  access_token: null
}



var initApp = function() {
  if(window.location.hash && window.location.hash.search('access_token') > -1 ){
    config.access_token = window.location.hash.substr(14).split('&')[0];
  } else {
    if(window.location.hash.search('error') > -1) this.setState({ errorMessage: 'Problem with authorization'});
    else window.location.href = `${config.api_url}?response_type=token&client_id=${config.app_client_id}&redirect_uri=${window.location.href}`;
  }
};

var openInNewTab = function(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

initApp();

var addAgentToList = function(element, index, array) {
  $( ".result" ).append( 
    `
    <li title="Click to open in new tab" onclick="openInNewTab('https://my.livechatinc.com/agents/${element.login}'); return false;">
      <img class="avatar" src="//${element.avatar}" />
      <h3>${element.name}</h3>
      <p>${element.login}</p>
    </li>
    `
  );
};

$.ajax({
  url: "https://livechat-rest-api.glitch.me/agents",
  headers: {"Authorization": "Bearer " + config.access_token}
})           
.done(function (data) {
  $( ".result" ).html( data );
  data.forEach(addAgentToList);
  console.log( "Agents details loaded." );
})
.fail(function (jqXHR, textStatus) {
  alert("error: " + textStatus);
});