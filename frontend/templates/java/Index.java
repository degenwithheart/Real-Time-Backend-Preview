import java.net.*;
import java.io.*;

public class Index {
  public static void main(String[] args) throws Exception {
    // Fetch user
    URL userUrl = new URL("https://real-time-backend-preview.vercel.app/api/user");
    BufferedReader userIn = new BufferedReader(new InputStreamReader(userUrl.openStream()));
    String userInputLine;
    StringBuilder userContent = new StringBuilder();
    while ((userInputLine = userIn.readLine()) != null) {
        userContent.append(userInputLine);
    }
    userIn.close();
    System.out.println("User: " + userContent.toString());

    // Fetch product
    URL productUrl = new URL("https://real-time-backend-preview.vercel.app/api/product");
    BufferedReader productIn = new BufferedReader(new InputStreamReader(productUrl.openStream()));
    String productInputLine;
    StringBuilder productContent = new StringBuilder();
    while ((productInputLine = productIn.readLine()) != null) {
        productContent.append(productInputLine);
    }
    productIn.close();
    System.out.println("Product: " + productContent.toString());
  }
}