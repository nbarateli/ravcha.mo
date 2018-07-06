<!--
  A script to easily render the main html file.
  Usage: (in your command line) php index.php > index.html
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=0.8">
  <link rel="stylesheet" href="style/reset.css">
  <link rel="stylesheet" href="vendor/awesomeplete/awesomplete.css">
  <link rel="stylesheet" href="style/main.css">
  <link rel="shortcut icon" type="image/png" href="favicon.png">
  <title>ravcha.mo?</title>
</head>
<body>
<div id="header">head tavi</div>
<div id="main">
  <div id="container">
    <form id="ingredients">
      <input class="ingredient-n" placeholder="ინგრედიენტის დასახელება" name="ingredient_name" data-id=-1
             autocomplete="off">

      <div id="ingredient-list">
      </div>

      <button id="add_field">+</button>
      <input type="submit" value="ძებნა">
    </form>
    <div id="results">
        <?php for ($i = 0; $i < 20; $i++) { ?>
          <div class="result">
            <img class='meal-image' src="favicon.png">
            <span class="meal-name">ჩაქაფული სოკოთი</span><span class="meal-ingredient-count">საჭირო ინგრედიენტთა რაოდენობა: 5</span>
          </div>
        <?php } ?>
    </div>

  </div>
</div>
<div id="footer"></div>
<script type="mustache/x-tmpl" id="ingredient-template" charset="UTF-8">
  <input type="hidden" name="id" value="{{id}}">
  <span class="ingredient-name">{{name}}</span>
  <span><a class="delete-ingredient">x</a></span>
</script>

<script src="vendor/awesomeplete/awesomplete.min.js" async></script>
<script src="vendor/mustache.js" async></script>
<script src="script/main.js" async></script>
</body>
</html>