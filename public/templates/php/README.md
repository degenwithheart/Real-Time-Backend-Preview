# PHP API Template

This template demonstrates how to connect to the mock API using PHP.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Usage

Run the examples:

```bash
php user.php
php product.php
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data in a web page.

```php
<?php
$userJson = file_get_contents('https://real-time-backend-preview.vercel.app/api/user');
$user = json_decode($userJson, true);
?>
<!DOCTYPE html>
<html>
<head><title>User</title></head>
<body>
  <h1>User Info</h1>
  <p>Name: <?php echo $user['name']; ?></p>
  <p>Email: <?php echo $user['email']; ?></p>
  <!-- etc. -->
</body>
</html>
```

Replace the mock API URL with your production API when ready.