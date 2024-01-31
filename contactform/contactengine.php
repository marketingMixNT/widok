<?php

header('Content-Type: text/html; charset=utf-8');

$EmailFrom = "kontakt@owcedwie.pl"; // Zmień na swój rzeczywisty adres e-mail
$EmailTo = "hello@owcedwie.pl";
$Subject = "Nowa wiadomość ze strony owcedwie.pl";
$Name = Trim(stripslashes($_POST['Name']));
$Tel = Trim(stripslashes($_POST['Tel']));
$Email = Trim(stripslashes($_POST['Email']));
$Message = Trim(stripslashes($_POST['Message']));

// Validation
$validationOK = true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// Prepare email body text
$Body = "";
$Body .= "Imię: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Telefon: ";
$Body .= $Tel;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Wiadomość: ";
$Body .= $Message;
$Body .= "\n";

// Set email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";
$headers .= "From: $EmailFrom" . "\r\n";

// Send email
$success = mail($EmailTo, $Subject, $Body, $headers);

// Redirect to success page
if ($success) {
  header('Location: ../dziekujemy_za_wiadomosc.php');
} else {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
