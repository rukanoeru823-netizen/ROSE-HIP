<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  echo json_encode(["status" => "error"]);
  exit;
}

$name    = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

$admin_to = "rosehip.salon@gmail.com";
$admin_subject = "【ROSE HIP】お問い合わせが届きました";

$admin_body = <<<EOT
ROSE HIP ホームページよりお問い合わせがありました。

【お名前】
{$name}

【メールアドレス】
{$email}

【お問い合わせ内容】
{$message}
EOT;

$headers  = "From: ROSE HIP <rosehip.salon@gmail.com>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

$mail_admin = mail($admin_to, $admin_subject, $admin_body, $headers);

$user_subject = "【ROSE HIP】お問い合わせありがとうございます";
$user_body = <<<EOT
{$name} 様

この度は ROSE HIP へお問い合わせいただき、ありがとうございます。

━━━━━━━━━━━━━━
{$message}
━━━━━━━━━━━━━━

内容を確認のうえ、順次ご連絡いたします。

ROSE HIP
EOT;

$user_headers  = "From: ROSE HIP <rosehip.salon@gmail.com>\r\n";
$user_headers .= "Content-Type: text/plain; charset=UTF-8";

$mail_user = mail($email, $user_subject, $user_body, $user_headers);

if ($mail_admin && $mail_user) {
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error"]);
}
