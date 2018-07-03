<!--
  A script to easily render the main html file.
  Usage: (in your command line) php index.php > index.html
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style/reset.css">
  <link rel="stylesheet" href="style/main.css">
  <title>ravcha.mo - თქვენი საკვები პორტალი!</title>
</head>
<body>
<div id="header">head tavi</div>
<div id="main">
  <form id="ingredients">
      <?php for ($i = 0; $i < 5; $i++) { ?>
        <div class="ingredient">
          <input autocomplete="off">
          <button>+</button>
        </div>
      <?php } ?>
  </form>
</div>
<div id="footer">foot feet</div>
</body>
</html>