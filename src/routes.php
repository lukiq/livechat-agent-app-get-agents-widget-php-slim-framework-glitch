<?php
// Routes

$app->get('/[{name}]', function ($request, $response, $args) {
  // Sample log message
  $this->logger->info("Slim-Skeleton '/' route");

  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});



$app->post('/agents/', function ($request, $response, $args) {
  // Sample log message
  $this->logger->info("Slim-Skeleton '/' route");
  


  // Render rand session number
  $responseData = array(
      'session_id' => $_POST['access_token']
    );

  return $response->withJson($responseData);
});