<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/src/Exception.php';
require 'phpMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

//Від кого лист
$mail->setFrom('badmpromotion@gmail.ua', 'Слава Україні');
//Кому відправляти
$mail->addAddress('riabtsun@i.ua');
//Тема листа
$mail->Subject = 'Надійшла нова заявка від клієнта';

//Тіло листа
$body = '<h1>Нова заявка</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Ім\'я:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['organization']))) {
    $body .= '<p><strong>Організація:</strong> ' . $_POST['organization'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
    $body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';
}

//Прикріпити файл
if (!empty($_FILES['image']['tmp_name'])) {
    //шлях завантаження файлу
    $filePath = __DIR__ . "/files" . $_FILES['image']['name'];
    //грузимо файл
    if (copy($_FILES['image']['tmp_name'], $filePath)) {
        $fileAttach = $filePath;
        $body .= '<p></p><strong>Файл в додатку</strong>';
        $mail->addAttachment($fileAttach);
    }
}

//Відправляємо
if (!$mail->send()) {
    $message = 'Помилка';
} else {
    $message = 'Данні відправлені!';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
