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
      <?php for ($i = 0; $i < 20; $i++) { ?>
        <div class="ingredient">
          <input>
          <button>+</button>
        </div>
      <?php } ?>
  </form>
</div>
<div id="footer">foot feet</div>
</body>
</html>