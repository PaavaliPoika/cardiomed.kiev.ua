<?php
if (empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = trim(strip_tags(htmlspecialchars($_POST['name'])));
$email = trim(strip_tags(htmlspecialchars($_POST['email'])));
$phone = trim($_POST['phone']);
$m_subject = trim(strip_tags(htmlspecialchars($_POST['subject'])));
$message = trim(strip_tags(htmlspecialchars($_POST['message'])));

$mail = array(
  'to' => "cardiomed@i.ua",
  'subject' => "$m_subject",
  'message' => "Имя: $name, <br> Телефон: $phone,<br> Сообщение: $message",
  'headers' => "MIME-Version: 1.0\r\n" . "Content-type: text/html; charset=utf-8\r\n" . "From: $email\r\n"
);

mail(
  $mail['to'],
  $mail['subject'],
  $mail['message'],
  iconv('utf-8', 'windows-1251', $mail['headers'])
);
