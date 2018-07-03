<!--
  A script to easily render the main html file.
  Usage: (in your command line) php index.php > index.html
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" type="text/css" href="docs/less/main.less"/>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style/reset.css">
  <link rel="stylesheet" href="style/main.css">
  <title>ravcha.mo - თქვენი საკვები პორტალი!</title>
</head>
<body>
<div id="header">head tavi</div>
<div id="main">
  <form id="ingredients">
    <div id="ingredient-list">
        <?php for ($i = 0; $i < 5; $i++) { ?>
          <div class="ingredient">
            <label>
              <small>დასახელება</small>
              <input name="ingredient_name" autocomplete="off">
            </label>
            <label>რაოდენობა
              <input name="ingredient_quantity" type="number">
            </label>
            <select name="quantity_type">
              <option>გრამი</option>
              <option>კგ.</option>
              <option>ცალი</option>
            </select>
          </div>
        <?php } ?>
    </div>
    <button id="add_field">+</button>
    <input type="submit" value="ძებნა">
  </form>
</div>
<div id="footer">foot feet</div>
<script src="script/main.js"></script>
</body>
</html>