# Java API Template

This template demonstrates how to connect to the mock API using Java.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Prerequisites

Ensure the backend is running:

```bash
cd ../../backend
npm install
npm start
```

## Usage

Compile and run the examples:

```bash
javac User.java && java User
javac Product.java && java Product
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data.

```java
import java.net.*;
import java.io.*;

public class Main {
  public static void main(String[] args) throws Exception {
    URL url = new URL("https://real-time-backend-preview.vercel.app/api/user");
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
    String inputLine;
    StringBuilder content = new StringBuilder();
    while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
    }
    in.close();
    System.out.println("User: " + content.toString());
    // Parse JSON with a library like Gson and use in your app
  }
}
```

Replace the mock API URL with your production API when ready.